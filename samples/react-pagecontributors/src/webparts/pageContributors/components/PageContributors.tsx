import * as React from 'react';
import * as strings from 'pageContributorsStrings';
import { PersonaSize, IFacepileProps, Facepile, OverflowButtonType, Spinner, MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/index';
import {
    Environment,
    EnvironmentType
} from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp';
import { IPageContributorsProps } from "./IPageContributorsProps";

export class PageContributor {
    public displayName: string;
    public imageUrl: string;
    public constructor(userField) {
        this.displayName = userField.Title;
        this.imageUrl = `/_layouts/15/userphoto.aspx?size=M&accountname=${userField.Email}`;
    }
}

function RemoveDuplicates(contributors: PageContributor[]): PageContributor[] {
    if (!contributors || !contributors.length)
        return [] as PageContributor[];

    let results: PageContributor[] = [];
    contributors.forEach(contributor => {
        let alreadyExists = false;
        results.forEach(result => {
            if (result.displayName == contributor.displayName) {
                alreadyExists = true;
            }
        });
        if (!alreadyExists) {
            results.push(contributor);
        }
    });
    return results;
}

export class PageContributorsMockData {
    private static _items: PageContributor[] = [
        { displayName: 'Stéphane Magne', imageUrl: null },
        { displayName: 'Brangelina Pitt', imageUrl: null },
        { displayName: 'Pika Chu', imageUrl: null },
        { displayName: 'Rhino Faringite', imageUrl: null },
        { displayName: 'Nobert Lenoir', imageUrl: null }
    ];
    public static get(): Promise<PageContributor[]> {
        return new Promise<PageContributor[]>((resolve) => {
            setTimeout(() => {
                resolve(PageContributorsMockData._items);
            }, 2000);
        });
    }
}

export class PageContributorsService {
    public static getPageContributors(pageServerRelativeUrl: string): Promise<PageContributor[]> {
        return new Promise<PageContributor[]>((resolve, reject) => {
            sp.web.getFileByServerRelativeUrl(pageServerRelativeUrl)
                .select('ModifiedBy')
                .expand('ModifiedBy')
                .get()
                .then(file => {
                    sp.web.getFileByServerRelativeUrl(pageServerRelativeUrl)
                        .versions
                        .orderBy('Created')
                        .select('ID, Created, CreatedBy')
                        .expand('CreatedBy')
                        .top(100)
                        .get().then(versions => {
                            let history = versions.map((version) => {
                                return new PageContributor(version.CreatedBy);
                            });
                            history.unshift(new PageContributor(file['ModifiedBy']));
                            history = RemoveDuplicates(history);
                            resolve(history);
                        });
                })
                .catch(error => reject(error));
        });
    }
}

export interface IPageContributorsState {
    contributors: PageContributor[];
    loading: boolean;
    error: string;
}

function Loading(props){
    if (!props.show){
        return null;
    }

    return (
        <div style={{ margin: '0 auto' }}><Spinner label={strings.Loading} /></div>
    );
}

function ErrorMessage(props){
     if (!props.message){
        return null;
    }

    return (
        <MessageBar messageBarType={MessageBarType.error}>{props.message}</MessageBar>
    );
}

export default class PageContributors extends React.Component<IPageContributorsProps, IPageContributorsState> {

    constructor(props, state) {
        super(props);

        this.state = {
            contributors: [] as PageContributor[],
            loading: true,
            error: null
        };
    }

    public componentDidMount(): void {
        this._loadUsers();
    }

    public render(): React.ReactElement<null> {

        let facepileProps: IFacepileProps = {
            personaSize: this.props.personaSize,
            maxDisplayablePersonas: this.props.numberOfFaces,
            overflowButtonType: OverflowButtonType.descriptive,
            overflowButtonProps: {
            },
            personas: this.state.contributors.map((contributor) => {
                return { personaName: contributor.displayName, imageUrl: contributor.imageUrl };
            })
        };
        const contributors: JSX.Element = this.state.contributors.length ? <Facepile {...facepileProps} /> : <div />;

        return (
            <div>
                <Loading show={this.state.loading}/>
                <ErrorMessage message={this.state.error}/>
                {contributors}
            </div>
        );
    }

    public componentDidUpdate(prevProps: IPageContributorsProps, prevState: IPageContributorsState, prevContext: any): void {
        if (this.props.pageUrl !== prevProps.pageUrl) {
            this._loadUsers();
        }
    }

    private _loadUsers(): void {
        if (Environment.type === EnvironmentType.Local) {
            PageContributorsMockData.get().then((response) => {
                this._setContributors(response);
            });
        }
        else if (Environment.type == EnvironmentType.SharePoint ||
            Environment.type == EnvironmentType.ClassicSharePoint) {
            PageContributorsService.getPageContributors(this.props.pageUrl).then(
                (response) => {
                    this._setContributors(response);
                },
                error => this._showError(error)
            );
        }
    }

    private _setContributors(contributors: PageContributor[]) {
        this.setState((prevState: IPageContributorsState, currentProps: IPageContributorsProps): IPageContributorsState => {
            prevState.loading = false;
            prevState.error = null;
            prevState.contributors = contributors;
            return prevState;
        });
    }
    private _showError(error: any) {
        this.setState((prevState: IPageContributorsState, currentProps: IPageContributorsProps): IPageContributorsState => {
            prevState.loading = false;
            prevState.error = `${error.status} ${error.message} : ${error.stack}`;
            prevState.contributors = [];
            return prevState;
        });
    }
}
