import * as React from 'react';
import styles from './LatestDocuments.module.scss';
import { ILatestDocumentsProps, ILatestDocumentsState } from '.';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { sp, Web, Site } from '@pnp/sp';
import { IListSubscription } from '@microsoft/sp-list-subscription';
import { Guid } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class LatestDocuments extends React.Component<ILatestDocumentsProps, ILatestDocumentsState> {
  private _listSubscription: IListSubscription;

  constructor(props: ILatestDocumentsProps) {
    super(props);

    this.state = {
      documents: [],
      error: undefined,
      loading: true
    };
  }

  public componentDidMount(): void {
    if (!this.props.libraryId) {
      return;
    }

    this._configureListSubscription();
    this._loadDocuments();
  }

  public componentDidUpdate(prevProps: Readonly<ILatestDocumentsProps>, prevState: Readonly<ILatestDocumentsState>, snapshot?: any): void {
    if (this.props.libraryId === prevProps.libraryId) {
      // something has changed but the library id is the same so no need to
      // reload documents or configure the subscription
      return;
    }

    this._configureListSubscription();
    this._loadDocuments();
  }

  public render(): React.ReactElement<ILatestDocumentsProps> {
    const { onConfigure } = this.props;
    const needsConfiguration: boolean = !this.props.libraryId;
    const { error, documents, loading } = this.state;

    return (
      <div className={styles.latestDocuments}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {needsConfiguration &&
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={onConfigure} />
        }
        {!needsConfiguration &&
          loading &&
          <div style={{ textAlign: 'center' }}><Spinner size={SpinnerSize.large} label="Loading documents..." /></div>}
        {!needsConfiguration &&
          !loading &&
          error &&
          <div style={{ textAlign: 'center' }}>The following error has occurred while loading documents: <span>{error}</span></div>}
        {!needsConfiguration &&
          !loading &&
          documents.length === 0 &&
          <div style={{ textAlign: 'center' }}>No documents found in the selected list</div>}
        {!needsConfiguration &&
          !loading &&
          documents.length > 0 &&
          <ListView
            items={documents}
            viewFields={[{
              displayName: 'Name',
              name: 'FileLeafRef',
              linkPropertyName: 'FileRef'
            }]}
            iconFieldName="FileRef"
            compact={false}
            selectionMode={SelectionMode.none} />
        }
      </div>
    );
  }

  /**
   * Loads documents from the selected document library
   */
  private _loadDocuments(): void {
    // communicate loading documents to the user
    this.setState({
      documents: [],
      error: undefined,
      loading: true
    });

    // if a site URL has been specified, use that site, otherwise assume,
    // that the selected list is in the current site
    const web: Web = this.props.siteUrl ? new Web(this.props.siteUrl) : sp.web;
    web.lists
      .getById(this.props.libraryId)
      // FileLeafRef contains the name of the file, FileRef contains the
      // server-relative URL of the file to be used in the document link
      .items.select('FileLeafRef', 'FileRef')
      .orderBy('Modified', false)
      .get()
      // show retrieved documents, if any
      .then(docs => this.setState({
        documents: docs,
        loading: false
      }))
      // show error
      .catch(err => this.setState({
        error: err,
        loading: false
      }));
  }

  /**
   * Subscribes to changes in a list documentary using the SharePoint Framework
   * ListSubscriptionFactory.
   */
  private _configureListSubscription(): void {
    if (!this.props.libraryId) {
      // no library selected. If there is an existing list subscription, remove it
      if (this._listSubscription) {
        this.props.listSubscriptionFactory.deleteSubscription(this._listSubscription);
      }

      return;
    }

    // if the selected library is located in a different site (collection),
    // we need site collection and site id to setup the list subscription
    let siteCollectionId: string, siteId: string;
    this
      ._getSiteCollectionId(this.props.siteUrl)
      .then((id: string | undefined): Promise<void | string> => {
        siteCollectionId = id;
        return this._getSiteId(this.props.siteUrl);
      })
      .then((id: string | undefined): void => {
        siteId = id;
        // remove existing subscription if any
        if (this._listSubscription) {
          this.props.listSubscriptionFactory.deleteSubscription(this._listSubscription);
        }

        this.props.listSubscriptionFactory.createSubscription({
          siteId: siteCollectionId ? Guid.parse(siteCollectionId) : undefined,
          webId: siteId ? Guid.parse(siteId) : undefined,
          listId: Guid.parse(this.props.libraryId),
          callbacks: {
            notification: this._loadDocuments.bind(this)
          }
        });
      });
  }

  /**
   * Retrieves the ID of the specified site collection
   * 
   * If no URL is specified, returns an empty resolved promise.
   * 
   * @param siteUrl URL of the site collection for which to retrieve the ID
   */
  private _getSiteCollectionId(siteUrl?: string): Promise<void | string> {
    if (!siteUrl) {
      return Promise.resolve();
    }

    return new Promise<string>((resolve: (siteId: string) => void, reject: (error: any) => void): void => {
      const site: Site = new Site(siteUrl);
      site.select('Id').get()
        .then(({ Id }): void => {
          resolve(Id);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Retrieves the ID of the specified site
   * 
   * If no URL is specified, returns a empty resolved promise.
   * 
   * @param siteUrl URL of the site for which to retrieve the ID
   */
  private _getSiteId(siteUrl?: string): Promise<void | string> {
    if (!siteUrl) {
      return Promise.resolve();
    }

    return new Promise<string>((resolve: (siteId: string) => void, reject: (error: any) => void): void => {
      const web: Web = new Web(siteUrl);
      web.select('Id').get()
        .then(({ Id }): void => {
          resolve(Id);
        })
        .catch(err => reject(err));
    });
  }
}
