const fs = require('fs'); const path = require('path');
const root = path.resolve(__dirname, '..'); const ignored = new Set(['node_modules', 'lib', 'lib-commonjs', 'dist', 'release', 'temp', 'sharepoint', 'solution', 'jest-output', 'debug']);
const files = [];
function walk(dir) { for (const name of fs.readdirSync(dir)) { if (ignored.has(name)) continue; const full = path.join(dir, name); const stat = fs.statSync(full); if (stat.isDirectory()) walk(full); else if ((dir.includes(`${path.sep}src`) || dir.includes(`${path.sep}config`)) && /\.(ts|tsx|js|json)$/.test(name)) files.push(full); } }
walk(root);
const bad = [];
for (const file of files) { const source = fs.readFileSync(file, 'utf8'); const relative = path.relative(root, file); if (/\.(post|put|patch|delete|add|update|remove|create)\s*\(/i.test(source) || /\b(fetch|axios)\s*\([^)]*\{[^}]*method\s*:/is.test(source)) bad.push(`${relative}: mutation method`); if (/microsoft-graph|graph-client|graph\.microsoft|roledefinition|roleassignments|clientSecret|accessToken|apiKey|password\s*:/i.test(source)) bad.push(`${relative}: forbidden API/secret/permission reference`); if (/\$top\s*=\s*(?!\d+\b|\$\{limits\.MAX_PAGE_SIZE\})/i.test(source)) bad.push(`${relative}: unbounded $top`); }
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
console.log(`Verified ${files.length} source/config files: read-only REST and bounded queries.`);
