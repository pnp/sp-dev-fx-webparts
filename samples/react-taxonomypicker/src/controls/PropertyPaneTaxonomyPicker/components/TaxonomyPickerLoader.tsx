import * as React from 'react';
import { ITaxonomyPickerLoaderProps } from './ITaxonomyPickerLoaderProps';
import { ITaxonomyPickerLoaderState } from './ITaxonomyPickerLoaderState';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Utils } from "../../../utils/Utils";

import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';

import TaxonomyPicker, { ITaxonomyPickerProps } from "react-taxonomypicker";
import "react-taxonomypicker/dist/React.TaxonomyPicker.css";

export default class TaxonomyPickerLoader extends React.Component<ITaxonomyPickerLoaderProps, ITaxonomyPickerLoaderState> {
  constructor(props: ITaxonomyPickerLoaderProps, state: ITaxonomyPickerLoaderState) {
    super(props);

    this.state = {
      loadingScripts: true,
      errors: []
    };
  }

  public componentDidMount(): void {
    // based on the type of environment, return the correct instance of the IUserProfileService interface
    if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      this._loadSPJSOMScripts();
    } else {
      this.setState({ loadingScripts: false, errors: [...this.state.errors, "You are on localhost mode (EnvironmentType.Local), be sure you disable termSetGuid and enable defaultOptions configuration in PropertyPaneTaxonomyPicker."]  });
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.state.loadingScripts === false ?
          <TaxonomyPicker
            {...this.props}
            isLoading={this.state.loadingScripts}
          />
          :
          null
        }
        {this.state.errors.length > 0 ? this.renderErrorMessage() : null}
      </div>
    );
  }

  private _loadSPJSOMScripts() {
    const siteColUrl = Utils.getSiteCollectionUrl();
    try {
      SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/init.js', {
        globalExportsName: '$_global_init'
      })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/MicrosoftAjax.js', {
            globalExportsName: 'Sys'
          });
        })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.Runtime.js', {
            globalExportsName: 'SP'
          });
        })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.js', {
            globalExportsName: 'SP'
          });
        })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.taxonomy.js', {
            globalExportsName: 'SP'
          });
        })
        .then((): void => {
          this.setState({ loadingScripts: false });
        })
        .catch((reason: any) => {
          this.setState({ loadingScripts: false, errors: [...this.state.errors, reason] });
        });
    } catch (error) {
      this.setState({ loadingScripts: false, errors: [...this.state.errors, error] });
    }
  }

  private renderErrorMessage() {
    return (
      <div>
        {this.state.errors}
      </div>
    );
  }
}
