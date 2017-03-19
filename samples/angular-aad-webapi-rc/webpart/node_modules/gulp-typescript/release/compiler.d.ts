import * as ts from 'typescript';
import { RawSourceMap } from './types';
import { File } from './input';
import { Host } from './host';
import { Project } from './project';
export interface ICompiler {
    prepare(_project: Project): void;
    inputFile(file: File): any;
    inputDone(): any;
    /**
     * Corrects the paths in the sourcemap.
     * Returns true when the file is located
     * under the base path.
     */
    correctSourceMap(map: RawSourceMap): boolean;
}
/**
 * Compiles a whole project, with full type checking
 */
export declare class ProjectCompiler implements ICompiler {
    host: Host;
    project: Project;
    program: ts.Program;
    prepare(_project: Project): void;
    inputFile(file: File): void;
    inputDone(): void;
    private _commonBaseDiff;
    /**
     * Calculates the difference between the common base directory calculated based on the base paths of the input files
     * and the common source directory calculated by TypeScript.
     */
    private commonBaseDiff;
    correctSourceMap(map: RawSourceMap): boolean;
    private removeSourceMapComment(content);
}
export declare class FileCompiler implements ICompiler {
    host: Host;
    project: Project;
    program: ts.Program;
    private errorsPerFile;
    private previousErrorsPerFile;
    private compilationResult;
    prepare(_project: Project): void;
    inputFile(file: File): void;
    inputDone(): void;
    correctSourceMap(map: RawSourceMap): boolean;
}
