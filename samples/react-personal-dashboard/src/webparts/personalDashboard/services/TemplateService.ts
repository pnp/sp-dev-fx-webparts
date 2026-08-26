import * as Handlebars from 'handlebars';
import TemplateHelper from '../utilities/TemplateHelper';

export class TemplateService {
    private _handlebars: typeof Handlebars;

    public constructor() {
        this._handlebars = Handlebars.create();
        TemplateHelper.registerHelpers(this._handlebars);
    }

    public async renderTemplate(template: string, data: object): Promise<string> {
        const compiledTemplate = this._handlebars.compile(template, {
            noEscape: true
        });
        const html = compiledTemplate(data);
        return html;
    }
}