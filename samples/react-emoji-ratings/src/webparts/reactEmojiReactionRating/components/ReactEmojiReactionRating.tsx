import * as React from 'react';
import styles from './ReactEmojiReactionRating.module.scss';
import { IReactEmojiReactionRatingProps } from './IReactEmojiReactionRatingProps';
import { IReactEmojiReactionRatingState } from './IReactEmojiReactionRatingState';
import { DisplayMode, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import spService from './services/spService';
import {
  TextField, Stack, Label, PrimaryButton
} from '@microsoft/office-ui-fabric-react-bundle';
import Badge from '@material-ui/core/Badge/Badge';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react';

export default class ReactEmojiReactionRating extends React.Component<IReactEmojiReactionRatingProps, IReactEmojiReactionRatingState> {
  private _spService: spService = null;
  private _message = null;
  private _currentContext = null;
  private listName = this.props.listName ? this.props.listName : "EmojiReactionRating";
  private existingRating: any;
  constructor(prop: IReactEmojiReactionRatingProps, state: IReactEmojiReactionRatingState) {
    super(prop);
    this.state = {
      selectedRatingIndex: null,
      selectedRatingValue: "",
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      RatingComments: "",
      CustomMessage: "",
      configLoaded: false,
      isDialogHidden: true,
      dialogTitle: "",
      dialogBody: "",
    };



    this._currentContext = this.props.context;
    this._spService = new spService(this.props.context);
    if (Environment.type === EnvironmentType.SharePoint) {
      // this.getItems();
      // console.log("items: ", items);
    }
    else if (Environment.type === EnvironmentType.Local) {
      this._message = <div>Whoops! you are using local host...</div>;
    }

    this.selectedRating = this.selectedRating.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._onConfigure = this._onConfigure.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

public componentDidMount() {
    if (this.props.enableCount) {
      this.getItems();
    }
    if (this.props.listName && (this.props.emojisCollection.length > 0)) {
      this.setState({ configLoaded: true });
    }
  }

  public componentDidUpdate(previousProps, previousState) {
    if (previousProps.listName !== this.props.listName) {
      if (this.props.listName && (this.props.emojisCollection.length > 0)) {
        this.setState({ configLoaded: true });
        //this.getItems();
      }
    }

    if (previousProps.listMessage !== this.props.listMessage) {
      this.ShowDialogMessage("List Creation", this.props.listMessage);
    }
  }


  private submitRating(event) {

    let ratingCommnets = this.state.RatingComments ? (this.state.RatingComments).trim() : "";
    //let selectedRatingIndex = parseInt(event.target.id);
    //let selectedRatingIndex = event.target.tabIndex;
    // let selectedRatingValue = event.target.title;

    let selectedRatingIndex = this.state.selectedRatingIndex;
    let selectedRatingValue = this.state.selectedRatingValue;
    let ratingField;

    switch (selectedRatingIndex) {
      case 0:
        ratingField = "Rating1";
        break;
      case 1:
        ratingField = "Rating2";
        break;
      case 2:
        ratingField = "Rating3";
        break;
      case 3:
        ratingField = "Rating4";
        break;
      case 4:
        ratingField = "Rating5";
        break;

    }

    if (!(ratingField)) {
      console.log("Something went wrong! Please check with Admin.");
      return false;
    }

    //let pageName = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    /*  let pageName = window.location.href;
     let body: IRatingNewItem = {
       Title: this._currentContext.pageContext.user.displayName,
       Pagename: pageName ? pageName : window.location.href,
       User: this._currentContext?.pageContext.user.loginName,
       Comment: this.props.enableComments ? ratingCommnets : "",
 
     }
     //adding the right rating column and value
     body[ratingColumn] = selectedRatingValue;
     console.log("body object is: ", body); */

    let pageName = window.location.href;
    let body: any = {
      Title: this._currentContext.pageContext.user.displayName,
      Pagename: pageName ? pageName : window.location.href,
      User: this._currentContext?.pageContext.user.loginName,
      Comments: this.props.enableComments ? ratingCommnets : "",
      Rating1: "",
      Rating2: "",
      Rating3: "",
      Rating4: "",
      Rating5: "",
    };

    body[ratingField] = selectedRatingValue;
    console.log("body object is: ", body);

    if (!this.existingRating) {
      this._spService._addRatingItem(this.listName, body)
        .then(value => {
          // alert("Rating submitted successfully, thank you!");
          //this.setState({ CustomMessage: "Rating submitted successfully, thank you!" });
          console.log("Rating submitted successfully, thank you!", value.data.id);

          this.ShowDialogMessage("Rating submitted", "Your rating submitted successfully, thank you!");
        })
        .catch(error => {
          console.log("Something went wrong! please contact admin for more information.");
          this.ShowDialogError(error, "Something went wrong! please contact admin for more information.");
        });
    }
    else {
      this._spService._updateRatingItem(this.listName, body, this.existingRating.Id)
        .then(value => {
          console.log("Rating updated successfully, thank you!", value.data.id);
          this.ShowDialogMessage("Rating updated", "Your rating updated successfully, thank you!");
        })
        .catch(error => {
          console.log("Something went wrong! please contact admin for more information.");
          this.ShowDialogError(error, "Something went wrong! please contact admin for more information.");
        });

    }


  }

  private async getItems() {

    console.log("getItems: ", this._currentContext);
    let ratingItems = await this._spService.getRatingListItems(this.listName);
    console.log("ratingItems: ", ratingItems);
    console.log("this.props.emojisCollection: ", this.props.emojisCollection.length);
    let column1ValIndex, column2ValIndex, column3ValIndex, column4ValIndex, column5ValIndex;

    for (let i = this.props.emojisCollection.length; i > 0; i--) {
      switch (i) {
        case 5:
          column1ValIndex = this.props.emojisCollection.length - i;
          break;
        case 4:
          column2ValIndex = this.props.emojisCollection.length - i;
          break;
        case 3:
          column3ValIndex = this.props.emojisCollection.length - i;
          break;
        case 2:
          column4ValIndex = this.props.emojisCollection.length - i;
          break;
        case 1:
          column5ValIndex = this.props.emojisCollection.length - i;
          break;

      }
    }

    let pageRatings = await ratingItems.filter((element)=> {
      return (element["Pagename"] == window.location.href
        );
    });

    Promise.all([
      this.getRatingCount(pageRatings, 'Rating1', this.props.emojisCollection[column1ValIndex].Title),
      this.getRatingCount(pageRatings, 'Rating2', this.props.emojisCollection[column2ValIndex].Title),
      this.getRatingCount(pageRatings, 'Rating3', this.props.emojisCollection[column3ValIndex].Title),
      this.getRatingCount(pageRatings, 'Rating4', this.props.emojisCollection[column4ValIndex].Title),
      this.getRatingCount(pageRatings, 'Rating5', this.props.emojisCollection[column5ValIndex].Title),
    ])
      .then(results => {
        console.log("countRating1: ", results[0]);
        console.log("countRating2: ", results[1]);
        console.log("countRating3: ", results[2]);
        console.log("countRating4: ", results[3]);
        console.log("countRating5: ", results[4]);

        this.setState(
          {
            0: results[0],
            1: results[1],
            2: results[2],
            3: results[3],
            4: results[4]
          }
        );
      })
      .catch(error => {
        console.log("Error in getting the rating count!");
      });

    let userLogin = this._currentContext.pageContext.user.loginName;
    let userSelectedRating = await ratingItems.filter((element)=> {
      return (element["Pagename"] == window.location.href
        && (element["User"] == userLogin));
    });

    console.log("userSelectedRating: ", userSelectedRating[0]);

    this.existingRating = userSelectedRating[0];
    let currentUserRatingVal = "";
    let currentUserRatingColumn = "";
    //this.props.emojisCollection
    if (userSelectedRating[0]["Rating1"]) {
      currentUserRatingVal = userSelectedRating[0]["Rating1"];
      currentUserRatingColumn = "Rating1";

    }
    else if (userSelectedRating[0]["Rating2"]) {
      currentUserRatingVal = userSelectedRating[0]["Rating2"];
      currentUserRatingColumn = "Rating2";

    }
    else if (userSelectedRating[0]["Rating3"]) {
      currentUserRatingVal = userSelectedRating[0]["Rating3"];
      currentUserRatingColumn = "Rating3";

    }
    else if (userSelectedRating[0]["Rating4"]) {
      currentUserRatingVal = userSelectedRating[0]["Rating4"];
      currentUserRatingColumn = "Rating4";

    }
    else if (userSelectedRating[0]["Rating5"]) {
      currentUserRatingVal = userSelectedRating[0]["Rating5"];
      currentUserRatingColumn = "Rating5";

    }

    let userSelectedRatingIndex;
    await this.props.emojisCollection.filter((element, tabIndex)=> {
      if ((element["Title"] == currentUserRatingVal)) {
        userSelectedRatingIndex = tabIndex;
        return tabIndex;
      }
    });
    console.log("userSelectedRatingIndex: ", userSelectedRatingIndex);
    this.setState({
      selectedRatingIndex: userSelectedRatingIndex,
      selectedRatingValue: currentUserRatingVal
    });


  }

  private async getRatingCount(items: any[], colName: string, colValue: string) {
    let ratingCount = await items.filter((element)=> {
      return element[colName] == colValue;
    }).length;

    return ratingCount;
  }


  private selectedRating(event) {
    let selectedRatingIndex = event.target.tabIndex;
    let selectedRatingValue = event.target.title;

    this.setState({
      selectedRatingIndex: selectedRatingIndex,
      selectedRatingValue: selectedRatingValue
    });
  }

  private handleChange(event: any, newValue: string) {
    let partialState = {};
    partialState[event.target.name] = newValue || "";
    this.setState(partialState);
  }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }

  private closeDialog(e: any) {
    this.setState({ isDialogHidden: true });
    window.location.reload();
  }

  private ShowDialogMessage(title: string, body: string) {
    this.setState({
      //isRedirectDialogHidden: false,
      isDialogHidden: false,
      dialogTitle: title,
      dialogBody: body,

    });
  }

  private ShowDialogError(
    error: any,
    customErrorMessage: string
  ) {
    if (!customErrorMessage) {
      customErrorMessage = "";
    }
    this.setState({
      isDialogHidden: false,
      dialogTitle: "Error: Request failed.",
      dialogBody: customErrorMessage.concat(
        " Error message: ",
        (error.Message || error.message)
      ),

    });
  }

  public render(): React.ReactElement<IReactEmojiReactionRatingProps> {

    /* if (this.props.listMessage) {
      this.ShowDialogMessage("List Creation", this.props.listMessage);
    } */

    return !(this.state.configLoaded) ? (
      <Placeholder iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the web part.'
        buttonLabel='Configure'
        hideButton={this.props.displayMode === DisplayMode.Read}
        onConfigure={this._onConfigure} />
    ) : (this.props.listMessage ? (
      <div>{this.props.listMessage}</div>
    ) :
      (
        <div className={styles.reactEmojiReactionRating} style={{
          backgroundColor: `${this.props.selectedColor
            }`
        }}>
          <div className={styles.container}>
            <div className={styles.row}>
              <Stack>
                <div className={styles.description}>{this.props.ratingText ? this.props.ratingText : ''}</div>
              </Stack>
            </div>

            <div className={styles.row}>
              <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                {this.props.emojisCollection ? this.props.emojisCollection.map((ratingItem, tabIndex) => (
                  <Stack.Item>
                    {this.props.enableCount ? (
                      <>
                        <Badge color="secondary" overlap="circular" badgeContent={this.state[tabIndex]}>
                          <img src={ratingItem.ImageUrl}
                            className={this.state.selectedRatingIndex == tabIndex ? styles.selectedEmoji : styles.stackImage}
                            title={ratingItem.Title}
                            tabIndex={tabIndex}
                            id={tabIndex.toString()}
                            alt={ratingItem.Title}
                            onClick={this.selectedRating}
                          />
                        </Badge>
                        <Label className={styles.labelClass}>{ratingItem.Title}</Label>
                      </>) : (
                      <>
                        <img src={ratingItem.ImageUrl}
                          className={this.state.selectedRatingIndex == tabIndex ? styles.selectedEmoji : styles.stackImage}
                          title={ratingItem.Title}
                          tabIndex={tabIndex}
                          id={tabIndex.toString()}
                          alt={ratingItem.Title}
                          onClick={this.selectedRating} />
                        <Label className={styles.labelClass}>{ratingItem.Title}</Label>
                      </>
                    )
                    }
                  </Stack.Item>
                )) :
                  <Label>Rating list is empty...</Label>}
              </Stack>
            </div>

            {this.props.enableComments ? (
              <div className={styles.row}>
                <TextField
                  label={"Enter comments"}
                  value={this.state.RatingComments}
                  onChange={this.handleChange}
                  name="RatingComments"
                  rows={6}
                  multiline={true}
                  width={80}
                  className={styles.txtArea}
                />
                {this.state.RatingComments}
              </div>

            ) : ""
            }
            {this.state.CustomMessage ? (
              <div className={styles.row}>
                {this.state.CustomMessage}
              </div>
            ) : ""
            }

            {this._message}
            <div className={styles.row}>
              <div className={styles.column10}>
              </div>
              <div className={styles.column2}>
                <PrimaryButton text="Submit" onClick={this.submitRating} disabled={this.state.selectedRatingValue ? false : true} />
              </div>
            </div>

            <Dialog
              hidden={this.state.isDialogHidden}
              onDismiss={this.closeDialog}
              dialogContentProps={{
                type: DialogType.normal,
                title: this.state.dialogTitle,
                subText: this.state.dialogBody
              }}
              modalProps={{
                isBlocking: true,
                styles: { main: { maxWidth: 450 } }
              }}
            >
              <DialogFooter>
                <PrimaryButton onClick={this.closeDialog} text="OK" />
              </DialogFooter>
            </Dialog>

          </div >
        </div >
      )
    );
  }
}


