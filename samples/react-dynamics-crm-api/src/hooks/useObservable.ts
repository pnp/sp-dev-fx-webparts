import { useEffect, useState } from "react";
import { Observable } from "./observable";

export default function useObservable<T>(observable: Observable<T>): T {
    const [val, setVal] = useState(observable.get());

    useEffect(() => {
        return observable.subscribe(setVal);
    }, [observable]);

    return val;
}