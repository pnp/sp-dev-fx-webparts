import { html } from                               'common-tags';
import BaseTemplateService from                    './BaseTemplateService';

class MockTemplateService extends BaseTemplateService {
    constructor(locale: string) {
        super();
        this.CurrentLocale = locale;
    }

    private readonly _mockFileContent: string = html`
<div class='template_root'>
  <div class="template_rssCard">
    <span><strong>Mocked external template</strong></span>

    <div class="ms-Grid">
      <div class="ms-Grid-row">
        {{#each items as |item|}}
          <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
            <div class="rssSingleCard">
              <div class="ms-Grid">
                <div class="ms-Grid-row">
                  <div class="ms-Grid-col ms-sm12 ms-md4">
                      <div class="previewImg">
                          <img class="cardFileIcon" src=""/>
                      </div>
                  </div>
                  <div class="ms-Grid-col ms-sm12 ms-md8">
                      <span class="ms-ListItem-primaryText"><a href="">Title</a></span>
                      <span class="ms-ListItem-secondaryText">short description</span>
                  </div>
                </div>
                <div class="ms-Grid-row">
                  <div class="ms-Grid-col ms-sm12">
                      <div class="comments">Description</div>
                      <div class="date">Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {{/each}}
      </div>
    </div>
  </div>
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
