/**
 * @file
 * Photopile Web Part React JSX component.
 *
 * Contains JSX code to render the web part with HTML templates.
 *
 * Author: Olivier Carpentier
 */
import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { IPhotopileWebPartProps } from '../IPhotopileWebPartProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'mystrings';
import styles from '../PhotopileWebPart.module.scss';
import { SPPicturesListService } from '../SPPicturesListService';
import { ISPListItem } from '../ISPList';
import * as photopile from 'photopileModule';

require('jquery');
require('jqueryui');
require('../css/photopile.scss');
require('photopileModule');

/**
 * @interface
 * Defines Photopile web part state.
 */
export interface IPhotopileState {
	results?: ISPListItem[];
  loaded: boolean;
}

/**
 * @class
 * Defines Photopile web part class.
 */
export default class PhotopileWebPart extends React.Component<IPhotopileWebPartProps, IPhotopileState> {

  //page context
  private myPageContext: IWebPartContext;

  /**
   * @function
   * Photopile web part contructor.
   */
  constructor(props: IPhotopileWebPartProps, context: IWebPartContext) {
    super(props, context);
    //Save the context
    this.myPageContext = props.context;
    //Init the component state
   	this.state = {
			results: [],
      loaded: false
		};
	};

  /**
   * @function
   * JSX Element render method
   */
  public render(): JSX.Element {

    if (this.props.listName == null || this.props.listName == '') {
      //Display select a list message
      return (
        <div className="ms-MessageBar">
          <div className="ms-MessageBar-content">
            <div className="ms-MessageBar-icon">
              <i className="ms-Icon ms-Icon--infoCircle"></i>
            </div>
            <div className="ms-MessageBar-text">
              {strings.ErrorSelectList}
            </div>
          </div>
        </div>
      );
    }
    else {
      if (this.state.loaded == false) {
        //Display the loading spinner with the Office UI Fabric Spinner control
        return (
          <div className={ styles.photopileWebPart }>
            <div className={ styles.workingOnItSpinner }>
              <Spinner type={ SpinnerType.normal } />
              <div className={ styles.loadingLabel }>
                <label className="ms-Label"> {strings.Loading}</label>
              </div>
            </div>
          </div>
        );
      }
      else if (this.state.results.length == 0) {
        //Display message no items
        return (
          <div className="ms-MessageBar ms-MessageBar--error">
            <div className="ms-MessageBar-content">
              <div className="ms-MessageBar-icon">
                <i className="ms-Icon ms-Icon--xCircle"></i>
              </div>
              <div className="ms-MessageBar-text">
                {strings.ErrorNoItems}
              </div>
            </div>
          </div>
        );
      }
      else {
        //Display the items list
        return (
            <div className='photopile-wrapper'>
                <ul className='photopile'>
                    {this.state.results.map((object:ISPListItem, i:number) => {
                        //Select the best Alt text with title, description or file's name
                        var altText: string = object.Title;
                        if (altText == null || altText == '')
                          altText = object.Description;
                        if (altText == null || altText == '')
                          altText = object.File.Name;
                        //Render the item
                        return (
                          <li>
                            <a href={object.File.ServerRelativeUrl}>
                              <img src={object.File.ThumbnailServerUrl} alt={altText}  width="133" height="100"/>
                            </a>
                          </li>
                        );
                    })}
                </ul>
            </div>
        );
      }
    }
  }


  /**
   * @function
   * Function called when the component did mount
   */
  public componentDidMount(): void {
    if (this.props.listName != null && this.props.listName != '') {
      //Init the Picture list service
      const picturesListService: SPPicturesListService = new SPPicturesListService(this.props, this.myPageContext);
      //Load the list of pictures from the current lib
      picturesListService.getPictures(this.props.listName)
        .then((response) => {
          //Modify the component state with the json result
          this.setState({ results: response.value, loaded: true});
        });
    }
  }

  /**
   * @function
   * Function called when the web part properties has changed
   */
	public componentWillReceiveProps(nextProps: IPhotopileWebPartProps): void {
    //Define the state with empty results
    this.setState({ results: [], loaded: false});
    if (nextProps.listName != null && nextProps.listName != '') {
      //Init the Picture list service
      const picturesListService: SPPicturesListService = new SPPicturesListService(nextProps, this.myPageContext);
      //Load the list of pictures from the current lib
      picturesListService.getPictures(nextProps.listName)
        .then((response) => {
          //Modify the component state with the json result
          this.setState({ results: response.value, loaded: true});
        });
    }
	}

  /**
   * @function
   * Function called when the component has been rendered (ie HTML code is ready)
   */
  public componentDidUpdate(prevProps: IPhotopileWebPartProps, prevState: IPhotopileState): void {

    if (this.state.loaded) {
      //Init photopile options
      photopile.setNumLayers(this.props.numLayers);
      photopile.setThumbOverlap(this.props.thumbOverlap);
      photopile.setThumbRotation(this.props.thumbRotation);
      photopile.setThumbBorderWidth(this.props.thumbBorderWidth);
      photopile.setThumbBorderColor(this.props.thumbBorderColor);
      photopile.setThumbBorderHover(this.props.thumbBorderHover);
      photopile.setDraggable(this.props.draggable);
      photopile.setFadeDuration(this.props.fadeDuration);
      photopile.setPickupDuration(this.props.pickupDuration);
      photopile.setPhotoZIndex(this.props.photoZIndex);
      photopile.setPhotoBorder(this.props.photoBorder);
      photopile.setPhotoBorderColor(this.props.photoBorderColor);
      photopile.setShowInfo(this.props.showInfo);
      photopile.setAutoplayGallery(this.props.autoplayGallery);
      photopile.setAutoplaySpeed(this.props.autoplaySpeed);

      //Init photopile
      photopile.scatter();
    }
  }

}
