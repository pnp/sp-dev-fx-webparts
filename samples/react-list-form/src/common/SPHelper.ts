export class SPHelper {
    public static LookupValueToString(value: any | Array<any>): string {
        return value.map((item) => { return `${item.key};#${item.text}`; }).join(";#");
    }
    public static LookupValueFromString(value: string): Array<any> {
        if (value == null) {
            return [];
        }
        else {
            const splitArray = value.split(';#');
            let values = splitArray.filter((item, idx) => (idx % 2 === 0))
                .map((comp, idx) => {
                    return { key: Number(comp), text: (splitArray.length >= idx * 2 + 1) ? splitArray[idx * 2 + 1] : '' };
                });
            return values;
        }
    }
}