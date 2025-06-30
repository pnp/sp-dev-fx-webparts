import { useState } from 'react';
import { ObjectHelper } from '../utils/Objecthelper';

export default function useLocalStorage<T>(key: string, initialValue?: T): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(() => {
        const item = window.localStorage.getItem(key);
        return item ? ObjectHelper.ParseItem(JSON.parse(item)) : initialValue;
    });


    const setItem: (newValue: T) => void = (newValue: T) => {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };


    return [
        value, setItem
    ];
}