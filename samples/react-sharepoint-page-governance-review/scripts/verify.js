'use strict';
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); const allowed = [path.join(root, 'src'), path.join(root, 'config')];
const skip = new Set(['node_modules', 'lib', 'lib-commonjs', 'dist', 'release', 'temp', 'sharepoint', 'solution', 'jest-output', 'debug']);
const files = []; function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { if (skip.has(item.name)) continue; const full = path.join(dir, item.name); if (item.isDirectory()) walk(full); else files.push(full); } } allowed.forEach(walk);
const source = files.filter(file => /\.(ts|tsx|js|json)$/.test(file)).map(file => fs.readFileSync(file, 'utf8')).join('\n');
const forbidden = [/\.post\s*\(/i, /\.patch\s*\(/i, /\.delete\s*\(/i, /\.update\s*\(/i, /Microsoft\.Graph/i, /permissions?\s*[:=]/i, /(?:clientSecret|accessToken)\s*[:=]/i, /password\s*[:=]/i, /\$top=\$\{(?!PAGE_SIZE)/i, /\$top=\d{4,}/i];
const hit = forbidden.find(pattern => pattern.test(source)); if (hit) { console.error(`Verifier rejected pattern: ${hit}`); process.exit(1); }
if (!source.includes("SPHttpClient") || !source.includes('PAGE_SIZE') || !source.includes('MAX_PAGES')) { console.error('Verifier could not find bounded SharePoint GET implementation.'); process.exit(1); }
console.log(`Verified ${files.length} src/config files: read-only verbs, sensitive integrations, secrets, and unbounded queries absent.`);
