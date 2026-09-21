const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); const files = [];
function walk(dir) { fs.readdirSync(dir, { withFileTypes: true }).forEach(e => { const p = path.join(dir, e.name); if (e.isDirectory() && !['node_modules','lib','temp','dist','solution'].includes(e.name)) walk(p); else if (e.isFile() && /\.(ts|tsx|js|json)$/.test(e.name)) files.push(p); }); }
walk(path.join(root, 'src'));
const text = files.map(f => fs.readFileSync(f, 'utf8')).join('\n');
if (!/\.get\s*\(/.test(text)) throw new Error('No REST GET call found');
if (/\.\s*(post|put|patch|delete)\s*\(/i.test(text) || /method\s*:\s*['"](?:POST|PUT|PATCH|DELETE)['"]/i.test(text)) throw new Error('Mutation call found');
if (/webApiPermissionRequests|graph\.microsoft\.com|clientSecret|password/i.test(text)) throw new Error('Forbidden permission or secret pattern found');
if (!/MAX_SOURCES\s*=\s*4/.test(text) || !/PAGE_SIZE\s*=\s*50/.test(text) || !/MAX_PAGES\s*=\s*5/.test(text) || !/MAX_ITEMS\s*=\s*200/.test(text)) throw new Error('Bounds missing');
if (!/new URL\(.*base/.test(text) || !/nextLink/.test(text)) throw new Error('URL or pagination validation missing');
console.log(`Read-only verifier passed (${files.length} source files checked).`);
