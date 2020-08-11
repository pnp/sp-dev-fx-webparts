import * as PropTypes from 'prop-types';
import * as React from 'react';
import styles from './AvatarGenerator.module.scss';
import { IAvatarGeneratorProps } from './IAvatarGeneratorProps';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Avatar, Piece, allOptions, OptionContext, AvatarStyle } from "avataaars";
import { TabPanel } from "./TabPanel";
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import * as FileSaver from 'file-saver';
import { MSGraphClient } from "@microsoft/sp-http";
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const options: IChoiceGroupOption[] = [
  { key: AvatarStyle.Circle, text: 'Circle' },
  { key: AvatarStyle.Transparent, text: 'Transparent' }
];

export interface IAvatarGeneratorState {
  avatarStyle: AvatarStyle;
  value: number;
  open: boolean;
  savedMessage: string;
  savedMessageTitle: string;
}

export default class AvatarGenerator extends React.Component<IAvatarGeneratorProps, IAvatarGeneratorState> {
  public static childContextTypes = {
    optionContext: PropTypes.instanceOf(OptionContext)
  };

  private avatarRef: Avatar | null = null;
  private canvasRef: HTMLCanvasElement | null = null;

  private optionContext: OptionContext = new OptionContext(allOptions);

  constructor(props: IAvatarGeneratorProps) {
    super(props);
    this.state = {
      avatarStyle: AvatarStyle.Circle,
      value: 0,
      open: false,
      savedMessage: "",
      savedMessageTitle: ""
    };
  }

  public getChildContext() {
    return { optionContext: this.optionContext };
  }

  public componentDidMount() {

    const { optionContext } = this;
    const value = optionContext.options;
    optionContext.options.map((option, index) => {
      const optionState = optionContext.getOptionState(option.key)!;
      if (optionState.available <= 0) {
        return null;
      }
    });
    this.forceUpdate();
  }

  public a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  private triggerDownload = (imageBlob: Blob, fileName: string) => {
    FileSaver.saveAs(imageBlob, fileName);
  }

  private saveAsProfile = (imageBlob: Blob) => {
    var reader = new FileReader();
    var tempfile = new File([imageBlob], "myavataaars.png", { type: "image/png" });
    this.props.context.msGraphClientFactory
      .getClient().then((client: MSGraphClient) => {
        client
          .api("me/photo/$value")
          .version("v1.0").header("Content-Type", "image/png").put(tempfile, (err, res) => {
            if (!err) {
              this.setState({
                open: true, savedMessage: "Your profile picture is updated",
                savedMessageTitle: "Profile Picture Saved"
              });
            } else {
              this.setState({
                open: true, savedMessage: err.message,
                savedMessageTitle: "Error while saving Profile Picture"
              });
            }
          });
      });
  }

  private onDownloadPNG = (isDownload: boolean) => {
    const svgNode = ReactDOM.findDOMNode(this.avatarRef!);
    const canvas = this.canvasRef!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const anyWindow = window as any;
    const DOMURL = anyWindow.URL || anyWindow.webkitURL || window;

    const data = svgNode["outerHTML"];
    const img = new Image(canvas.width, canvas.height);
    const svg = new Blob([data], { type: 'image/svg+xml' });
    const url = DOMURL.createObjectURL(svg);

    img.onload = () => {
      ctx.save();
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      DOMURL.revokeObjectURL(url);
      this.canvasRef!.toBlob(imageBlob => {
        if (isDownload) {
          this.triggerDownload(imageBlob!, 'myavataaars.png');
        } else {
          this.saveAsProfile(imageBlob!);
        }
      });
    };
    img.src = url;
  }

  public _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void => {
    this.setState({ avatarStyle: option.key as AvatarStyle });
  }

  public handleClose = () => {
    this.setState({ open: false });
  }

  public render(): React.ReactElement<IAvatarGeneratorProps> {
    let count: number = -1;
    let internalcount: number = -1;
    return (
      <div className={styles.avatarGenerator}>
        {this.props.description &&
          <h1>{this.props.description}</h1>}
        <div className={styles.container}>
          <div className={styles.row} style={{ textAlign: "center" }}>
            <div className={styles.column4}>
              <Avatar ref={(ref) => { this.avatarRef = ref; }}
                avatarStyle={this.state.avatarStyle}
              />
              <ChoiceGroup styles={{ flexContainer: { display: "flex" } }}
                defaultSelectedKey={AvatarStyle.Circle} options={options} onChange={this._onChange} label="Avatar Style" />
              <Button variant="contained" style={{ marginTop: 10 }} color="primary" onClick={(ev) => {
                this.onDownloadPNG(false);
              }}>
                Save as Profile Picture
              </Button>
              <Button variant="contained" style={{ marginTop: 10 }} color="primary" onClick={(ev) => {
                this.onDownloadPNG(true);
              }}>
                Download as Image
              </Button>
            </div>
            <div className={styles.column8}>
              <AppBar position="static">
                <Tabs
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="primary"
                  value={this.state.value}
                  onChange={(ev, num) => { this.setState({ value: num }); }}
                  aria-label="simple tabs example">
                  {this.optionContext.options.map((option, index) => {
                    const optionState = this.optionContext.getOptionState(option.key)!;
                    if (optionState.available <= 0) {
                      return null;
                    } else {
                      count++;
                      return <Tab label={option.label} {...this.a11yProps(count)}></Tab>;
                    }
                  })}
                </Tabs>
              </AppBar>
              {this.optionContext.options.map((option, index) => {
                const optionState = this.optionContext.getOptionState(option.key)!;
                if (optionState.available <= 0) {
                  return null;
                } else {
                  internalcount++;
                  switch (option.key) {
                    case "topType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle="Circle"
                              pieceType="top"
                              pieceSize="100"
                              topType={type} /></div>);
                          })}
                      </TabPanel>;
                    case "accessoriesType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="accessories"
                              pieceSize="100"
                              accessoriesType={type} /></div>);
                          })}
                      </TabPanel>;
                    case "hairColor":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            > <Piece
                                avatarStyle=""
                                pieceType="top"
                                pieceSize="100"
                                topType="LongHairFro"
                                hairColor={type} />
                            </div>);
                          })}
                      </TabPanel>;
                      break;
                    case "facialHairType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="facialHair"
                              pieceSize="100"
                              facialHairType={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "clotheType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="clothe"
                              pieceSize="100"
                              clotheType={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "clotheColor":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="clotheColor"
                              pieceSize="100"
                              clotheColor={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "graphicType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="graphics"
                              pieceSize="100"
                              graphicType={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "eyeType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="eyes"
                              pieceSize="100"
                              eyeType={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "eyebrowType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="eyebrows"
                              pieceSize="100"
                              eyebrowType={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "mouthType":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="mouth"
                              pieceSize="100"
                              mouthType={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    case "skinColor":
                      return <TabPanel value={this.state.value} index={internalcount}>
                        {optionState.options
                          .map(type => {
                            return (<div className={styles.piece}
                              onClick={(ev) => {
                                var selectedData = this.optionContext["_data"];
                                selectedData[`${option.key}`] = type;
                                this.optionContext.setData(selectedData as any);
                              }}
                            ><Piece avatarStyle=""
                              pieceType="skin"
                              pieceSize="100"
                              skinColor={type} /></div>);
                          })}
                      </TabPanel>;
                      break;
                    default:
                      return null;
                      break;
                  }
                }
              })}
            </div>
          </div>
          <canvas
            style={{ display: "none" }}
            width='528'
            height='560'
            ref={(ref) => { this.canvasRef = ref; }}
          />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.savedMessageTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.savedMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
