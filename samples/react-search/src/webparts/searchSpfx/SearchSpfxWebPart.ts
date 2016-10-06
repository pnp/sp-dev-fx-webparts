import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
	BaseClientSideWebPart,
	IPropertyPaneSettings,
	IWebPartContext,
	PropertyPaneTextField,
	PropertyPaneDropdown,
	PropertyPaneSlider,
	PropertyPaneToggle
} from '@microsoft/sp-client-preview';

import { PropertyPaneLoggingField } from './PropertyPaneControls/PropertyPaneLoggingField';

import ModuleLoader from '@microsoft/sp-module-loader';

import * as strings from 'mystrings';
import SearchSpfx, { ISearchSpfxProps } from './components/SearchSpfx';
import { ISearchSpfxWebPartProps } from './ISearchSpfxWebPartProps';
import { IExternalTemplate, IScripts, IStyles } from './utils/ITemplates';
import { defer, IDeferred } from './utils/defer';
import { allTemplates } from './templates/TemplateLoader';

// Import the search store, needed for logging the search requests
import searchStore from './flux/stores/searchStore';

// Expose React to window -> required for external template loading
require("expose?React!react");

export default class SearchSpfxWebPart extends BaseClientSideWebPart<ISearchSpfxWebPartProps> {
	private crntExternalTemplateUrl: string = "";
	private crntExternalTemplate: IExternalTemplate = null;
	private onChangeBinded: boolean = false;
	private removeChangeBinding: NodeJS.Timer = null;

	public constructor(context: IWebPartContext) {
		super(context);

		// Bind this to the setLogging method
		this.setLogging = this.setLogging.bind(this);
		this.removeLogging = this.removeLogging.bind(this);
	}

	/**
	 * Return the element to render
	 */
	private _getElement(externalTemplate?: IExternalTemplate): React.ReactElement<ISearchSpfxProps> {
		return React.createElement(SearchSpfx, {
			title: this.properties.title,
			query: this.properties.query,
			maxResults: this.properties.maxResults,
			sorting: this.properties.sorting,
			context: this.context,
			firstRender: this.renderedOnce,
			template: this.properties.template,
			externalTemplate: externalTemplate
		});
	}

