'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'src');
const forbidden = [
  /\.\s*(post|put|patch|delete)\s*\(/i,
  /webApiPermissionRequests/i,
  /MSGraphClient/i,
  /fetch\s*\(/i,
  /credentials\s*:/i,
  /https?:\/\/(?!developer\.microsoft\.com)/i
];

const files = [];
function visit(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(full);
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
  });
}
visit(sourceRoot);

const failures = [];
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  forbidden.forEach((pattern) => {
    if (pattern.test(content)) failures.push(`${path.relative(root, file)} matches ${pattern}`);
  });
  if (/\.ts$/.test(file) && /<[A-Z][A-Za-z0-9]*(?:\s+[A-Za-z][A-Za-z0-9:-]*(?:\s|=)|\s*\/>)/.test(content)) {
    failures.push(`${path.relative(root, file)} appears to contain JSX; use .tsx for JSX`);
  }
});

const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
['@microsoft/sp-core-library', '@microsoft/sp-http', '@microsoft/sp-property-pane', '@microsoft/sp-webpart-base'].forEach((name) => {
  if (packageJson.dependencies[name] !== '1.23.2') failures.push(`${name} is not pinned to 1.23.2`);
});
if (packageJson.scripts.test !== 'tsx --test tests/*.test.ts') failures.push('test script must run the bounded test suite');
if (packageJson.scripts.verify !== 'node scripts/verify-read-only.js') failures.push('verify script is missing');

const sample = JSON.parse(fs.readFileSync(path.join(root, 'assets', 'sample.json'), 'utf8'));
if (!Array.isArray(sample) || sample.length !== 1) failures.push('assets/sample.json must contain one metadata element');
else {
  const item = sample[0];
  if (!Array.isArray(item.thumbnails) || item.thumbnails.length !== 0) failures.push('sample metadata thumbnails must be []');
  if (!item.authors || item.authors[0].gitHubAccount !== 'vystartasv') failures.push('sample author gitHubAccount must be vystartasv');
  if (item.creationDateTime !== '2026-08-30' || item.updateDateTime !== '2026-08-30') failures.push('sample dates must be 2026-08-30');
  if (!item.downloadUrl) failures.push('sample metadata downloadUrl is required');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Read-only verifier passed: ${files.length} TypeScript source files checked.`);
}
