/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * Angular2 web part base class
 */

import "reflect-metadata";
require('zone.js');

import {
  BaseClientSideWebPart
} from '@microsoft/sp-client-preview';

import { NgModule, ApplicationRef, Inject, ReflectiveInjector, Injector, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * All Angular2 client side web parts should inherit from this class.
 */
export default class BaseAngular2WebPart<TProperties>
  extends BaseClientSideWebPart<TProperties> {

  /**
   * Reference to the root application.
   */
  private _app: any;

  /**
   * Reference to the zone of the angular2 application to put execution (and all async tasks) in the Angular controlled zone.
   */
  private _zone: any;

  /**
   * Reference to the root component.
   */
  private _component: any;

  /**
   * The root Angular2 component for this web part.
   */
  protected get rootComponent(): any {
    return this._component;
  }

  /**
   * Array of class references for the NgModule declarations.
   */
  protected get appDeclarationTypes(): any {
    throw new Error("This API needs to be overridden in the web part class");
  }

  /**
   * Class reference of the root component.
   */
  protected get rootComponentType(): any {
    throw new Error("This API needs to be overridden in the web part class");
  }

  /**
   * Apply the changes to the component.
   */
  protected updateChanges(): void {
    throw new Error('Need to to override this method');
  }

  /**
   * On property change.
   */
  public onPropertyChange(propertyPath: string, newValue: any): void {
    // Trigger app/root-component refresh
    this._zone.run(() => {console.log('Outside Done!') });
  }

  /**
   * Render the web part. This causes the Angular2 app to be bootstrapped which
   * in turn bootsraps the Angular2 web part root component.
   */
  public render(): void {
    // @todo: most likely we need to make this width:100%
    this.domElement.innerHTML = `<ng2-webpart-${this.context.instanceId} />`;
    this._bootStrapModule();
  }

  /**
   * Bootstrap the root component of the web part.
   */
  private _bootStrapModule(): void {
    platformBrowserDynamic().bootstrapModule(this._getModule()).then(
      ngModuleRef => {

        /**
         * @todo This is a prototype method of accessing the root component.
         * Update when a stable access method is found.
         */
        this._component = this._app['_rootComponents'][0]['_hostElement']['component'];
        this.updateChanges();

        this._zone.run(() => {console.log('Outside Done!') });
      }, err => {
        console.log(err);
      }
    );
  }

  /**
   * Get the NgModule reference that will act as the root of this web part.
   */
  private _getModule(): any {
    const component: any = this.rootComponentType.getComponent(this.context.instanceId);
    const declarations = this.appDeclarationTypes.concat(component);
    const webPart = this;
    /**
    * Our goal is to define a single module class definition to be instantiated for each
      webpart (like instances of a class). When an instance of the module class is bootstrapped Angular2
      will create an annotation and attach it to the module class. However, when multiple instances of the
      same module class are bootstrapped, only the first annotation associated with the module class will be parsed.
      This results in any other module class instances on the page to not function.
      To allow multiple modules of the same class definitoin on one page to work, we need to define the
      class in a closure to create a new environment for each instance class, so that each annotation
      object will be parsed.
    */
    const AppModule = (function () {
      function AppModule(applicationRef, ngZone) {
        webPart._app = applicationRef; // applicationRef gives us a reference to the Angular2 component's properties
        webPart._zone = ngZone;
      }
      // We now attach required metadata for Angular2 that is allowable within a clousure
      const AppModule1 = Reflect.decorate([
        NgModule({
          imports: [BrowserModule],
          declarations: declarations,
          bootstrap: [component]
        }),

        Reflect.metadata('design:paramtypes', [ApplicationRef, NgZone]) // This allows Angular2's DI to inject dependencies
      ], AppModule);
      return AppModule1;
    } ());
    return AppModule;
  }
}