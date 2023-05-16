import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useObject<T>(InitialValue?: T) {
    const [value, setValue] = useState<T>(InitialValue ?? {} as T);
    const updateValue: (Updates: Partial<T>) => void = (Updates: Partial<T>) => setValue((prev) => ({ ...prev, ...Updates }))
    return {
        value, updateValue, overwriteData: setValue
    };
}