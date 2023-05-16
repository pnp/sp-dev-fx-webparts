import { useState } from 'react';

export default function useObject<T>(InitialValue?: T) {
    const [value, setValue] = useState<T>(InitialValue ?? {} as T);
    const updateValue: (Updates: Partial<T>) => void = (Updates: Partial<T>) => setValue((prev) => ({ ...prev, ...Updates }))
    return {
        value, updateValue
    };
}