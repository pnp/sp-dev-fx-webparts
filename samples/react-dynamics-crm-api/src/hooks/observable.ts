type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
    private _listeners: Listener<T>[] = [];

    constructor(private _val: T) {
    }

    public get(): T {
        return this._val;
    }

    public set(val: T) {
        if (this._val !== val) {
            this._val = val;
            this._listeners.forEach(l => l(val));
        }
    }

    public subscribe(listener: Listener<T>): Unsubscriber {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        };
    }
}