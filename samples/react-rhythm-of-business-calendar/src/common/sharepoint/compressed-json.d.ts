declare module 'compressed-json' {
    declare function compress(src: any, options?: { reservedKeys: string[], reservedValues: string[] }): any;
    declare function decompress(compressed: any, options?: { reservedKeys: string[], reservedValues: string[] }): any;
}