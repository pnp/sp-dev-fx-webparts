import { useState } from 'react';

export default function useObject<T>(initialValue: T): [T, (newValue: Partial<T>) => void] {
    const [value, setValue] = useState<T>(initialValue);
    const update: (newValue: Partial<T>) => void = (newValue: Partial<T>) => setValue({ ...value, ...newValue });
    return [value, update] as [T, (newValue: Partial<T>) => void];
}