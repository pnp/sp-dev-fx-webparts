export interface TsConfig {
    files?: string[];
    include?: string[];
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
    file: string;
    sourceRoot?: string;
    version: number;
    sources: string[];
    names: string[];
    sourcesContent?: string[];
    mappings: string;
}
