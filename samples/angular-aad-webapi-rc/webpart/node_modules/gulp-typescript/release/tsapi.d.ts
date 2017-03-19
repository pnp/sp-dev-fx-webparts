import * as ts from 'typescript';
import { CompilationResult } from './reporter';
export interface TypeScript {
    convertCompilerOptionsFromJson?: (jsonOptions: any, basePath: string, configFileName?: string) => {
        options: ts.CompilerOptions;
        errors: ts.Diagnostic[];
    };
}
export interface TypeScript14 {
    createSourceFile(filename: string, content: string, target: ts.ScriptTarget, version: string): any;
}
export interface TypeScript15 {
    createSourceFile(fileName: string, content: string, target: ts.ScriptTarget, isOpen: boolean): any;
    findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean): string;
    flattenDiagnosticMessageText(messageText: string | DiagnosticMessageChain15, newLine: string): string;
    transpile(input: string, compilerOptions?: ts.CompilerOptions, fileName?: string, diagnostics?: ts.Diagnostic[]): string;
}
export interface TypeScript17 {
    parseConfigFileTextToJson(fileName: string, jsonText: string): {
        config?: any;
        error?: ts.Diagnostic;
    };
}
export declare function parseTsConfig(typescript: TypeScript14 | TypeScript15 | TypeScript17, fileName: string, content: string): {
    config?: any;
    error?: ts.Diagnostic;
};
export declare type CreateProgram = (rootNames: string[], options: ts.CompilerOptions, host?: ts.CompilerHost, oldProgram?: ts.Program) => ts.Program;
export interface Program14 {
    getDiagnostics(): ts.Diagnostic[];
    getTypeChecker(fullTypeCheckMode: boolean): TypeChecker14;
}
export interface Program15 {
    getSyntacticDiagnostics(): ts.Diagnostic[];
    getGlobalDiagnostics(): ts.Diagnostic[];
    getSemanticDiagnostics(): ts.Diagnostic[];
    getDeclarationDiagnostics(): ts.Diagnostic[];
    emit(): {
        diagnostics: ts.Diagnostic[];
        emitSkipped: boolean;
    };
}
export interface TypeChecker14 {
    getDiagnostics(sourceFile?: ts.SourceFile): ts.Diagnostic[];
    emitFiles(): {
        diagnostics: ts.Diagnostic[];
    };
}
export interface DiagnosticMessageChain15 {
    messageText: string;
    category: ts.DiagnosticCategory;
    code: number;
    next?: DiagnosticMessageChain15;
}
export interface TSFile14 {
    getLineAndCharacterFromPosition(pos: number): ts.LineAndCharacter;
}
export interface TSFile15 {
    getLineAndCharacterOfPosition(pos: number): ts.LineAndCharacter;
}
export interface TSOptions18 {
    allowJs?: boolean;
    suppressOutputPathCheck?: boolean;
}
export interface TSOptions20 extends TSOptions18 {
    baseUrl?: string;
    rootDirs?: string[];
}
export declare function isTS14(typescript: typeof ts): boolean;
export declare function isTS16OrNewer(typescript: typeof ts): boolean;
export declare function getFileName(thing: {
    filename: string;
} | {
    fileName: string;
}): string;
export declare function getDiagnosticsAndEmit(program: Program14 | Program15): [ts.Diagnostic[], CompilationResult];
export declare function getLineAndCharacterOfPosition(typescript: typeof ts, file: TSFile14 | TSFile15, position: number): {
    line: number;
    character: number;
};
export declare function createSourceFile(typescript: TypeScript14 | TypeScript15, fileName: string, content: string, target: ts.ScriptTarget, version?: string): any;
export declare function flattenDiagnosticMessageText(typescript: TypeScript14 | TypeScript15, messageText: string | DiagnosticMessageChain15): string;
export declare function transpile(typescript: TypeScript14 | TypeScript15, input: string, compilerOptions?: ts.CompilerOptions, fileName?: string, diagnostics?: ts.Diagnostic[]): string;
