import * as React from 'react';
import { ICrop } from '../ImageManipulation.types';

import { nodePoition } from './Enums';
import styles from './ImageCrop.module.scss';
import { ICropData, IMousePosition } from './Interfaces';

function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export interface IImageCropProps {
  crop: ICrop;

  sourceHeight: number;
  sourceWidth: number;
  showRuler?: boolean;
  onDragStart?: (e: MouseEvent) => void;
  onComplete?: (crop: ICrop) => void;
  onChange?: (crop: ICrop) => void;
  // tslint:disable-next-line: no-any
  onDragEnd?: (e: any) => void;
}

export interface IImageCropState {
  cropIsActive: boolean;
  newCropIsBeingDrawn: boolean;
  reloadtimestamp: string;
}

// Feature detection
// tslint:disable-next-line: max-line-length
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners

export default class ImageCrop extends
  React.Component<IImageCropProps, IImageCropState> {

  private controlRef: HTMLDivElement = undefined;

  private dragStarted: boolean = false;
  private mouseDownOnCrop: boolean = false;
  private evData: ICropData;

  constructor(props: IImageCropProps) {
    super(props);
    this.state = {
      cropIsActive: false,
      newCropIsBeingDrawn: false,
      reloadtimestamp: ''
    };
    this.onDocMouseTouchMove = this.onDocMouseTouchMove.bind(this);
    this.onDocMouseTouchEnd = this.onDocMouseTouchEnd.bind(this);
    this.onCropMouseTouchDown = this.onCropMouseTouchDown.bind(this);
    this.setControlRef = this.setControlRef.bind(this);
    this.onMouseTouchDown = this.onMouseTouchDown.bind(this);
  }

  public componentDidMount(): void {
    const { crop } = this.props;
    if (crop && this.isValid(crop) &&
      (crop.sx !== 0 || crop.sy !== 0 || crop.width !== 0 && crop.height !== 0)
    ) {
      this.setState({ cropIsActive: true });
    } else {
      // Requireed because first renderer has no ref
      this.setState({ reloadtimestamp: new Date().getTime().toString() });

    }

  }

  public render(): React.ReactElement<IImageCropProps> {
    const { crop } = this.props;
    const cropSelection: JSX.Element = this.isValid(crop) && this.controlRef ? this.createSelectionGrid() : undefined;

     // tslint:disable:react-a11y-event-has-role
    return (
      <div ref={this.setControlRef}
        className={styles.ImgGridShadowOverlay}
        onMouseMove={this.onDocMouseTouchMove}
        onTouchMove={this.onDocMouseTouchMove}
        onMouseUp={this.onDocMouseTouchEnd}
        onTouchCancel={this.onDocMouseTouchEnd}
        onTouchEnd={this.onDocMouseTouchEnd}
        onMouseDown={this.onMouseTouchDown}
        onTouchStart={this.onMouseTouchDown}
      >
        <div className={styles.ImgGridVisible}
          style={
            {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }
          }>
          {cropSelection}
        </div>
      </div>
    );
    // tslint:
  }

  private createSelectionGrid(): JSX.Element {
    const { showRuler } = this.props;
    const style: { top: string, left: string, width: string, height: string } = this.getCropStyle();

    // tslint:disable:react-a11y-event-has-role
    return (
      <div
        style={style}
        className={styles.CropContrainer}
        onMouseDown={this.onCropMouseTouchDown}
        onTouchStart={this.onCropMouseTouchDown}
      >

        <div className={styles.dragBar_n} data-ord={nodePoition.N} />
        <div className={styles.dragBar_e} data-ord={nodePoition.E} />
        <div className={styles.dragBar_s} data-ord={nodePoition.S} />
        <div className={styles.dragBar_w} data-ord={nodePoition.W} />

        <div className={[styles.dragHandle, styles.nw].join(' ')} data-ord={nodePoition.NW} />
        <div className={[styles.dragHandle, styles.n].join(' ')} data-ord={nodePoition.N} />
        <div className={[styles.dragHandle, styles.ne].join(' ')} data-ord={nodePoition.NE} />
        <div className={[styles.dragHandle, styles.e].join(' ')} data-ord={nodePoition.E} />
        <div className={[styles.dragHandle, styles.se].join(' ')} data-ord={nodePoition.SE} />
        <div className={[styles.dragHandle, styles.s].join(' ')} data-ord={nodePoition.S} />
        <div className={[styles.dragHandle, styles.sw].join(' ')} data-ord={nodePoition.SW} />
        <div className={[styles.dragHandle, styles.w].join(' ')} data-ord={nodePoition.W} />

        {showRuler && (
          <div>
            <div className={styles.ruleOfThirdsHZ} />
            <div className={styles.ruleOfThirdsVT} />
          </div>
        )}
      </div>
    );
    // tslint:enable
  }

  private makeNewCrop(): ICrop {
    const crop: ICrop = { ...{ sx: 0, sy: 0, height: 0, width: 0 }, ...this.props.crop };
    return crop;
  }

  private getCropStyle(): { top: string, left: string, width: string, height: string } {
    const crop: ICrop = this.makeNewCrop();
    const unit: string = 'px';
    return {
      top: `${crop.sy}${unit}`,
      left: `${crop.sx}${unit}`,
      width: `${crop.width}${unit}`,
      height: `${crop.height}${unit}`
    };
  }

  // tslint:disable-next-line: no-any
  private onDocMouseTouchMove(e: React.MouseEvent<HTMLDivElement> | any): void {
    const { crop, onChange, onDragStart } = this.props;
    if (!this.mouseDownOnCrop) {
      return;
    }

    e.preventDefault();
    if (!this.dragStarted) {
      this.dragStarted = true;
      if (onDragStart) {
        // tslint:disable-next-line: no-any
        onDragStart(e as any);
      }
    }

    const clientPos: IMousePosition = this.getClientPos(e);
    /*
            if (this.evData.isResize && this.props.aspect && this.evData.cropOffset) {
              clientPos.y = this.straightenYPath(clientPos.x);
            }
            */

    this.evData.xDiff = clientPos.x - this.evData.clientStartX;
    this.evData.yDiff = clientPos.y - this.evData.clientStartY;

    let nextCrop: ICrop;

    if (this.evData.isResize) {
      nextCrop = this.resizeCrop();
    } else {
      nextCrop = this.dragCrop();
    }

    if (nextCrop !== crop) {
      if (onChange) {
        onChange(nextCrop);
      }

    }

  }

  private dragCrop(): ICrop {

    const { evData } = this;
    const nextCrop: ICrop = this.makeNewCrop();
    const width: number = this.controlRef.clientWidth;
    const height: number = this.controlRef.clientHeight;
    nextCrop.sx = clamp(evData.cropStartX + evData.xDiff, 0, width - nextCrop.width);
    nextCrop.sy = clamp(evData.cropStartY + evData.yDiff, 0, height - nextCrop.height);

    return nextCrop;
  }

  private resizeCrop(): ICrop {
    const { evData } = this;
    const nextCrop: ICrop = this.makeNewCrop();
    const { pos } = evData;

    if (evData.xInversed) {
      evData.xDiff -= evData.cropStartWidth * 2;

    }
    if (evData.yInversed) {
      evData.yDiff -= evData.cropStartHeight * 2;

    }
    const newSize: { width: number, height: number } = this.getNewSize();

    let newX: number = evData.cropStartX;
    let newY: number = evData.cropStartY;

    if (evData.xInversed) {
      newX = nextCrop.sx + (nextCrop.width - newSize.width);
    }

    if (evData.yInversed) {
      newY = nextCrop.sy + (nextCrop.height - newSize.height);
    }

    const containedCrop: ICrop = {
      sx: newX,
      sy: newY,
      width: newSize.width,
      height: newSize.height,
      aspect: this.props.crop.aspect
    };

    if (this.props.crop.aspect
      || (pos === nodePoition.NW
        || pos === nodePoition.SE
        || pos === nodePoition.SW
        || pos === nodePoition.NE)) {
      nextCrop.sx = containedCrop.sx;
      nextCrop.sy = containedCrop.sy;
      nextCrop.width = containedCrop.width;
      nextCrop.height = containedCrop.height;
    } else if (pos === nodePoition.E || pos === nodePoition.W) {
      nextCrop.sx = containedCrop.sx;
      nextCrop.width = containedCrop.width;
    } else if (pos === nodePoition.N || pos === nodePoition.S) {
      nextCrop.sy = containedCrop.sy;
      nextCrop.height = containedCrop.height;
    }
    return nextCrop;
  }

  private getNewSize(): { width: number, height: number } {
    const { crop, sourceWidth, sourceHeight } = this.props;
    const { evData } = this;

    let newWidth: number = evData.cropStartWidth + evData.xDiff;

    if (evData.xInversed) {
      newWidth = Math.abs(newWidth);
    }

    newWidth = clamp(newWidth, 0, sourceWidth);

    // New height.
    let newHeight: number;

    if (crop.aspect) {
      newHeight = newWidth / crop.aspect;
    } else {
      newHeight = evData.cropStartHeight + evData.yDiff;
    }

    if (evData.yInversed) {
      // Cap if polarity is inversed and the height fills the y space.
      newHeight = Math.min(Math.abs(newHeight), evData.cropStartY);
    }

    newHeight = clamp(newHeight, 0, sourceHeight);

    if (crop.aspect) {
      newWidth = clamp(newHeight * crop.aspect, 0, sourceWidth);
    }

    return {
      width: newWidth,
      height: newHeight
    };
  }

  // tslint:disable-next-line: no-any
  private onDocMouseTouchEnd(e: MouseEvent | any): void {
    const { crop, onDragEnd, onComplete } = this.props;

    if (this.mouseDownOnCrop) {
      this.mouseDownOnCrop = false;
      this.dragStarted = false;
      if (onDragEnd) {
        onDragEnd(e);
      }
      if (onComplete) {
        onComplete(crop);
      }
      this.setState({ cropIsActive: false, newCropIsBeingDrawn: false });

    }
  }

  // tslint:disable-next-line: no-any
  private onCropMouseTouchDown(e: MouseEvent | any): void {
    const { crop } = this.props;

    e.preventDefault(); // Stop drag selection.
    const mousepos: IMousePosition = this.getClientPos(e);
    const { ord } = e.target.dataset;

    let xInversed: boolean = false;
    let yInversed: boolean = false;
    let pos: nodePoition = undefined;
    if (ord && !isNaN(+ord)) {
      pos = +ord;
      xInversed = pos === nodePoition.NW || pos === nodePoition.W || pos === nodePoition.SW;
      yInversed = pos === nodePoition.NW || pos === nodePoition.N || pos === nodePoition.NE;
    }

    this.evData = {
      clientStartX: mousepos.x,
      clientStartY: mousepos.y,
      cropStartWidth: crop.width,
      cropStartHeight: crop.height,
      cropStartX: xInversed ? crop.sx + crop.width : crop.sx,
      cropStartY: yInversed ? crop.sy + crop.height : crop.sy,
      xInversed: xInversed,
      yInversed: yInversed,
      isResize: (ord && !isNaN(ord)),
      pos: pos,
      xDiff: 0,
      yDiff: 0
    };

    this.mouseDownOnCrop = true;
    this.setState({ cropIsActive: true });
  }

  private setControlRef(element: HTMLDivElement): void {
    this.controlRef = element;
  }

  // tslint:disable-next-line: no-any
  private getClientPos(e: MouseEvent | any): IMousePosition {
    let pageX: number;
    let pageY: number;

    if (e.touches) {
      [{ pageX, pageY }] = e.touches;
    } else {
      ({ pageX, pageY } = e);
    }

    return {
      x: pageX,
      y: pageY
    };
  }

  private isValid(crop: ICrop): boolean {
    return crop && !isNaN(crop.width) && !isNaN(crop.height);
  }

  // tslint:disable-next-line: no-any
  private onMouseTouchDown(e: MouseEvent | any): void {
    const { crop, onChange } = this.props;
    e.preventDefault(); // Stop drag selection.
    const mousepos: IMousePosition = this.getClientPos(e);

    // tslint:disable-next-line: no-any
    const refpos: any = this.controlRef.getBoundingClientRect();
    const startx: number = mousepos.x - refpos.left;
    const starty: number = mousepos.y - refpos.top;
    // is mousePos in current pos
    if (crop) {
      if (crop.sx - 5 <= startx && crop.sx + crop.width + 5 >= startx &&
        crop.sy - 5 <= starty && crop.sy + crop.height + 5 >= starty
      ) {
        // Position in current crop do Nothing
        return;
      }
    }

    const nextCrop: ICrop = {
      sx: startx,
      sy: starty,
      width: 0,
      height: 0,
      aspect: crop.aspect
    };

    this.evData = {
      clientStartX: mousepos.x,
      clientStartY: mousepos.y,
      cropStartWidth: nextCrop.width,
      cropStartHeight: nextCrop.height,
      cropStartX: nextCrop.sx,
      cropStartY: nextCrop.sy,
      xInversed: false,
      yInversed: false,
      isResize: true,
      xDiff: 0,
      yDiff: 0,
      pos: nodePoition.NW
    };

    this.mouseDownOnCrop = true;

    onChange(nextCrop);

    this.setState({ cropIsActive: true, newCropIsBeingDrawn: true });
  }
}