	/**
	 * Load all scripts required to render the element
	 */
	private _loadScriptsBeforeRender(scriptsToLoad?: IScripts[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this._loadScripts(scriptsToLoad).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}

	/**
	 * Append the scripts to load
	 */
	private _loadScripts(scriptsToLoad: IScripts[], deferred?: IDeferred<any>): Promise<any> {
		if (!deferred) {
			deferred = defer();
		}
		if (scriptsToLoad.length > 0) {
			if (this.TypeofFullName(scriptsToLoad[0].funcName) === "function") {
				return this._loadScripts(scriptsToLoad.slice(1, scriptsToLoad.length), deferred);
			}

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = scriptsToLoad[0].url;
			// Wait untin script is loaded
			script.onload = () => {
				// Load the next script
				return this._loadScripts(scriptsToLoad.slice(1, scriptsToLoad.length), deferred);
			};
			document.getElementsByTagName('head')[0].appendChild(script);
		} else {
			deferred.resolve(null);
		}

		return deferred.promise;
	}

	/**
	 * Check the type of the function name
	 */
	private TypeofFullName(funcName: string): string {
		if (!Boolean(funcName)) {
			return "undefined";
		}
		const funcSplit: string[] = funcName.split(".");
		let scriptFunc: any = window;
		for (let i: number = 0; i < funcSplit.length; i++) {
			scriptFunc = scriptFunc[funcSplit[i]];
			if (typeof scriptFunc == "undefined")
				return "undefined";
		}
		return typeof scriptFunc;
	}

	/**
	 * Load stylesheets required for your element
	 */
	private _loadStyles(stylesToLoad: IStyles[]): void {
		stylesToLoad.forEach(style => {
			ModuleLoader.loadCss(style.url);
		});
	}

	/**
	 * Render the element
	 */
	public render(): void {
		// Check if an external template needs to be loaded
		if (this.properties.external && this.properties.externalUrl !== "") {
			// Check if the external template URL has been changed (otherwise load from memory)
			if (this.crntExternalTemplateUrl !== this.properties.externalUrl) {
				// Loading external template
				ModuleLoader.loadScript(this.properties.externalUrl, "externalTemplate").then((externalTemplate: IExternalTemplate): void => {
					// Store the current template information
					this.crntExternalTemplate = externalTemplate;
					this.crntExternalTemplateUrl = this.properties.externalUrl;
					// Check if other scripts have to be loaded before rendering the component
					// Only do this the first time the web part loads
					if (typeof externalTemplate.properties.scripts !== 'undefined') {
						this._loadScriptsBeforeRender(externalTemplate.properties.scripts).then(() => {
							// Rendering from the external template
							const element = this._getElement(externalTemplate);
							ReactDom.render(element, this.domElement);
						});
					} else {
						// Rendering from the external template
						const element = this._getElement(externalTemplate);
						ReactDom.render(element, this.domElement);
					}

					// Check if their are any styles that need to be loaded
					if (typeof externalTemplate.properties.styles !== 'undefined') {
						this._loadStyles(externalTemplate.properties.styles);
					}
				}).catch((error) => {
					console.log('ERROR: ', error);
				});
			} else {
				// Rendering from the external template from memory
				const element = this._getElement(this.crntExternalTemplate);
				ReactDom.render(element, this.domElement);
			}
		} else {
			// Render from internal template
			const element = this._getElement();
			ReactDom.render(element, this.domElement);
		}
	}

	protected onPropertyPaneRendered(): void {
		// Clear remove binding timeout. This is necessary if user applied a new configuration.
		if (this.removeChangeBinding !== null) {
			clearTimeout(this.removeChangeBinding);
			this.removeChangeBinding = null;
		}
		// Check if there is a change binding in place
		if (!this.onChangeBinded) {
			this.onChangeBinded = true;
			searchStore.addChangeListener(this.setLogging);
		}
	}


	// Will probably be renamed to onPropertyConfigurationComplete in the next drop
	protected onPropertyPaneConfigurationComplete() {
		// Remove the change binding
		this.removeChangeBinding = setTimeout(this.removeLogging, 500);
	}

	// protected onPropertyPaneConfigurationStart() {
	// 	// Will probably be deleted in the next drop
	// 	console.log('onPropertyPaneConfigurationStart');
	// }

	// protected onAfterPropertyPaneChangesApplied() {
	// 	// Will probably be deleted in the next drop
	// 	console.log('onAfterPropertyPaneChangesApplied');
	// }

	// Will probably be added in the next drop
	// protected onPropertyPaneSave() {
	// 	console.log('onPropertyPaneSave');
	// }

	/**
	 * Property pane settings
	 */
	protected get propertyPaneSettings(): IPropertyPaneSettings {
		// Default template property
		let templateProperty: any = PropertyPaneDropdown('template', {
			label: strings.FieldsTemplateLabel,
			options: allTemplates
		});

		// Check if you want to load an external template
		if (this.properties.external) {
			// Show the external URL property instead of the internal template property
			templateProperty = PropertyPaneTextField('externalUrl', {
				label: strings.FieldsExternalTempLabel
			});
		}

		return {
			pages: [{
				header: {
					description: strings.PropertyPaneDescription
				},
				groups: [{
					groupName: strings.BasicGroupName,
					groupFields: [
						PropertyPaneTextField('title', {
							label: strings.FieldsTitleLabel
						}),
						PropertyPaneTextField('query', {
							label: strings.QueryFieldLabel,
							description: strings.QueryInfoDescription,
							multiline: true
						}),
						PropertyPaneSlider('maxResults', {
							label: strings.FieldsMaxResults,
							min: 1,
							max: 50
						}),
						PropertyPaneTextField('sorting', {
							label: strings.FieldsSorting
						})
					]
				}, {
					groupName: strings.TemplateGroupName,
					groupFields: [
						PropertyPaneToggle('external', {
							label: strings.FieldsExternalLabel
						}),
						templateProperty
					]
				}, {
					groupName: strings.LoggingGroupName,
					groupFields: [
						PropertyPaneLoggingField({
							label: strings.LoggingFieldLabel,
							description: strings.LoggingFieldDescription,
							value: searchStore.getLoggingInfo(),
							retrieve: this.getLogging
						})
					]
				}],
				displayGroupsAsAccordion: true
			}]
		};
	}

	/**
	 * Function to retrieve the logging value from the store
	 */
	private getLogging(): any {
		return searchStore.getLoggingInfo();
	}

	/**
	 * Function to refresh the property pane when a change is retrieved from the store
	 */
	private setLogging(): void {
		// Refresh the property pane when search rest call is completed
		this.configureStart(true);
	}

	/**
	 * Function to remove the change binding when property pane is closed
	 */
	private removeLogging(): void {
		if (this.onChangeBinded) {
			this.onChangeBinded = false;
			searchStore.removeChangeListener(this.setLogging);
		}
	}

	/**
	 * Prevent from changing the query on typing
	 */
	protected get disableReactivePropertyChanges(): boolean {
		return true;
	}
}