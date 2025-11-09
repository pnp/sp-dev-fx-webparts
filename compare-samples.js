const fs = require('fs');
const path = require('path');

const samplesJsonPath = './samples.json';
const samplesJson = JSON.parse(fs.readFileSync(samplesJsonPath, 'utf8'));

const samplesDir = './samples';
const currentSamples = fs.readdirSync(samplesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .sort();

const existingSampleNames = samplesJson.map(sample => sample.name);

const missingSamples = currentSamples.filter(sample => {
  return !existingSampleNames.some(name => name.includes(sample));
});

console.log('\n=== COMPARISON RESULTS ===\n');
console.log(`Total samples in directory: ${currentSamples.length}`);
console.log(`Total samples in samples.json: ${existingSampleNames.length}`);
console.log(`Missing samples: ${missingSamples.length}\n`);

if (missingSamples.length > 0) {
  console.log('Missing samples from samples.json:');
  missingSamples.forEach(sample => console.log(`  - ${sample}`));
  console.log('\n');

  const newSamples = [];
  
  missingSamples.forEach(sampleName => {
    const sampleJsonPath = path.join(samplesDir, sampleName, 'assets', 'sample.json');
    
    try {
      if (fs.existsSync(sampleJsonPath)) {
        const sampleData = JSON.parse(fs.readFileSync(sampleJsonPath, 'utf8'));
        
        if (Array.isArray(sampleData) && sampleData.length > 0) {
          newSamples.push(sampleData[0]);
          console.log(`Successfully read sample.json for ${sampleName}`);
        } else {
          console.log(`Invalid format in sample.json for ${sampleName}`);
        }
      } else {
        console.log(`No sample.json found at: ${sampleJsonPath}`);
        
        const fallbackEntry = {
          name: `pnp-sp-dev-spfx-web-parts-${sampleName}`,
          source: "pnp",
          title: sampleName,
          shortDescription: `${sampleName} sample - Please update this description`,
          url: `https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/${sampleName}`,
          downloadUrl: `https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/${sampleName}`,
          longDescription: [`${sampleName} sample - Please update this description`],
          creationDateTime: new Date().toISOString().split('T')[0],
          updateDateTime: new Date().toISOString().split('T')[0],
          products: ["SharePoint", "Office"],
          metadata: [
            {
              key: "CLIENT-SIDE-DEV",
              value: "React"
            },
            {
              key: "SPFX-VERSION",
              value: "1.18.2"
            }
          ],
          thumbnails: [
            {
              type: "image",
              order: 100,
              url: `https://github.com/pnp/sp-dev-fx-webparts/raw/main/samples/${sampleName}/assets/preview.png`,
              alt: sampleName
            }
          ],
          authors: [],
          references: []
        };
        
        newSamples.push(fallbackEntry);
      }
    } catch (error) {
      console.log(`Error reading sample.json for ${sampleName}: ${error.message}`);
    }
  });

  console.log(`\n Successfully processed ${newSamples.length} new samples\n`);

  const updatedSamples = [...samplesJson, ...newSamples].sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  const outputPath = './samples-updated.json';
  fs.writeFileSync(outputPath, JSON.stringify(updatedSamples, null, 2), 'utf8');

  console.log(`Updated samples.json has been written to: ${outputPath}`);
  console.log(`Total samples in updated file: ${updatedSamples.length}\n`);
  
  console.log('Next steps:');
  console.log('  1. Review the generated samples-updated.json file');
  console.log('  2. Check that all author information is correct');
  console.log('  3. Verify thumbnail URLs exist');
  console.log('  4. Rename samples-updated.json to samples.json');
  console.log('  5. Create your PR\n');
} else {
  console.log('All samples are already in samples.json!\n');
}


console.log('\n=== STATISTICS ===');
console.log(`Samples with authors: ${samplesJson.filter(s => s.authors && s.authors.length > 0).length}`);
console.log(`Samples without authors: ${samplesJson.filter(s => !s.authors || s.authors.length === 0).length}`);
console.log('\n');