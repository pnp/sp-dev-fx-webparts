import { NgModule, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement, NgElementConfig } from "@angular/elements";
import { HelloSharePointComponent } from "./helloSharePoint.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [HelloSharePointComponent],
  entryComponents: [HelloSharePointComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  public ngDoBootstrap() {
    const config: NgElementConfig = {injector: this.injector};
    const ngElement = createCustomElement(HelloSharePointComponent, config);

    if(!customElements.get("hello-sharepoint")) {
      customElements.define('hello-sharepoint', ngElement);
    }
  }
}
