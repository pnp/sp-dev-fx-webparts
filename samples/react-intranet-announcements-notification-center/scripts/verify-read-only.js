'use strict';
const fs = require('fs'); const path = require('path');
const root = path.resolve(__dirname, '..'); const skipped = new Set(['node_modules', 'lib', 'lib-commonjs', 'dist', 'release', 'temp', 'sharepoint', 'solution', 'jest-output', 'debug']);
const files = [];
function walk(dir) { for (const name of fs.readdirSync(dir)) { if (skipped.has(name)) continue; const full = path.join(dir, name); const stat = fs.statSync(full); stat.isDirectory() ? walk(full) : files.push(full); } }
walk(root);
const source = files.filter((file) => (file.startsWith(path.join(root, 'src')) || file.startsWith(path.join(root, 'config'))) && /\.(ts|tsx|js|json|jsonc)$/.test(file)).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const forbidden = [/\.post\s*\(/i, /\.patch\s*\(/i, /\.delete\s*\(/i, /\.add\s*\(/i, /\.update\s*\(/i, /\.create\s*\(/i, /\b(?:POST|PATCH|MERGE|DELETE)\b/i, /msGraphClient|graph.microsoft.com|MicrosoftGraphClient/i, /webApiPermissionRequests|PermissionKind|\.permissions?\b/i, /clientSecret|client_secret|password\s*:/i, /\$top\s*=\s*['"]?(?:\s*['"]|undefined|null)/i];
const violations = forbidden.filter((rule) => rule.test(source));
if (violations.length) { console.error(`Read-only verification failed (${violations.length} rule(s)).`); process.exit(1); }
if (!source.includes('$top=') || !source.includes('PAGE_SIZE = 50')) { console.error('Read-only verification failed: bounded $top=50 is missing.'); process.exit(1); }
console.log(`Read-only verification passed for ${files.length} files.`);
