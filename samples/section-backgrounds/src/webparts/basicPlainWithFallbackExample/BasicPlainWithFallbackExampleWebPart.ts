import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


export default class BasicPlainSectionBackgroundExampleWebPart extends BaseClientSideWebPart<void> {
  private readonly _textContent: string = 'This webpart has no support for section backgrounds and will fall back to the default behavior';

  public render(): void {
    this.domElement.innerHTML = `<p style="color: black">${this._textContent}</p>`;
  }
}
