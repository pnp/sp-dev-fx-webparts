import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HelloWorldComponent } from './helloWorld.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    HelloWorldComponent
  ],
  entryComponents: [
    HelloWorldComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  public ngDoBootstrap() {
    if(!customElements.get("hello-world")) {
      const AppElement = createCustomElement(HelloWorldComponent, { injector: this.injector });
      customElements.define('hello-world', AppElement);
    }
   }
}
