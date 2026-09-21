'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const sourceFiles = [];
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(full);
    else if (/\.(ts|tsx|js|json)$/.test(entry.name)) sourceFiles.push(full);
  }
}
collect(path.join(root, 'src'));
const text = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
assert.match(text, /SPHttpClient/);
assert.match(text, /\.get\s*\(/);
assert.doesNotMatch(text, /\.(post|put|patch|delete)\s*\(/i);
assert.doesNotMatch(text, /\b(fetch|axios|HttpClient)\s*\(/i);
assert.doesNotMatch(text, /webApiPermissionRequests|method\s*:\s*['"](?:POST|PUT|PATCH|DELETE)/i);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/webparts/resourceCapacityPlanner/ResourceCapacityPlannerWebPart.manifest.json'), 'utf8'));
assert.ok(manifest.id && manifest.componentType === 'WebPart');
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/config/capacity-planner.config.json'), 'utf8'));
assert.ok(config.sources.length === 2 && config.maxHorizonDays <= 62 && config.maxItems <= 5000);
process.stdout.write('GET-only verifier: OK\n');
