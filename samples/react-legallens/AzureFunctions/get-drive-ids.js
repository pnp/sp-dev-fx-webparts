const { ClientSecretCredential } = require('@azure/identity');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

// ──────────────────────────────────────────────────────────────────────────
const TENANT_ID           = 'TENANT_ID';
const CLIENT_ID           = 'CLIENT_ID';
const CLIENT_SECRET       = 'CLIENT_SECRET';
const SHAREPOINT_SITE_ID  = 'SHAREPOINT_SITE_URL (Without https),DOC_LIBRARY_ID_1(Contracts),DOC_LIBRARY_ID_2(Signed Documents)';
const CONTRACTS_LIST_ID   = 'CONTRACTS_LIST_ID';
const SIGNED_DOCS_LIST_ID = 'SIGNED_DOCS_LIST_ID';
const TOKENS_LIST_ID      = 'TOKENS_LIST_ID';
// ──────────────────────────────────────────────────────────────────────────

async function main() {
  const credential = new ClientSecretCredential(TENANT_ID, CLIENT_ID, CLIENT_SECRET);
  const client = Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => {
        const token = await credential.getToken('https://graph.microsoft.com/.default');
        return token.token;
      },
    },
  });

  async function getDriveId(listId, label) {
    try {
      const drive = await client
        .api(`/sites/${SHAREPOINT_SITE_ID}/lists/${listId}/drive`)
        .get();
      console.log(`\n ${label}`);
      console.log(`   List GUID  : ${listId}`);
      console.log(`   Drive ID   : ${drive.id}`);
      console.log(`   Drive Name : ${drive.name}`);
      return drive.id;
    } catch (e) {
      console.error(`\n ${label} — ${e.message}`);
      console.log(`   (List GUID ${listId} may not have an associated drive — only document libraries do)`);
      return null;
    }
  }

  console.log('Fetching drive IDs from Microsoft Graph...\n');
  await getDriveId(CONTRACTS_LIST_ID,   'Contracts Library');
  await getDriveId(SIGNED_DOCS_LIST_ID, 'Signed Documents Library');

  console.log(`\n Tokens List`);
  console.log(`   List GUID  : ${TOKENS_LIST_ID}`);
  console.log(`   (Used directly via /sites/{siteId}/lists/{listId}/items — no drive needed)`);

  console.log('\n\nDone! The Drive IDs above are what Graph API needs for /drives/{id} calls.');
  console.log('GraphService now auto-resolves these from your list GUIDs, so no changes needed.');
}

main().catch(console.error);