import { Project } from './project';
import * as main from './main';
export declare class Filter {
    project: Project;
    constructor(project: Project, filters: main.FilterSettings);
    private mapFilenamesToFiles(filenames);
    private getFile(searchFileName);
    private referencedFrom;
    private referencedFromAll;
    match(fileName: string): boolean;
    private matchReferencedFrom(filename, file);
}
