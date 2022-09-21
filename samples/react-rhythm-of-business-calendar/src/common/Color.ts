import { clamp, padStart } from "lodash";

export class Color {
    public static parse(val: string): Color {
        const red = parseInt(val.substring(1, 3), 16);
        const green = parseInt(val.substring(3, 5), 16);
        const blue = parseInt(val.substring(5, 7), 16);
        return new Color(red, green, blue, 1);
    }

    private _alpha: number;
    private _red: number;
    private _green: number;
    private _blue: number;

    constructor(red: number, green: number, blue: number, alpha: number = 1.0) {
        this.alpha = alpha;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public clone(): Color {
        return new Color(this.red, this.green, this.blue, this.alpha);
    }

    public get alpha(): number { return this._alpha; }
    public set alpha(val: number) { this._alpha = clamp(val, 0.0, 1.0); }

    public get red(): number { return this._red; }
    public set red(val: number) { this._red = clamp(val, 0, 255); }

    public get green(): number { return this._green; }
    public set green(val: number) { this._green = clamp(val, 0, 255); }

    public get blue(): number { return this._blue; }
    public set blue(val: number) { this._blue = clamp(val, 0, 255); }

    public opacity(val: number): this {
        this.alpha = val;
        return this;
    }

    public lighten(val: number): Color {
        if (val === 0 || isNaN(val)) return this.clone();

        let { red, green, blue } = this;
        red += Math.round((255 - red) * val);
        green += Math.round((255 - green) * val);
        blue += Math.round((255 - blue) * val);

        return new Color(red, green, blue, this.alpha);
    }

    public darken(val: number): Color {
        if (val === 0 || isNaN(val)) return this.clone();

        let { red, green, blue } = this;
        red = Math.round(red * (1 - val));
        green = Math.round(green * (1 - val));
        blue = Math.round(blue * (1 - val));

        return new Color(red, green, blue, this.alpha);
    }

    public toCssString(): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    public toHexString(): string {
        const toHexComponent = (val: number) => padStart(val.toString(16), 2, '0');
        const red = toHexComponent(this.red);
        const green = toHexComponent(this.green);
        const blue = toHexComponent(this.blue);
        return `#${red}${green}${blue}`;
    }
}