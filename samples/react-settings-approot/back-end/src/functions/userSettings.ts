import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ConfidentialClientApplication, OnBehalfOfRequest } from "@azure/msal-node";
import { TokenValidator, ValidateTokenOptions, getEntraJwksUri } from 'jwt-validate';

let cachedValidator: TokenValidator | undefined;
let cachedTenantId: string | undefined;

async function getCachedValidator(tenantId: string): Promise<TokenValidator> {
  if (!cachedValidator || cachedTenantId !== tenantId) {
    const entraJwksUri = await getEntraJwksUri(tenantId);
    cachedValidator = new TokenValidator({ jwksUri: entraJwksUri });
    cachedTenantId = tenantId;
    console.log("Token validator created and cached");
  }
  return cachedValidator;
}

async function validateToken(token: string): Promise<boolean> {
  // Try to validate the token and get user's basic information
  try {
    if (!token) {
      return false; // No token provided
    }

    const { AZURE_TENANT_ID, AZURE_CLIENT_ID, API_SCOPE } = process.env;

    // Use cached validator for the tenant
    const validator = await getCachedValidator(AZURE_TENANT_ID);

    const options: ValidateTokenOptions = {
      allowedTenants: [AZURE_TENANT_ID],
      audience: `${AZURE_CLIENT_ID}`,
      issuer: `https://login.microsoftonline.com/${AZURE_TENANT_ID}/v2.0`,
      scp: [API_SCOPE]
    };

    // validate the token
    const validToken = await validator.validateToken(token, options);

    const userId: string = validToken.oid;
    const userName: string = validToken.name;
    const userEmail: string = validToken.preferred_username;
    console.log(`Token is valid for user ${userName} (${userId}) - E-mail: ${userEmail}`);

    return true; // Token is valid
  }
  catch (ex) {
      // Token is invalid - return a 401 error
      console.error(ex);
      return false; // Token is invalid      
  }
}

// Helper: Get OBO token for Graph
async function getOboToken(userToken: string) {
  const msalConfig = {
    auth: {
      clientId: process.env["AZURE_CLIENT_ID"]!,
      authority: `https://login.microsoftonline.com/${process.env["AZURE_TENANT_ID"]}`,
      clientSecret: process.env["AZURE_CLIENT_SECRET"]!
    }
  };
  const cca = new ConfidentialClientApplication(msalConfig);
  const oboRequest: OnBehalfOfRequest = {
    oboAssertion: userToken,
    // scopes: [`${process.env["GRAPH_AUDIENCE"]}/.default`]
    scopes: [".default"]
  };
  const result = await cca.acquireTokenOnBehalfOf(oboRequest);
  if (!result?.accessToken) throw new Error("Failed to acquire OBO token");
  return result.accessToken;
}

// Helper: Get approot folder id
async function getAppRootFolderId(graphToken: string) {
  const fetch = (await import("node-fetch")).default;
  const res = await fetch("https://graph.microsoft.com/v1.0/me/drive/special/approot", {
    headers: { Authorization: `Bearer ${graphToken}` }
  });
  if (!res.ok) throw new Error("Failed to get approot folder");
  const data = await res.json();
  if (!data || typeof data !== "object" || !('id' in data)) throw new Error("No id property in approot folder response");
  return (data as { id: string }).id;
}

// Helper: Read settings JSON from approot
async function readSettingsFile(graphToken: string, approotId: string) {
  const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${approotId}:/settings.json:/content`, {
    headers: { Authorization: `Bearer ${graphToken}` }
  });
  if (res.status === 404) return {}; // No file yet
  if (!res.ok) throw new Error("Failed to read settings file");
  return await res.json();
}

// Helper: Write settings JSON to approot
async function writeSettingsFile(graphToken: string, approotId: string, settings: any) {
  const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${approotId}:/settings.json:/content`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${graphToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  });
  if (!res.ok) throw new Error("Failed to write settings file");
}

// CORS headers utility
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "authorization,content-type"
};

function withCorsHeaders(response: HttpResponseInit): HttpResponseInit {
  return {
    ...response,
    headers: { ...corsHeaders, ...(response.headers || {}) }
  };
}

export async function userSettings(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    if (request.method === "OPTIONS") {
      // CORS preflight support (skip OAuth)
      return withCorsHeaders({ status: 204 });
    }

    // Require OAuth2 Bearer token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return withCorsHeaders({ status: 401, body: "Missing or invalid Authorization header" });
    }
    const userToken = authHeader.replace("Bearer ", "");

    // Validate the token
    if (!await validateToken(userToken)) {
      return withCorsHeaders({ status: 401, body: "Unauthorized - Token missing or not valid" }); // Token is invalid
    }

    // Get OBO token for Graph API
    const graphToken = await getOboToken(userToken);

    // Get approot folder ID
    const approotId = await getAppRootFolderId(graphToken);

    // Read current settings
    let settings = await readSettingsFile(graphToken, approotId);

    // Parse key from URL (for PUT/DELETE)
    const urlParts = request.url.split("/");
    const key = decodeURIComponent(urlParts[urlParts.length - 1] || "");

    if (request.method === "GET") {
      // List all settings
      const response = Object.entries(settings).map(([k, v]) => ({ key: k, value: v }));
      return withCorsHeaders({ status: 200, jsonBody: response });
    }

    if (request.method === "POST") {
      // Add new setting
      const value = await request.json();
      if (!key || typeof value !== "string") return withCorsHeaders({ status: 400, body: "Missing key or value" });
      if (settings[key]) return withCorsHeaders({ status: 409, body: "Key already exists" });
      settings[key] = value;
      await writeSettingsFile(graphToken, approotId, settings);
      return withCorsHeaders({ status: 201, body: "Setting added" });
    }

    if (request.method === "PUT") {
      // Update setting
      const value = await request.json();
      if (!key || typeof value !== "string") return withCorsHeaders({ status: 400, body: "Missing key or value" });
      if (!settings[key]) return withCorsHeaders({ status: 404, body: "Key not found" });
      settings[key] = value;
      await writeSettingsFile(graphToken, approotId, settings);
      return withCorsHeaders({ status: 200, body: "Setting updated" });
    }

    if (request.method === "DELETE") {
      // Remove setting
      if (!key) return withCorsHeaders({ status: 400, body: "Missing key" });
      if (!settings[key]) return withCorsHeaders({ status: 404, body: "Key not found" });
      delete settings[key];
      await writeSettingsFile(graphToken, approotId, settings);
      return withCorsHeaders({ status: 200, body: "Setting removed" });
    }

    return withCorsHeaders({ status: 405, body: "Method not allowed" });
  } catch (err: any) {
    context.error(err);
    return withCorsHeaders({ status: 500, body: err.message || "Internal server error" });
  }
}

// Register the function for all RESTful methods
app.http("userSettings", {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  route: "userSettings/{key?}",
  authLevel: "anonymous", // OAuth handled in code, so set to anonymous
  handler: userSettings
});
