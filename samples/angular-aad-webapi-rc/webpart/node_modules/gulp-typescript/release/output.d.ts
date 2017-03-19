import * as stream from 'stream';
import * as ts from 'typescript';
import * as utils from './utils';
import * as input from './input';
import * as reporter from './reporter';
import * as project from './project';
import { RawSourceMap } from './types';
export interface OutputFile {
    fileName: string;
    original: input.File;
    sourceMapOrigins: input.File[];
    extension: {
        [kind: number]: string;
    };
    content: {
        [kind: number]: string;
    };
    pushed: boolean;
    skipPush: boolean;
    sourceMapsApplied: boolean;
    sourceMap: RawSourceMap;
    sourceMapString: string;
}
export declare enum OutputFileKind {
    JavaScript = 0,
    SourceMap = 1,
    Definitions = 2,
}
export declare class Output {
    static knownExtensions: string[];
    constructor(_project: project.Project, streamJs: stream.Readable, streamDts: stream.Readable);
    project: project.Project;
    files: utils.Map<OutputFile>;
    errors: reporter.TypeScriptError[];
    results: reporter.CompilationResult;
    streamJs: stream.Readable;
    streamDts: stream.Readable;
    write(fileName: string, content: string): void;
    /**
     * Adds the file to the `this.files`.
     * If there is already a file with the specified `fileName`, it will be merged.
     * This method should be called 3 times, 1 time for each `OutputFileKind`.
     * @param fileName The extensionless filename.
     */
    private addOrMergeFile(fileName, extension, kind, content);
    private applySourceMaps(file);
    private emit(file);
    finish(results: reporter.CompilationResult): void;
    private getError(info);
    diagnostic(info: ts.Diagnostic): void;
    error(error: reporter.TypeScriptError): void;
}
