export class ArrayUtilities {
    public static splitToMaxLength<T>(arr: T[], length: number): T[][] {
        let result = [];
        let startIndex = 0;
        while (startIndex < arr.length) {
            result.push(arr.slice(startIndex, startIndex + length));
            startIndex += length;
        }
        return result;
    }
    public static getSubMap<T, U>(map: Map<T, U>, keys: T[]): Map<T, U> {
        let result = new Map<T, U>();
        keys.forEach(key => result.set(key, map.get(key)));
        return result;
    }
}