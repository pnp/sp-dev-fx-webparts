import * as stream from 'stream';
import * as ts from 'typescript';
import { FilterSettings } from './main';
import { Reporter } from './reporter';
import { FileCache } from './input';
import { Output } from './output';
import { ICompiler } from './compiler';
import { TsConfig } from './types';
export declare class Project {
    input: FileCache;
    output: Output;
    previousOutput: Output;
    compiler: ICompiler;
    configFileName: string;
    projectDirectory: string;
    config: TsConfig;
    running: boolean;
    /**
     * The TypeScript library that is used for this project.
     * Can also be jsx-typescript for example.
     */
    typescript: typeof ts;
    options: ts.CompilerOptions;
    /**
     * Whether there should not be loaded external files to the project.
     * Example:
     *   In the lib directory you have .ts files.
     *   In the definitions directory you have the .d.ts files.
     *   If you turn this option on, you should add in your gulp file the definitions directory as an input source.
     * Advantage:
     * - Faster builds
     * Disadvantage:
     * - If you forget some directory, your compile will fail.
     */
    noExternalResolve: boolean;
    /**
     * Sort output based on <reference> tags.
     * tsc does this when you pass the --out parameter.
     */
    sortOutput: boolean;
    filterSettings: FilterSettings;
    singleOutput: boolean;
    reporter: Reporter;
    currentDirectory: string;
    constructor(configFileName: string, projectDirectory: string, config: TsConfig, options: ts.CompilerOptions, noExternalResolve: boolean, sortOutput: boolean, typescript?: typeof ts);
    /**
     * Resets the compiler.
     * The compiler needs to be reset for incremental builds.
     */
    reset(outputJs: stream.Readable, outputDts: stream.Readable): void;
    src(): NodeJS.ReadWriteStream;
}
