import * as ts from 'typescript';
import { FileCache } from './input';
import * as utils from './utils';
export declare class Host implements ts.CompilerHost {
    static libDefault: utils.Map<ts.SourceFile>;
    static getLibDefault(typescript: typeof ts, libFileName: string, originalFileName: string): any;
    typescript: typeof ts;
    currentDirectory: string;
    private externalResolve;
    private libFileName;
    input: FileCache;
    output: utils.Map<string>;
    constructor(typescript: typeof ts, currentDirectory: string, input: FileCache, externalResolve: boolean, libFileName: string);
    private reset();
    getNewLine(): string;
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory: () => string;
    getCanonicalFileName(filename: string): string;
    getDefaultLibFilename(): string;
    getDefaultLibFileName(): string;
    getDefaultLibLocation(): string;
    writeFile: (fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) => void;
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string;
    getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) => ts.SourceFile;
    realpath: any;
}
