import { NgModule, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement, NgElementConfig } from "@angular/elements";
import { HelloPnPJSSharePointComponent } from "./helloPnPJSSharePoint.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [HelloPnPJSSharePointComponent],
  entryComponents: [HelloPnPJSSharePointComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  public ngDoBootstrap() {
    const config: NgElementConfig = {injector: this.injector};
    const ngElement = createCustomElement(HelloPnPJSSharePointComponent, config);

    if(!customElements.get("hello-pnp-js-sharepoint")) {
      customElements.define('hello-pnp-js-sharepoint', ngElement);
    }
   }
}
