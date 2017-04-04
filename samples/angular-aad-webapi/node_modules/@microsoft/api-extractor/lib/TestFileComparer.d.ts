export default class TestFileComparer {
    static assertFileMatchesExpected(actualFilename: string, expectedFilename: string): void;
    /**
     * Compares the contents of two files, and returns true if they are equivalent.
     * Note that these files are not normally edited by a human; the "equivalence"
     * comparison here is intended to ignore spurious changes that might be introduced
     * by a tool, e.g. Git newline normalization or an editor that strips
     * whitespace when saving.
     */
    static areEquivalentFileContents(actualFileContent: string, expectedFileContent: string): boolean;
    /**
     * Generates the report and writes it to disk.
     * @param reportFilename - The output filename
     * @param value - A string value to be written to file.
     */
    static writeFile(reportFilename: string, value: string): void;
    static generateFileContent(value: string): string;
}
