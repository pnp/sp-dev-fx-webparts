import * as React from 'react';
import { ISearchSpfxWebPartProps } from '../ISearchSpfxWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

import searchActions from '../flux/actions/searchActions';
import searchStore from '../flux/stores/searchStore';

import { IExternalTemplate } from '../utils/ITemplates';

import TemplateLoader from '../templates/TemplateLoader';

import 'SearchSpfx.module.scss';

export interface ISearchSpfxProps extends ISearchSpfxWebPartProps {
	context: IWebPartContext;
	firstRender: Boolean;
	externalTemplate?: IExternalTemplate;
}

export interface ISearchState {
	results?: any[];
	loaded?: Boolean;
	component?: any;
	template?: string;
}

export default class SearchSpfx extends React.Component<ISearchSpfxProps, ISearchState> {
	private loader: TemplateLoader = new TemplateLoader();

	constructor(props: ISearchSpfxProps, context: IWebPartContext) {
		super(props, context);
		this.state = {
			results: [],
			loaded: false,
			component: null,
			template: ""
		};
		this._onChange = this._onChange.bind(this);
	};

	public componentWillMount(): void {
		// Check if rendering is done from an external template
		if (typeof this.props.externalTemplate !== 'undefined') {
			// Loading internal template
			this.loader.getComponent(this.props.template).then((component) => {
				this.setState({
					template: this.props.template,
					component: component
				});
			});
		}
	}

    public componentDidMount(): void {
        searchStore.addChangeListener(this._onChange);
		this._getResults(this.props);
    }

    public componentWillUnmount(): void {
        searchStore.removeChangeListener(this._onChange);
    }

	public componentWillReceiveProps(nextProps: ISearchSpfxProps): void {
		// Get the new results
		this._getResults(nextProps);
	}

	private _getResults(crntProps: ISearchSpfxProps): void {
		if (typeof crntProps.externalTemplate !== 'undefined') {
			searchActions.get(crntProps.context, crntProps.query, crntProps.maxResults, crntProps.sorting, crntProps.externalTemplate.properties.mappings);
		} else {
			searchActions.get(crntProps.context, crntProps.query, crntProps.maxResults, crntProps.sorting, this.loader.getTemplateMappings(crntProps.template));
		}
	}

	private _onChange(): void {
		// Check if another template needs to be loaded
		if (typeof this.props.externalTemplate === 'undefined' && this.state.template !== this.props.template) {
			this.loader.getComponent(this.props.template).then((component) => {
				this.setState({
					template: this.props.template,
					component: component
				});
			});
		}

        this.setState({
			results: searchStore.getSearchResults(),
			loaded: true
        });
    }

	public render(): JSX.Element {
		if (this.props.firstRender || this.state.loaded) {
			if (this.state.results.length === 0) {
				return (
					<div />
				);
			} else {
				// Load the template
				if (typeof this.props.externalTemplate !== 'undefined') {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.props.externalTemplate.component;
					/* tslint:disable:variable-name */
					return <CrntComponent {...this.props} results={this.state.results} />;
				}
				else if (this.state.component !== null) {
					/* tslint:disable:variable-name */
					const CrntComponent: any = this.state.component;
					/* tslint:disable:variable-name */
					return <CrntComponent {...this.props} results={this.state.results} />;
				} else {
					return (<div />);
				}
			}
		} else {
			return (<div />);
		}
	}
}
