import { NgModule, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement, NgElementConfig } from "@angular/elements";
import { HelloPnPJSGraphComponent } from "./helloPnPJSGraph.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [HelloPnPJSGraphComponent],
  entryComponents: [HelloPnPJSGraphComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  public ngDoBootstrap() {
    const config: NgElementConfig = {injector: this.injector};
    const ngElement = createCustomElement(HelloPnPJSGraphComponent, config);

    if(!customElements.get("hello-pnp-js-graph")) {
      customElements.define('hello-pnp-js-graph', ngElement);
    }
  }
}
