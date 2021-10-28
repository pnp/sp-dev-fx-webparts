/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneChoiceGroup,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneSlider,
  PropertyPaneLabel,
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import  * as lodash from "lodash";
import * as strings from "NewsWebPartStrings";
import News from "../components/News";
import { INewsProps } from "../components/INewsProps";
import dataservices from "../../services/dataservices";
import { IDropdownOption } from "office-ui-fabric-react";
import { PropertyFieldMultiSelect } from "@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect";
import { ISourcesResults } from "../../services/ISourcesResults";

import { Theme } from 'spfx-uifabric-themes';


const languages: IPropertyPaneDropdownOption[] = [
  { key: "all", text: "All Languages" },
  { key: "ar", text: "Arabic" },
  { key: "de", text: "German" },
  { key: "en", text: "English" },
  { key: "es", text: "Castilian" },
  { key: "fr", text: "French" },
  { key: "he", text: "Hebrew" },
  { key: "it", text: "Italian" },
  { key: "nl", text: "Dutch" },
  { key: "no", text: "Norwegian" },
  { key: "pt", text: "Portuguese" },
  { key: "ru", text: "Russian" },
  { key: "se", text: "Northern Sami" },
  { key: "zh", text: "Chinese" }
];

const countries: IPropertyPaneDropdownOption[] = [
  { key: "ALL", text: "All Countries" },
  { key: "AE", text: "United Arab Emirates" },
  { key: "AR", text: "Argentina" },
  { key: "AT", text: "Austria" },
  { key: "AU", text: "Australia" },
  { key: "BE", text: "Belgium" },
  { key: "BG", text: "Bulgaria" },
  { key: "BR", text: "Brazil" },
  { key: "CA", text: "Canada" },
  { key: "CH", text: "Switzerland" },
  { key: "CN", text: "China" },
  { key: "CO", text: "Colombia" },
  { key: "CU", text: "Cuba" },
  { key: "CZ", text: "Czech Republic" },
  { key: "DE", text: "Germany" },
  { key: "EG", text: "Egypt" },
  { key: "FR", text: "France" },
  { key: "GB", text: "United Kingdom" },
  { key: "GR", text: "Greece" },
  { key: "HK", text: "Hong Kong" },
  { key: "HU", text: "Hungary" },
  { key: "ID", text: "Indonesia" },
  { key: "IE", text: "Ireland" },
  { key: "IL", text: "Israel" },
  { key: "IN", text: "India" },
  { key: "IT", text: "Italy" },
  { key: "JP", text: "Japan" },
  { key: "KR", text: "Korea, Republic of" },
  { key: "LT", text: "Lithuania" },
  { key: "LV", text: "Latvia" },
  { key: "MA", text: "Morocco" },
  { key: "MX", text: "Mexico" },
  { key: "MY", text: "Malaysia" },
  { key: "NG", text: "Nigeria" },
  { key: "NL", text: "Netherlands" },
  { key: "NO", text: "Norway" },
  { key: "NZ", text: "New Zealand" },
  { key: "PH", text: "Philippines" },
  { key: "PL", text: "Poland" },
  { key: "PT", text: "Portugal" },
  { key: "RO", text: "Romania" },
  { key: "RS", text: "Serbia" },
  { key: "RU", text: "Russian Federation" },
  { key: "SA", text: "Saudi Arabia" },
  { key: "SE", text: "Sweden" },
  { key: "SG", text: "Singapore" },
  { key: "SI", text: "Slovenia" },
  { key: "SK", text: "Slovakia" },
  { key: "TH", text: "Thailand" },
  { key: "TR", text: "Turkey" },
  { key: "TW", text: "Taiwan, Province of China" },
  { key: "UA", text: "Ukraine" },
  { key: "US", text: "United States" },
  { key: "VE", text: "Venezuela, Bolivarian Republic of" },
  { key: "ZA", text: "South Africa" }
];

const categories: IPropertyPaneDropdownOption[] = [
  { key: "business", text: "business" },
  { key: "entertainment", text: "entertainment" },
  { key: "general", text: "general" },
  { key: "health", text: "health" },
  { key: "science", text: "science" },
  { key: "sports", text: "sports" },
  { key: "technology", text: "technology" }
];

export interface INewsWebPartProps {
  title: string;
  newsUrl: string;
  apiKey: string;
  endpoint: number;
  queryTitleOnly: boolean;
  domains: string;
  excludeDomains: string;
  language: string;
  country: string;
  category: string;
  query: string;
  pagesize: number;
  viewOption: string;
  sources: string[];
}

export default class NewsWebPart extends BaseClientSideWebPart<
  INewsWebPartProps
