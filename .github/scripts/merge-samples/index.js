const fs = require('fs');
const path = require('path');
const https = require('https');

const repoRoot = process.cwd();
const samplesDir = path.join(repoRoot, 'samples');
const outputDir = path.join(repoRoot, '.metadata');
const outputFile = path.join(outputDir, 'samples.json');
const externalSamplesUrl = 'https://raw.githubusercontent.com/pnp/sp-dev-fx-extensions/main/.metadata/samples.json';
const externalSamplesFile = path.join(outputDir, 'extension-samples.json');

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                fs.unlink(dest, () => { }); // Delete the file async. (Ignore errors)
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }

            file.on('finish', () => {
                file.close(resolve);
            });

            file.on('error', (err) => {
                fs.unlink(dest, () => { }); // Delete the file async. (Ignore errors)
                reject(err.message);
            });
        });
    });
}

async function readSampleJson(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseErr) {
                    console.error(`Invalid JSON in ${filePath}`);
                    resolve(null); // Return null if JSON is invalid
                }
            }
        });
    });
}

async function mergeSamples() {
    try {
        // Ensure metadata directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // Download the external samples.json
        await downloadFile(externalSamplesUrl, externalSamplesFile);

        let samples = [];
        // Include external samples if available
        if (fs.existsSync(externalSamplesFile)) {
            const externalSamples = await readSampleJson(externalSamplesFile);
            if (externalSamples) {
                samples = samples.concat(externalSamples);
            }
        }

        const directories = fs.readdirSync(samplesDir, { withFileTypes: true });
        for (const dir of directories) {
            if (dir.isDirectory()) {
                const samplePath = path.join(samplesDir, dir.name, 'assets', 'sample.json');
                if (fs.existsSync(samplePath)) {
                    const sampleData = await readSampleJson(samplePath);
                    if (sampleData) { // Check if the data is not null (valid JSON)
                        samples = samples.concat(sampleData);
                    }
                }
            }
        }

        fs.writeFileSync(outputFile, JSON.stringify(samples, null, 2));
        console.log('Samples merged successfully.');
    } catch (error) {
        console.error('Failed to merge samples:', error);
    }
}

mergeSamples();
