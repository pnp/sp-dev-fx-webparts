import { ModuleType } from "./ModuleType.enum";

export interface IModule {
    id: string;
    type: ModuleType;
    data: string;
}