export interface TsConfig {
    files?: string[];
    exclude?: string[];
    compilerOptions?: any;
}
export interface VinylFile {
    cwd: string;
    base: string;
    path: string;
    stat: {};
    contents: {};
    sourceMap?: any;
    relative: string;
    isBuffer(): boolean;
    isStream(): boolean;
    isNull(): boolean;
    isDirectory(): boolean;
}
export interface RawSourceMap {
    file?: string;
    sourceRoot?: string;
    version: string;
    sources: string[];
    names: string[];
    sourcesContent?: string;
    mappings: string;
}
