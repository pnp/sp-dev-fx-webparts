import { ITemplates } from '../utils/ITemplates';

export const allTemplates: ITemplates[] = [
    { key: 'DefaultTemplate', text: 'Default template', mappings: 'Path,Title' },
    { key: 'TableTemplate', text: 'Table template', mappings: 'Path,Title,Filename,Fileextension,ModifiedOWSDATE,EditorOWSUSER' }
];

export default class TemplateLoader {
    public getComponent(templateToLoad: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const component: any = require("../templates/" + templateToLoad + ".js");
            resolve(component.default);
        });
    }

    public getTemplateMappings(templateToLoad: string): string {
        // Retrieve the fields for the current template
		const fields: ITemplates[] = allTemplates.filter((t) => { if (t.key === templateToLoad) return true; });
		return fields.length > 0 ? fields[0].mappings : "";
    }
}