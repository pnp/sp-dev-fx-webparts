import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ConfidentialClientApplication, OnBehalfOfRequest } from "@azure/msal-node";

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
    scopes: ["https://graph.microsoft.com/.default"]
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

export async function userSettings(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    // Require OAuth2 Bearer token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return { status: 401, body: "Missing or invalid Authorization header" };
    }
    const userToken = authHeader.replace("Bearer ", "");
    const graphToken = await getOboToken(userToken);
    const approotId = await getAppRootFolderId(graphToken);

    // Read current settings
    let settings = await readSettingsFile(graphToken, approotId);

    // Parse key from URL (for PUT/DELETE)
    const urlParts = request.url.split("/");
    const key = decodeURIComponent(urlParts[urlParts.length - 1] || "");

    if (request.method === "GET") {
      // List all settings
      return { status: 200, jsonBody: Object.entries(settings).map(([k, v]) => ({ key: k, value: v })) };
    }

    if (request.method === "POST") {
      // Add new setting
      const value = await request.json();
      if (!key || typeof value !== "string") return { status: 400, body: "Missing key or value" };
      if (settings[key]) return { status: 409, body: "Key already exists" };
      settings[key] = value;
      await writeSettingsFile(graphToken, approotId, settings);
      return { status: 201, body: "Setting added" };
    }

    if (request.method === "PUT") {
      // Update setting
      const value = await request.json();
      if (!key || typeof value !== "string") return { status: 400, body: "Missing key or value" };
      if (!settings[key]) return { status: 404, body: "Key not found" };
      settings[key] = value;
      await writeSettingsFile(graphToken, approotId, settings);
      return { status: 200, body: "Setting updated" };
    }

    if (request.method === "DELETE") {
      // Remove setting
      if (!key) return { status: 400, body: "Missing key" };
      if (!settings[key]) return { status: 404, body: "Key not found" };
      delete settings[key];
      await writeSettingsFile(graphToken, approotId, settings);
      return { status: 200, body: "Setting removed" };
    }

    return { status: 405, body: "Method not allowed" };
  } catch (err: any) {
    context.error(err);
    return { status: 500, body: err.message || "Internal server error" };
  }
}

// Register the function for all RESTful methods
app.http("userSettings", {
  methods: ["GET", "POST", "PUT", "DELETE"],
  route: "userSettings/{key?}",
  authLevel: "anonymous", // OAuth handled in code, so set to anonymous
  handler: userSettings
});
