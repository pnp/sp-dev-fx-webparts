import { isFunction } from "lodash";
import { IDeveloperService } from "./DeveloperServiceDescriptor";
import { isExecutingInWorkbench } from "../../Utils";

type AnyFunction = (...args: any[]) => any;

const catchAndReportExceptions = <Func extends AnyFunction>(fn: Func): ((...args: Parameters<Func>) => ReturnType<Func>) => {
    return (...args: Parameters<Func>): ReturnType<Func> => {
        try {
            return fn(...args);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };
};

const isDevParam = new URLSearchParams(window.location.href).get("isDev")?.toLowerCase();
const isDev = (isDevParam === 'true' || isDevParam === '1');

export class OnlineDeveloperService implements IDeveloperService {
    public async initialize() {
    }

    public registerScripts(scripts: { [g: string]: { [fn: string]: AnyFunction } }): void {
        if (isDev || isExecutingInWorkbench()) {
            const w: any = window as any;
            Object.keys(scripts).forEach(group => {
                Object.keys(scripts[group])
                    .filter(key => !key.startsWith('_') && isFunction(scripts[group][key]))
                    .forEach(fnName => {
                        const fn = scripts[group][fnName];
                        scripts[group][fnName] = catchAndReportExceptions(fn);
                    });
            });
            w.dev = Object.assign(w.dev || {}, scripts);
        }
    }
}