import { html } from                               'common-tags';
import BaseTemplateService from                    './BaseTemplateService';

class MockTemplateService extends BaseTemplateService {
    constructor(locale: string) {
        super();    
        this.CurrentLocale = locale;
    }

    private readonly _mockFileContent: string = html`
                                        <div class='template_root'>
                                            <span><strong>Mocked external template</strong></span>
                                            {{#if showResultsCount}}
                                                <div class='template_resultCount'>
                                                    <label class='ms-fontWeight-semibold'>{{getCountMessage totalRows keywords}}</label>
                                                </div>
                                            {{/if}}
                                            <ul class='ms-List template_defaultList'>
                                                {{#each items as |item|}}
                                                    <li class='ms-ListItem ms-ListItem--image' tabindex='0'>
                                                        <span class='ms-ListItem-primaryText'><a href='{{getUrl item}}'>{{Title}}</a></span>
                                                    </li>
                                                {{/each}}
                                            </ul>
                                        </div>
                                        `;

    public getFileContent(fileUrl: string): Promise<string> {

        const p1 = new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(this._mockFileContent);
            }, 1000);
        });

        return p1;
    }

    public ensureFileResolves(fileUrl: string): Promise<void> {
        return Promise.resolve();
    }
}

export default MockTemplateService;