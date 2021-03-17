import { DisplayMode } from '@microsoft/sp-core-library';
import { clone } from '@microsoft/sp-lodash-subset';
import { Checkbox, DefaultButton, findIndex, Icon, IconButton, IsFocusVisibleClassName, ISlider, Panel, PanelType, Slider, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

import ImageCrop from './components/ImageCrop';
import ImageGrid from './components/ImageGrid';
import ItemOrder from './components/ItemOrder';

import { GrayscaleFilter } from './Filter/GrayscaleFilter';
import { SepiaFilter } from './Filter/SepiaFilter';
import { historyItem } from './HistoryItem';
import styles from './ImageManipulation.module.scss';
import { FilterType, filterTypeData, ICrop, ICropSettings, IFilterSettings, IFlipSettings, IImageManipulationSettings, IManipulationTypeDataDetails, IResizeSettings, IRotateSettings, IScaleSettings, ManipulationType, manipulationTypeData, SettingPanelType } from './ImageManipulation.types';


const flipVerticalIcon: any = require('../../svg/flipVertical.svg');
const flipHorizontalIcon: any = require('../../svg/flipHorizontal.svg');

import * as strings from 'ImageManipulationStrings';

export interface IImageManipulationConfig {
  rotateButtons: number[];
}

export interface IImageManipulationProps {
  src: string;
  settings?: IImageManipulationSettings[];
  settingschanged?: (settings: IImageManipulationSettings[]) => void;
  imgLoadError?: () => void;
  editMode?: (mode: boolean) => void;
  configsettings: IImageManipulationConfig;
  displyMode: DisplayMode;
}

export interface IImageManipulationState {
  settingPanel: SettingPanelType;
  redosettings: IImageManipulationSettings[];
}

export class ImageManipulation extends React.Component<IImageManipulationProps, IImageManipulationState> {
  private img: HTMLImageElement = null;
  private wrapperRef: HTMLDivElement = null;
  private bufferRef: HTMLCanvasElement = null;
  private bufferCtx: CanvasRenderingContext2D = null;
  private canvasRef: HTMLCanvasElement = null;
  private canvasCtx: CanvasRenderingContext2D = null;
  private manipulateRef: HTMLCanvasElement = null;
  private manipulateCtx: CanvasRenderingContext2D = null;



  constructor(props: IImageManipulationProps) {
    super(props);

    this.state = {
      settingPanel: SettingPanelType.Closed,
      redosettings: []
    };
    this.openPanel = this.openPanel.bind(this);
    this.setRotate = this.setRotate.bind(this);
    this.calcRotate = this.calcRotate.bind(this);
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.setBufferRef = this.setBufferRef.bind(this);
    this.setManipulateRef = this.setManipulateRef.bind(this);
    this.setScale = this.setScale.bind(this);
    this.closeFilter = this.closeFilter.bind(this);

  }
  public componentDidMount(): void {
    this.imageChanged(this.props.src);
  }
  public componentDidUpdate(prevProps: IImageManipulationProps): void {
    if (prevProps.src !== this.props.src) {
      this.imageChanged(this.props.src);
    } else {
      this.applySettings();
    }
  }

  private imageChanged(url: string) {
    this.img = new Image();
    this.img.src = url;
    this.img.crossOrigin = "Anonymous";
    this.img.onload = () => {

      this.applySettings();
    };
    this.img.onerror = (event: Event | string) => {
      if (this.props.imgLoadError) {
        this.props.imgLoadError();
      }
    };
  }
  private applySettings(): void {
    this.canvasRef.width = this.img.width;
    this.canvasRef.height = this.img.height;
    this.bufferRef.width = this.img.width;
    this.bufferRef.height = this.img.height;
    this.manipulateRef.width = this.img.width;
    this.manipulateRef.height = this.img.height;

    let currentwidth = this.img.width;
    let currentheight = this.img.height;
    let newwidth = currentwidth;
    let newheight = currentheight;
    this.bufferCtx.clearRect(0, 0, currentwidth, currentheight);
    this.bufferCtx.drawImage(this.img, 0, 0);


    if (this.props.settings) {
      this.props.settings.forEach((element, index) => {
        this.manipulateCtx.clearRect(0, 0, currentwidth, currentheight);
        this.manipulateRef.width = currentwidth;
        this.manipulateRef.height = currentheight;
        this.manipulateCtx.save();
        let nothingToDo: boolean = false;
        switch (element.type) {
          case ManipulationType.Flip:
            const filp = element as IFlipSettings;
            if (filp.flipY) {
              this.manipulateCtx.translate(0, currentheight);
              this.manipulateCtx.scale(1, -1);
            }
            if (filp.flipX) {
              this.manipulateCtx.translate(currentwidth, 0);
              this.manipulateCtx.scale(-1, 1);
            }
            this.manipulateCtx.drawImage(this.bufferRef, 0, 0);
            break;
          case ManipulationType.Rotate:
            const rotate = element as IRotateSettings;
            if (!rotate.rotate || rotate.rotate === 0 || isNaN(rotate.rotate)) {
              nothingToDo = true;
              break;
            }
            if (rotate.rotate) {
              const angelcalc = rotate.rotate * Math.PI / 180;
              const oldwidth = currentwidth;
              const oldheight = currentheight;
              let offsetwidth = 0;
              let offsetheight = 0;

              var a = oldwidth * Math.abs(Math.cos(angelcalc));
              var b = oldheight * Math.abs(Math.sin(angelcalc));

              var p = oldwidth * Math.abs(Math.sin(angelcalc));
              var q = oldheight * Math.abs(Math.cos(angelcalc));
              newwidth = a + b;
              newheight = p + q;

              offsetwidth = (newwidth - oldwidth) / 2;
              offsetheight = (newheight - oldheight) / 2;

              this.manipulateRef.width = newwidth;
              this.manipulateRef.height = newheight;

              this.manipulateCtx.translate(newwidth / 2, newheight / 2);
              this.manipulateCtx.rotate(angelcalc);
              this.manipulateCtx.translate(newwidth / 2 * -1, newheight / 2 * -1);

              this.manipulateCtx.drawImage(this.bufferRef, offsetwidth, offsetheight);

            }
            break;
          case ManipulationType.Scale:
            const scale = element as IScaleSettings;
            if (scale.scale) {
              this.manipulateCtx.translate(currentwidth / 2, currentheight / 2);
              this.manipulateCtx.scale(scale.scale, scale.scale);
              this.manipulateCtx.translate(currentwidth / 2 * -1, currentheight / 2 * -1);

              this.manipulateCtx.drawImage(this.bufferRef, 0, 0);
            }
            break;
          case ManipulationType.Filter:
            nothingToDo = true;
            const filter = element as IFilterSettings;
            var imageData = this.bufferCtx.getImageData(0, 0, currentwidth, currentheight);
            switch (filter.filterType) {
              case FilterType.Grayscale:
                imageData = new GrayscaleFilter().process(imageData, currentwidth, currentheight, undefined, undefined);
                break;
              case FilterType.Sepia:
                imageData = new SepiaFilter().process(imageData, currentwidth, currentheight, undefined, undefined);
                break;
            }
            this.bufferCtx.putImageData(imageData, 0, 0);
            break;
          case ManipulationType.Crop:
            const last = this.props.settings.length === index + 1;
            if (last && this.state.settingPanel === SettingPanelType.Crop) {
              //Do nothingis last and current edit
              nothingToDo = true;
            } else {
              const crop = element as ICropSettings;
              const sourceX = crop.sx;
              const sourceY = crop.sy;
              newwidth = crop.width;
              newheight = crop.height;
              this.manipulateRef.width = newwidth;
              this.manipulateRef.height = newheight;
              this.manipulateCtx.drawImage(this.bufferRef, sourceX, sourceY, newwidth, newheight, 0, 0, newwidth, newheight);
            }
            break;

          case ManipulationType.Resize:
            const resize = element as IResizeSettings;
            newwidth = resize.width;
            newheight = resize.height;
            this.manipulateCtx.drawImage(this.bufferRef, 0, 0);
        }
        this.manipulateCtx.restore();

        if (!nothingToDo) {
          this.bufferCtx.clearRect(0, 0, currentwidth, currentheight);

          this.bufferRef.width = newwidth;
          this.bufferRef.height = newheight;

          this.bufferCtx.clearRect(0, 0, newwidth, newheight);
          this.bufferCtx.drawImage(this.manipulateRef, 0, 0, newwidth, newheight);


          currentwidth = newwidth;
          currentheight = newheight;
        }

      });


    }

    /*this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height)
  //  this.canvasCtx.drawImage(this.bufferRef, 0, 0);
  const sourceX = 400;
  const sourceY = 200;
  const sourceWidth = 1200;
  const sourceHeight = 600;
this.canvasCtx.drawImage(this.bufferRef, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, this.canvasRef.width, this.canvasRef.height);
*/
    this.canvasCtx.clearRect(0, 0, currentwidth, currentheight);
    this.canvasRef.width = currentwidth;
    this.canvasRef.height = currentheight;
    this.canvasCtx.drawImage(this.bufferRef, 0, 0);
    // this.canvasCtx.drawImage(this.bufferRef, 0, 0, currentwidth, currentheight);
    this.wrapperRef.style.width = currentwidth + 'px';
    //this.wrapperRef.style.height = currentheight + 'px';
    //    let height = this.canvasRef.height;
    //    let width = this.canvasRef.width;

    //this.canvasctx.translate(this.canvasRef.width / 2 * -1, this.canvasRef.height / 2 * -1);
  }




  public render(): React.ReactElement<IImageManipulationProps> {
    return (
      <div className={styles.imageEditor} style={{
        marginTop: this.props.displyMode === DisplayMode.Edit ? '40px' : '0px',
      }} >
        {this.props.displyMode === DisplayMode.Edit && this.getCommandBar()}
        <div className={styles.imageplaceholder + ' ' + this.getMaxWidth()}
          ref={(element: HTMLDivElement) => { this.wrapperRef = element; }}
          style={this.canvasRef && { width: '' + this.canvasRef.width + 'px' }}
        >

          <canvas className={this.getMaxWidth()}
            style={{ display: 'none' }}
            ref={this.setBufferRef}></canvas>
          <canvas className={this.getMaxWidth()}
            style={{ display: 'none' }}
            ref={this.setManipulateRef}></canvas>
          <canvas className={this.getMaxWidth()} ref={this.setCanvasRef} ></canvas>
          {this.state.settingPanel === SettingPanelType.Crop && (this.getCropGrid())}
          {this.state.settingPanel === SettingPanelType.Resize && (this.getResizeGrid())}

        </div>
      </div>
    );
  }
  private getCropGrid(): JSX.Element {
    const lastset = this.getLastManipulation() as ICropSettings;
    let lastdata: ICrop = { sx: 0, sy: 0, width: 0, height: 0 };

    if (lastset && lastset.type === ManipulationType.Crop) {
      lastdata = lastset;
    }
    return (<ImageCrop
      crop={lastdata}
      showRuler
      sourceHeight={this.img.height}
      sourceWidth={this.img.width}
      onChange={(crop) => {
        this.setCrop(crop.sx, crop.sy, crop.width, crop.height, crop.aspect);
      }
      }
    />);
  }

  private getResizeGrid(): JSX.Element {
    const lastset = this.getLastManipulation() as IResizeSettings;
    if (lastset && lastset.type === ManipulationType.Resize) {
      return (<ImageGrid
        width={lastset.width} height={lastset.height}
        aspect={lastset.aspect}
        onChange={(size) => this.setResize(size.width, size.height, lastset.aspect)}
      />);
    }
    return (<ImageGrid
      onChange={(size) => this.setResize(size.width, size.height, undefined)}
      //aspect={this.getAspect()}
      width={this.canvasRef.width} height={this.canvasRef.height} />);
  }

  private getMaxWidth(): string {
    const { settingPanel } = this.state;
    if (settingPanel === SettingPanelType.Crop || settingPanel === SettingPanelType.Resize) {
      return '';
    }
    return styles.canvasmaxwidth;
  }

  private isFilterActive(type: FilterType): boolean {
    return (this.props.settings && this.props.settings.filter((f) => f.type === ManipulationType.Filter && (f as IFilterSettings).filterType === type).length > 0);
  }
  private closeFilter(): void {
    this.setState({
      settingPanel: SettingPanelType.Closed
    }, () => this.toggleEditMode(false));
  }
  private getPanelHeader(settingPanel: SettingPanelType): string {
    switch (settingPanel) {
      case SettingPanelType.Filter:
        return strings.ManipulationTypeFilter;
      case SettingPanelType.Flip:
        return strings.ManipulationTypeFlip;
      case SettingPanelType.Rotate:
        return strings.ManipulationTypeRotate;
      case SettingPanelType.Scale:
        return strings.ManipulationTypeScale;
      case SettingPanelType.Crop:
        return strings.ManipulationTypeCrop;
      case SettingPanelType.Resize:
        return strings.ManipulationTypeResize;
      case SettingPanelType.History:
        return strings.SettingPanelHistory;
    }
  }
  private onRenderFooterContent(): JSX.Element {
    return (
      <div> </div>
    );
  }
  private renderPanelContent(): JSX.Element {
    switch (this.state.settingPanel) {
      case SettingPanelType.Filter:
        return this.getFilterSettings();
      case SettingPanelType.Flip:
        return this.getFlipSettings();
      case SettingPanelType.Rotate:
        return this.getRotateSettings();
      case SettingPanelType.Scale:
        return this.getScaleSettings();
      case SettingPanelType.Crop:
        return this.getCropSettings();
      case SettingPanelType.Resize:
        return this.getResizeSettings();

      case SettingPanelType.History:
        return this.getHistorySettings();
    }
  }

  private openPanel(settingPanel: SettingPanelType): void {
    this.setState({
      settingPanel: settingPanel
    }, () => this.toggleEditMode(true));
  }

  private toggleEditMode(mode: boolean) {
    if (this.props.editMode) {
      this.props.editMode(mode);
    }
  }

  private getHistorySettings(): JSX.Element {
    return (<ItemOrder
      label={''}
      disabled={false}
      moveUpIconName={'ChevronUpSmall'}
      moveDownIconName={'ChevronDownSmall'}
      disableDragAndDrop={false}
      removeArrows={false}
      items={this.props.settings}
      valueChanged={(newhist) => {
        if (this.state.redosettings && this.state.redosettings.length > 0) {
          this.setState({ redosettings: [] }, () => {

            if (this.props.settingschanged) {
              this.props.settingschanged(newhist);
            }
          });
        } else {

          if (this.props.settingschanged) {
            this.props.settingschanged(newhist);
          }
        }


      }}
      onRenderItem={historyItem}
    />);
  }

  private getFilterSettings(): JSX.Element {
    return (<div>
      {
        Object.keys(filterTypeData).map((key, index) => {
          return (<Checkbox
            key={'Filter' + index}
            label={filterTypeData[key]}
            checked={this.isFilterActive((+key) as FilterType)}
            onChange={() => this.toggleFilter((+key) as FilterType)}
          />);
        })
      }</div>);

  }

  private toggleFilter(type: FilterType, nvalue: number = undefined, svalue: string = undefined): void {
    let tmpsettings = clone(this.props.settings);
    if (!tmpsettings) { tmpsettings = []; }
    if (tmpsettings.filter((f) => f.type === ManipulationType.Filter && (f as IFilterSettings).filterType === type).length > 0) {
      const removeindex = findIndex(tmpsettings, (f) => f.type === ManipulationType.Filter && (f as IFilterSettings).filterType === type);
      tmpsettings.splice(removeindex, 1);
    } else {
      tmpsettings.push({
        type: ManipulationType.Filter,
        filterType: type,
        nvalue: nvalue,
        svalue: svalue
      });
    }
    if (this.props.settingschanged) {
      this.props.settingschanged(tmpsettings);
    }
  }

  private getFlipSettings(): JSX.Element {
    return (<div className={styles.buttonHolderPanel}  >
      <IconButton
        iconProps={{ iconName: 'SwitcherStartEnd' }}
        onRenderIcon={() => { return (<img className={styles.svgbuttonPanel} src={flipVerticalIcon} />); }}
        title={strings.FlipHorizontal}
        ariaLabel={strings.FlipHorizontal}
        onClick={() => {

          let last = this.getLastManipulation();
          if (last && last.type === ManipulationType.Flip) {
            (last as IFlipSettings).flipX = !(last as IFlipSettings).flipX;
            if ((last as IFlipSettings).flipX === false &&
              (last as IFlipSettings).flipY === false) {
              this.removeLastManipulation();
            } else {
              this.addOrUpdateLastManipulation(last);
            }
          } else {
            this.addOrUpdateLastManipulation({ type: ManipulationType.Flip, flipX: true, flipY: false });
          }
        }}
      />
      <IconButton
        onRenderIcon={() => { return (<img className={styles.svgbuttonPanel} src={flipHorizontalIcon} />); }}
        title={strings.FlipVertical}
        ariaLabel={strings.FlipVertical}
        onClick={() => {
          let last = this.getLastManipulation();
          if (last && last.type === ManipulationType.Flip) {
            (last as IFlipSettings).flipY = !(last as IFlipSettings).flipY;
            if ((last as IFlipSettings).flipX === false &&
              (last as IFlipSettings).flipY === false) {
              this.removeLastManipulation();
            } else {
              this.addOrUpdateLastManipulation(last);
            }
          } else {
            this.addOrUpdateLastManipulation({ type: ManipulationType.Flip, flipX: false, flipY: true });
          }
        }}
      />

    </div>);
  }
  private getRotateSettings(): JSX.Element {
    const lastvalue = this.getLastManipulation();
    let rotatevalue = 0;
    if (lastvalue && lastvalue.type === ManipulationType.Rotate) {
      rotatevalue = (lastvalue as IRotateSettings).rotate ? (lastvalue as IRotateSettings).rotate : 0;
    }
    return (<div>
      <div>
        {this.props.configsettings.rotateButtons.map((value: number, index: number) => {
          let icon: string = 'CompassNW';
          if (value !== 0) { icon = 'Rotate'; }


          return (<DefaultButton
            key={'rotate' + index}
            onClick={() => {
              if (value === 0) {
                this.setRotate(value);
              } else {
                this.calcRotate(value);
              }
            }}
            className={styles.iconbtn}
          >
            <Icon iconName={icon} style={value < 0 ? { transform: 'scaleX(-1)' } : {}} className={styles.imgicon} />
            <span className={styles.imgtext} >{'' + value}</span></DefaultButton>);
        })}


      </div>
      <Slider
        label=''
        min={-180}
        max={180}

        value={rotatevalue}
        onChange={this.setRotate}
        showValue={true}
        componentRef={(component: ISlider | null) => {
          //Initial Value has a bug 0 is min value only min value is negative
          const correctBugComponent = component as any;
          if (correctBugComponent && correctBugComponent.state && correctBugComponent.value != correctBugComponent.props.value) {
            correctBugComponent.setState({ value: 0, renderedValue: 0 });
          }

        }}
      //originFromZero
      />
      <IconButton
        key={'resetrotate'}
        disabled={!(lastvalue && lastvalue.type === ManipulationType.Rotate)}
        iconProps={{ iconName: 'Undo' }}
        ariaLabel={strings.CommandBarReset}
        onClick={() => { this.removeLastManipulation(); }
        }
      />
    </div >);
  }

  private getCropSettings(): JSX.Element {
    let crop: ICropSettings = this.getCropValues();
    return (<div>
      <Checkbox
        label={strings.LockAspect}
        checked={!isNaN(crop.aspect)}
        onChange={() => {
          if (isNaN(crop.aspect)) {
            this.setCrop(undefined, undefined, undefined, undefined, this.getAspect());
          } else {
            this.setCrop(undefined, undefined, undefined, undefined, undefined);
          }

        }}

      />
      <TextField label={strings.SourceX} value={'' + crop.sx} onChanged={(x) => this.setCrop(parseInt(x), undefined, undefined, undefined, crop.aspect)} />
      <TextField label={strings.SourceY} value={'' + crop.sy} onChanged={(y) => this.setCrop(undefined, parseInt(y), undefined, undefined, crop.aspect)} />
      <TextField label={strings.Width} value={'' + crop.width} onChanged={(w) => this.setCrop(undefined, undefined, parseInt(w), undefined, crop.aspect)} />
      <TextField label={strings.Height} value={'' + crop.height} onChanged={(h) => this.setCrop(undefined, undefined, undefined, parseInt(h), crop.aspect)} />

    </div>);
  }

  private getResizeSettings(): JSX.Element {
    let resize: IResizeSettings = this.getResizeValues();
    return (<div>

      <Checkbox
        label={strings.LockAspect}
        checked={!isNaN(resize.aspect)}
        onChange={() => {
          if (isNaN(resize.aspect)) {
            this.setResize(undefined, undefined, this.getAspect());
          } else {
            this.setResize(undefined, undefined, undefined);
          }

        }}

      />
      <TextField label={strings.Width} value={'' + resize.width} onChanged={(w) => this.setResize(parseInt(w), undefined, resize.aspect)} />
      <TextField label={strings.Height} value={'' + resize.height} onChanged={(h) => this.setResize(undefined, parseInt(h), resize.aspect)} />

    </div>);
  }
  private getAspect(): number {
    return this.canvasRef.width / this.canvasRef.height;
  }

  private getScaleSettings(): JSX.Element {
    const lastvalue = this.getLastManipulation();
    let scalevalue = 1;
    if (lastvalue && lastvalue.type === ManipulationType.Scale) {
      scalevalue = (lastvalue as IScaleSettings).scale ? (lastvalue as IScaleSettings).scale : 1;
    }
    return (<div>

      <Slider
        label=''
        min={0.1}
        max={5}
        step={0.1}
        value={scalevalue}
        onChange={this.setScale}
        showValue={true}
      />
      <IconButton
        key={'resetscale'}
        disabled={!(lastvalue && lastvalue.type === ManipulationType.Scale)}
        iconProps={{ iconName: 'Undo' }}
        title={strings.CommandBarReset}
        ariaLabel={strings.CommandBarReset}
        onClick={() => { this.setScale(1); }
        }
      />
    </div>);
  }

  private getResizeValues(): IResizeSettings {
    let state: IImageManipulationSettings = this.getLastManipulation();
    let values: IResizeSettings = {
      type: ManipulationType.Resize,
      height: this.bufferRef.height,
      width: this.bufferRef.width
    };
    if (state && state.type === ManipulationType.Resize) {
      values = state as IResizeSettings;
    }
    return values;
  }

  private setResize(width: number, height: number, aspect: number): void {
    let values: IResizeSettings = this.getResizeValues();
    if (width) {
      values.width = width;
      if (aspect) {
        values.height = values.width / aspect;
      }
    }
    if (height) {
      values.height = height;
      if (aspect) {
        values.width = values.height * aspect;
      }
    }
    values.aspect = aspect;
    this.addOrUpdateLastManipulation(values);
  }

  private getCropValues(): ICropSettings {
    let state: IImageManipulationSettings = this.getLastManipulation();
    let values: ICropSettings = {
      type: ManipulationType.Crop,
      sx: 0,
      sy: 0,
      height: this.bufferRef.height,
      width: this.bufferRef.width
    };
    if (state && state.type === ManipulationType.Crop) {
      values = state as ICropSettings;
    }
    return values;
  }

  private setCrop(sx: number, sy: number, width: number, height: number, aspect: number): void {
    let values = this.getCropValues();
    const currentheight: number = this.bufferRef.height;
    const currentwidth: number = this.bufferRef.width;
    if (!isNaN(sx) && sx >= 0) {
      if (sx >= currentwidth) {
        values.sx = currentwidth - 1;
      } else {
        values.sx = sx;
      }

      // limit max width
      if ((values.width + values.sx) > currentwidth) {
        values.width = currentwidth - values.sx;
      }

    }
    if (!isNaN(sy) && sy >= 0) {
      if (sy >= currentheight) {
        values.sy = currentheight - 1;
      } else {
        values.sy = sy;
      }

      // limit max height
      if ((values.height + values.sy) > currentheight) {
        values.height = currentheight - values.sy;
      }
    }
    if (!isNaN(width) && width >= 0) {
      if ((width + values.sx) > currentwidth) {
        values.width = currentwidth - values.sx;
      } else {
        values.width = width;
      }
    }
    if (!isNaN(height) && height >= 0) {
      if ((height + values.sy) > currentheight) {
        values.height = currentheight - values.sy;
      } else {
        values.height = height;
      }
    }
    if (isNaN(values.aspect) && !isNaN(aspect)) {
      //aspect added

      //limit w
      if ((values.width + values.sx) > currentwidth) {
        values.width = currentwidth - values.sx;
      }

      values.height = values.width / aspect;
      //limit h adn recalulate w
      if ((values.height + values.sy) > currentheight) {
        values.height = currentheight - values.sy;
        values.width = values.height * aspect;
      }


    }
    values.aspect = aspect;
    if (aspect && (!isNaN(sx) || !isNaN(width))) {
      values.height = values.width / aspect;
    }
    if (aspect && (!isNaN(sy) || !isNaN(height))) {
      values.width = values.height * aspect;
    }
    this.addOrUpdateLastManipulation(values);
  }

  private setRotate(value: number): void {
    this.addOrUpdateLastManipulation({
      type: ManipulationType.Rotate,
      rotate: value
    });

  }
  private setScale(value: number): void {
    this.addOrUpdateLastManipulation({
      type: ManipulationType.Scale,
      scale: value
    });
  }
  private calcRotate(value: number): void {
    const lastVal = this.getLastManipulation();
    let cvalue = 0;
    if (lastVal && lastVal.type === ManipulationType.Rotate) {
      cvalue = (lastVal as IRotateSettings).rotate;
    }
    cvalue = cvalue + value;
    if (cvalue < -180) { cvalue = -180; }
    if (cvalue > 180) { cvalue = 180; }
    this.addOrUpdateLastManipulation({
      type: ManipulationType.Rotate,
      rotate: cvalue
    });
  }

  private setCanvasRef(element: HTMLCanvasElement): void {
    this.canvasRef = element;
    if (this.canvasRef) {
      this.canvasCtx = element.getContext('2d');
    } else {
      console.log('no canvas context ');
    }
  }
  private setBufferRef(element: HTMLCanvasElement): void {
    this.bufferRef = element;
    if (this.bufferRef) {
      this.bufferCtx = element.getContext('2d');
    } else {
      console.log('no buffer context ');
    }

  }

  private setManipulateRef(element: HTMLCanvasElement): void {
    this.manipulateRef = element;
    if (this.manipulateRef) {
      this.manipulateCtx = element.getContext('2d');
    } else {
      console.log('no manipulation context ');
    }
  }

  private getLastManipulation(): IImageManipulationSettings {
    if (this.props.settings && this.props.settings.length > 0) {
      return this.props.settings[this.props.settings.length - 1];
    }
    return undefined;
  }
  private addOrUpdateLastManipulation(changed: IImageManipulationSettings): void {
    let state = clone(this.props.settings);
    if (!state) {
      state = [];
    }

    if (state.length > 0 && state[state.length - 1].type === changed.type) {
      state[state.length - 1] = changed;

    } else {
      state.push(changed);

    }
    if (this.state.redosettings && this.state.redosettings.length > 0) {
      this.setState({ redosettings: [] }, () => {
        if (this.props.settingschanged) {
          this.props.settingschanged(state);
        }
      });
    } else {
      if (this.props.settingschanged) {
        this.props.settingschanged(state);
      }
    }
  }

  private removeLastManipulation(): void {
    if (this.props.settings && this.props.settings.length > 0) {
      let state = clone(this.props.settings);
      state.splice(state.length - 1, 1);
      if (this.props.settingschanged) {
        this.props.settingschanged(clone(state));
      }
    }
  }

  private getActionHeaderButton(options: IManipulationTypeDataDetails): JSX.Element {
    return (<IconButton
      iconProps={{ iconName: options.iconName }}
      onRenderIcon={(p, defaultrenderer) => {
        if (options.svgIcon) {
          return (<img className={styles.svgbutton} src={options.svgIcon} />);
        }
        return defaultrenderer(p);
      }}
      title={options.text}
      ariaLabel={options.text}
      onClick={() => this.openPanel(options.settingPanelType)}
    />);
  }

  private getCommandBar(): JSX.Element {
    return (<div className={styles.commandBar}>
      {this.getActionHeaderButton(manipulationTypeData[ManipulationType.Resize])}
      {this.getActionHeaderButton(manipulationTypeData[ManipulationType.Crop])}
      {this.getActionHeaderButton(manipulationTypeData[ManipulationType.Flip])}
      {this.getActionHeaderButton(manipulationTypeData[ManipulationType.Rotate])}
      {this.getActionHeaderButton(manipulationTypeData[ManipulationType.Scale])}
      {this.getActionHeaderButton(manipulationTypeData[ManipulationType.Filter])}

      <IconButton
        iconProps={{ iconName: 'Undo' }}
        title={strings.CommandBarUndo}
        ariaLabel={strings.CommandBarUndo}
        disabled={!this.props.settings || this.props.settings.length < 1}
        onClick={() => {
          const settings = clone(this.props.settings);
          const last = settings.pop();
          const redo = clone(this.state.redosettings);
          redo.push(last);
          this.setState({ redosettings: redo },
            () => {
              if (this.props.settingschanged) {
                this.props.settingschanged(settings);
              }
            });

        }}
      />
      <IconButton
        iconProps={{ iconName: 'Redo' }}
        title={strings.CommandBarRedo}
        ariaLabel={strings.CommandBarRedo}
        disabled={!this.state.redosettings || this.state.redosettings.length < 1}
        onClick={() => {
          const redosettings = clone(this.state.redosettings);
          const redo = redosettings.pop();
          const settings = clone(this.props.settings);
          settings.push(redo);
          this.setState({ redosettings: redosettings },
            () => {
              if (this.props.settingschanged) {
                this.props.settingschanged(settings);
              }
            });

        }}
      />
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        title={strings.CommandBarReset}
        ariaLabel={strings.CommandBarReset}
        disabled={!this.props.settings || this.props.settings.length < 1}
        onClick={() => {
          this.setState({ redosettings: [] },
            () => {
              if (this.props.settingschanged) {
                this.props.settingschanged([]);
              }
            });

        }}
      />
      <IconButton
        iconProps={{ iconName: 'History' }}
        title={strings.SettingPanelHistory}
        ariaLabel={strings.SettingPanelHistory}
        disabled={!this.props.settings || this.props.settings.length < 1}
        onClick={() => this.openPanel(SettingPanelType.History)}
      />
      <Panel
        isOpen={this.state.settingPanel != SettingPanelType.Closed}
        type={PanelType.smallFixedFar}
        onDismiss={this.closeFilter}
        headerText={this.getPanelHeader(this.state.settingPanel)}
        closeButtonAriaLabel={strings.SettingPanelClose}
        isBlocking={false}
        onRenderFooterContent={this.onRenderFooterContent}
      >
        {this.renderPanelContent()}
      </Panel>
    </div>);
  }
}
