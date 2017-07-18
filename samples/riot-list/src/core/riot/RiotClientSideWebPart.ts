import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import * as riot from "riot/riot+compiler";

export abstract class RiotClientSideWebPart<TProperties> extends BaseClientSideWebPart<TProperties> {
  protected abstract get tagName(): string;
  protected abstract get webPartOptions(): any; 
  protected abstract get rootComponentType(): any;

  public render(): void {
    this.domElement.innerHTML = `<${this.tagName}></${this.tagName}>`;
    riot.mount(this.domElement, this.tagName, this.webPartOptions);
  }
}