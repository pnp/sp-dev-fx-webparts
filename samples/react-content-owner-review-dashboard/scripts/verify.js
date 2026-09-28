const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const skipped = new Set(['node_modules', 'lib', 'lib-commonjs', 'dist', 'release', 'temp', 'sharepoint', 'solution', 'jest-output', 'debug']);
const forbidden = [/\b(fetch|axios|XMLHttpRequest)\s*\(/i, /\.\s*(post|put|patch|delete)\s*\(/i, /\b(Graph|MSGraphClient)\b/i, /\b(permission|permissions|secret|password|clientSecret|accessToken)\s*[:=]/i, /\$top\s*=\s*(?:\$\{(?!PAGE_SIZE\b)|[A-Za-z_])/i];
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => { if (skipped.has(entry.name)) return []; const file = path.join(dir, entry.name); return entry.isDirectory() ? walk(file) : [file]; });
const files = walk(path.join(root, 'src')).concat(walk(path.join(root, 'config'))).filter(file => /\.(ts|tsx|js|json)$/.test(file));
const errors = [];
for (const file of files) { const content = fs.readFileSync(file, 'utf8'); forbidden.forEach(rule => { if (rule.test(content)) errors.push(`${path.relative(root, file)} matches ${rule}`); }); }
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Read-only verifier passed (${files.length} files scanned).`);
