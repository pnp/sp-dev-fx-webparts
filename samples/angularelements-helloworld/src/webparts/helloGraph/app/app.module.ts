import { NgModule, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement, NgElementConfig } from "@angular/elements";
import { HelloGraphComponent } from "./helloGraph.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [HelloGraphComponent],
  entryComponents: [HelloGraphComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  public ngDoBootstrap() {
    if(!customElements.get("hello-graph")) {
      const AppElement = createCustomElement(HelloGraphComponent, { injector: this.injector });
      customElements.define('hello-graph', AppElement);
    }
  }
}
