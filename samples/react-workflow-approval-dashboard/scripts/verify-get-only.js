const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src');
const forbidden = /\b(?:POST|PUT|PATCH|DELETE)\b|\.\s*(?:post|put|patch|delete)\s*\(/i;
const files = [];
function visit(folder) {
  for (const name of fs.readdirSync(folder)) {
    const full = path.join(folder, name);
    if (fs.statSync(full).isDirectory()) visit(full);
    else if (/\.(ts|tsx|json)$/.test(name)) files.push(full);
  }
}
visit(root);
const violations = files.filter(file => forbidden.test(fs.readFileSync(file, 'utf8')));
if (violations.length) { console.error(`Non-GET API verb found in ${violations.join(', ')}`); process.exit(1); }
process.stdout.write(`GET-only static check passed (${files.length} source files scanned).\n`);