> {
  private _sourcesOptions: IDropdownOption[] = [];


  protected async onInit(): Promise<void>{
    await dataservices.init(this.context);
    // test if is teams context
    return ;
  }




  public updateProperty = (value: string):void => {
    this.properties.title = value;
  }

  private _getSources = async (apiKey: string):Promise<void> => {
   const _resultSources: ISourcesResults = await dataservices.getSources(apiKey);

    try {
      if (_resultSources && _resultSources.sources.length > 0) {
        for (const source of _resultSources.sources) {
          this._sourcesOptions.push({ key: source.id, text: source.name });
        }
        return;
      }
    } catch (error) {
      console.log("Error loading Sources", error);
      return;
    }
  }

  // Render WebPart
  public render(): void {
    const element: React.ReactElement<INewsProps> = React.createElement(
      News,
      {
        newsUrl: this.properties.newsUrl,
        apiKey: this.properties.apiKey,
        context: this.context,
        title: this.properties.title,
        updateProperty: this.updateProperty,
        displayMode: this.displayMode,
        viewOption: this.properties.viewOption,
        pageSize: this.properties.pagesize,
        themeVariant: undefined,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected async onPropertyPaneConfigurationStart():Promise<void> {
    await this._getSources(this.properties.apiKey);
    this.context.propertyPane.refresh();
  }



  protected  getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let _showPropertyQueryTitle: any = "";
    let _showPropertyDomains: any = "";
    let _showPropertyexcludeDomains: any = "";
    let _showPropertyLanguage: any = "";
    let _showPropertyCountry: any = "";
    let _showPropertyCategory: any = "";
    let _viewOption: string = undefined;

    if (!this.properties.viewOption || this.properties.viewOption === "list") {
      _viewOption = "list";
    } else {
      _viewOption = "tiles";
    }

    if (!this.properties.newsUrl) {
      this.properties.newsUrl =
        "https://newsapi.org/v2/top-headlines?category=general&sortBy=publishedAt";
    }
    if (!this.properties.endpoint) {
      this.properties.endpoint = 1;
    }

    if (!this.properties.category) {
      this.properties.category = "general";
    }

    // teste if All News or TOP Headding news
    switch (this.properties.endpoint) {
      case 2:
        this.properties.country = "";
        this.properties.category = "";
        _showPropertyCountry = "";
        _showPropertyCategory = "";

        _showPropertyQueryTitle = PropertyPaneToggle("queryTitleOnly", {
          label: "Search on Article Title Only",
          onText: "On",
          offText: "Off",
          checked: this.properties.queryTitleOnly
        });
        _showPropertyDomains = PropertyPaneTextField("domains", {
          label: "Selected Domains",
          value: this.properties.domains,
          description:
            "comma-seperated (eg bbc.co.uk, techcrunch.com, engadget.com)"
        });
        _showPropertyexcludeDomains = PropertyPaneTextField("excludeDomains", {
          label: "Exclude Domains",
          value: this.properties.excludeDomains,
          description:
            "comma-seperated (eg bbc.co.uk, techcrunch.com, engadget.com)"
        });

        // Create a news URL API
        this.properties.newsUrl = `https://newsapi.org/v2/everything?sortBy=publishedAt`;
        // Test Properties
        // Query on Article Title

        if (this.properties.queryTitleOnly) {
          if (
            this.properties.query &&
            this.properties.query.trim().length > 0
          ) {
            const _query: string = encodeURIComponent(this.properties.query);
            this.properties.newsUrl = `${this.properties.newsUrl}&qInTitle=${_query}`;
          } else {
            this.properties.newsUrl = `${this.properties.newsUrl}&qInTitle=*`;
          }
        }
        // Domains
        if (this.properties.domains) {
          this.properties.newsUrl = `${this.properties.newsUrl}&domains=${this.properties.domains}`;
        }
        // Excluded Domains
        if (this.properties.excludeDomains) {
          this.properties.newsUrl = `${this.properties.newsUrl}&excludeDomains=${this.properties.excludeDomains}`;
        }
        // Language
        if (this.properties.language && this.properties.language !== "all") {
          this.properties.newsUrl = `${this.properties.newsUrl}&language=${this.properties.language}`;
        }
        // Query Title Only
        if (!this.properties.queryTitleOnly) {
          if (
            this.properties.query &&
            this.properties.query.trim().length > 0
          ) {
            const _query: string = encodeURIComponent(this.properties.query);
            this.properties.newsUrl = `${this.properties.newsUrl}&q=${_query}`;
          } else {
            this.properties.newsUrl = `${this.properties.newsUrl}&q=*`;
          }
        }

        if (this.properties.pagesize) {
          this.properties.newsUrl = `${this.properties.newsUrl}&pageSize=${this.properties.pagesize}`;
        }

        if (this.properties.sources && this.properties.sources.length > 0) {
          if (this.properties.sources.length < 20) {
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.join()}`;
          } else {
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.slice(0, 19).join()}`;
          }
        }

        _showPropertyLanguage = PropertyPaneDropdown("language", {
          label: "Show Articles in this language",
          options: lodash.sortBy(languages, ["key"]),
          selectedKey: this.properties.language || "all"
        });

        break;
      // Top Heading
      case 1:
        // Reset Properties Vars
        this.properties.queryTitleOnly = false;
        this.properties.domains = "";
        this.properties.excludeDomains = "";
        this.properties.language = "";

        _showPropertyQueryTitle = "";
        _showPropertyDomains = "";
        _showPropertyexcludeDomains = "";
        _showPropertyLanguage = "";

        this.properties.newsUrl = `https://newsapi.org/v2/top-headlines?sortBy=publishedAt`;

        if (this.properties.query && this.properties.query.trim().length > 0) {
          const _query: string = encodeURIComponent(this.properties.query);
          this.properties.newsUrl = `${this.properties.newsUrl}&q=${_query}`;
        }

        if (this.properties.pagesize) {
          this.properties.newsUrl = `${this.properties.newsUrl}&pageSize=${this.properties.pagesize}`;
        }

        // Has sources ? add parameter to newsURl disable country and Category
        if (this.properties.sources && this.properties.sources.length > 0) {
          if (this.properties.sources.length < 20) {
            // only the first 20 sources selectd limited by API
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.join()}`;
          } else {
            this.properties.newsUrl = `${
              this.properties.newsUrl
            }&sources=${this.properties.sources.slice(0, 19).join()}`;
          }
        } else {
          // Show Category and Country if sources is not specified
          if (this.properties.category) {
            this.properties.newsUrl = `${this.properties.newsUrl}&category=${this.properties.category}`;
          }

          if (this.properties.country && this.properties.country !== "ALL") {
            this.properties.newsUrl = `${this.properties.newsUrl}&country=${this.properties.country}`;
          }

          _showPropertyCountry = PropertyPaneDropdown("country", {
            label: "Country",
            options: lodash.sortBy(countries, ["text"]),
            selectedKey: this.properties.country || "ALL"
          });

          _showPropertyCategory = PropertyPaneDropdown("category", {
            label: "Category",
            options: lodash.sortBy(categories, ["key"]),
            selectedKey: this.properties.category || "general"
          });
        }

        break;
      default:
        break;
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.Title,
                  value: this.properties.title
                }),
                PropertyPaneTextField("query", {
                  label: "Search Keyword or Phrase",
                  value: this.properties.query
                }),
                PropertyFieldMultiSelect("sources", {
                  key: "sources",
                  label: "Sources",
                  disabled: false,
                  options: this._sourcesOptions,
                  selectedKeys: this.properties.sources
                }),
                PropertyPaneChoiceGroup("endpoint", {
                  label: "Show Articles from:",

                  options: [
                    { text: "Top Headlines", key: 1 },
                    { text: "All News", key: 2 }
                  ]
                }),
                _showPropertyCountry,
                _showPropertyCategory,
                _showPropertyQueryTitle,
                _showPropertyDomains,
                _showPropertyexcludeDomains,
                _showPropertyLanguage
              ]
            }
          ]
        },
        {
          header: {
            description: strings.ViewSettings
          },
          groups: [
            {
              groupFields: [

                PropertyPaneChoiceGroup("viewOption", {
                  label: strings.ViewOption,
                  options: [
                    {
                      text: "List View",
                      key: "list",
                      checked: _viewOption === "list" ? true : false,
                      iconProps: { officeFabricIconFontName: "list" }
                    },
                    {
                      text: "Tiles View",
                      key: "tiles",
                      checked: _viewOption === "ltiles" ? true : false,
                      iconProps: { officeFabricIconFontName: "Tiles" }
                    }
                  ]
                }),
                PropertyPaneLabel("", { text: "" }),
                PropertyPaneSlider("pagesize", {
                  label: strings.PageSizeLabel,
                  max: 100,
                  min: 3,
                  step: 1,
                  showValue: true,
                  value: this.properties.pagesize
                }),
                PropertyPaneLabel("", { text: strings.APILabelText }),
                PropertyPaneTextField("apiKey", {
                  label: strings.ApiKey,
                  value: this.properties.apiKey,
                  validateOnFocusOut: true,
                  onGetErrorMessage: value => {
                    if (!value) {
                      return "ApiKey is Required";
                    } else {
                      return "";
                    }
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
