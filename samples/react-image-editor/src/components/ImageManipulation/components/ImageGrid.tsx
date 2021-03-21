import * as React from 'react';
import { IResize } from '../ImageManipulation.types';

import { nodePoition } from './Enums';
import styles from './ImageGrid.module.scss';
import { IMousePosition } from './Interfaces';

export interface IImageGridProps {
  width: number;
  height: number;
  aspect?: number;
  onChange: (size: IResize) => void;
  onComplete?: (size: IResize) => void;
  // tslint:disable-next-line: no-any
  onDragEnd?: (e: MouseEvent | any) => void;
  // tslint:disable-next-line: no-any
  onDragStart?: (e: MouseEvent | any) => void;
}

export interface IImageGridState { }

export interface IResizeData {
  pos: nodePoition;
  width: number;
  height: number;
  xInverse: boolean;
  yInverse: boolean;
  clientStartX: number;
  clientStartY: number;
}

export default class ImageGrid extends React.Component<IImageGridProps, IImageGridState> {

  private evData: IResizeData = undefined;
  private dragStarted: boolean = false;
  constructor(props: IImageGridProps) {
    super(props);

    this.state = {};

    this.onStartResizing = this.onStartResizing.bind(this);
    this.onDocMouseTouchMove = this.onDocMouseTouchMove.bind(this);
    this.onDocMouseTouchEnd = this.onDocMouseTouchEnd.bind(this);
  }

  public componentDidMount(): void {
    window.document.addEventListener('mousemove', this.onDocMouseTouchMove);
    window.document.addEventListener('touchmove', this.onDocMouseTouchMove);
    window.document.addEventListener('mouseup', this.onDocMouseTouchEnd);
    window.document.addEventListener('touchend', this.onDocMouseTouchEnd);
    window.document.addEventListener('touchcancel', this.onDocMouseTouchEnd);

  }
  public componentWillUnmount(): void {
    window.document.removeEventListener('mousemove', this.onDocMouseTouchMove);
    window.document.removeEventListener('touchmove', this.onDocMouseTouchMove);
    window.document.removeEventListener('mouseup', this.onDocMouseTouchEnd);
    window.document.removeEventListener('touchend', this.onDocMouseTouchEnd);
    window.document.removeEventListener('touchcancel', this.onDocMouseTouchEnd);
  }

  public render(): React.ReactElement<IImageGridProps> {
    // tslint:disable:react-a11y-event-has-role
    return (
      <div className={styles.ImgGridShadowOverlay}>
        <div className={styles.ImgGridVisible}
          style={
            {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            }
          }>
          <div className={styles.ImgGridTabel}>

            <div className={styles.ImgGridRow}>
              <div className={styles.ImgLeftTop + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble}
                  onMouseDown={this.onStartResizing}
                  onTouchStart={this.onStartResizing}
                  data-ord={nodePoition.NW} />
              </div>
              <div className={styles.ImgCenterTop + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.N} onMouseDown={this.onStartResizing} />
              </div>
              <div className={styles.ImgRightTop + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.NE} onMouseDown={this.onStartResizing} />
              </div>
            </div>
            <div className={styles.ImgGridRow}>
              <div className={styles.ImgLeftCenter + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.W} onMouseDown={this.onStartResizing} />
              </div>
              <div className={styles.ImgGridCell}></div>
              <div className={styles.ImgRightCenter + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.E} onMouseDown={this.onStartResizing} />
              </div>
            </div>
            <div className={styles.ImgGridRow}>
              <div className={styles.ImgLeftBottom + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.SW} onMouseDown={this.onStartResizing} />
              </div>
              <div className={styles.ImgCenterBottom + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.S} onMouseDown={this.onStartResizing} />
              </div>
              <div className={styles.ImgRightBottom + ' ' + styles.ImgGridCell}>
                <div className={styles.bubble} data-ord={nodePoition.SE} onMouseDown={this.onStartResizing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // tslint:enable
  }

  // tslint:disable-next-line: no-any
  private onStartResizing(e: MouseEvent | any): void {
    const mousePos: IMousePosition = this.getClientPos(e);
    let xInversed: boolean = false;
    let yInversed: boolean = false;
    const { ord } = e.target.dataset;
    let pos: nodePoition = undefined;
    if (ord && !isNaN(+ord)) {
      pos = +ord;
      xInversed = pos === nodePoition.NW || pos === nodePoition.W || pos === nodePoition.SW;
      yInversed = pos === nodePoition.NW || pos === nodePoition.N || pos === nodePoition.NE;
    } else {
      return;
    }
    this.dragStarted = true;
    if (this.props.onDragStart) {
      this.props.onDragStart(e);
    }
    this.evData = {
      clientStartX: mousePos.x,
      clientStartY: mousePos.y,
      xInverse: xInversed,
      yInverse: yInversed,
      pos: pos,
      width: this.props.width,
      height: this.props.height

    };
  }

  // tslint:disable-next-line: no-any
  private onDocMouseTouchMove(e: React.MouseEvent<HTMLDivElement> | any): void {
    const { aspect, onChange } = this.props;
    if (!this.dragStarted) {
      return;
    }
    if (!this.evData) {
      return;
    }
    e.preventDefault();

    const mousePos: IMousePosition = this.getClientPos(e);

    let xDiff: number = 0;
    let yDiff: number = 0;

    if (this.evData.pos === nodePoition.E
      || this.evData.pos === nodePoition.SE
      || this.evData.pos === nodePoition.NE) {
      xDiff = mousePos.x - this.evData.clientStartX;
    } else if (this.evData.pos === nodePoition.W
      || this.evData.pos === nodePoition.SW
      || this.evData.pos === nodePoition.NW) {
      xDiff = this.evData.clientStartX - mousePos.x;
    }

    if (this.evData.pos === nodePoition.N || this.evData.pos === nodePoition.NW || this.evData.pos === nodePoition.NE) {
      yDiff = this.evData.clientStartY - mousePos.y;
    } else if (this.evData.pos === nodePoition.S
      || this.evData.pos === nodePoition.SW
      || this.evData.pos === nodePoition.SE) {
      yDiff = mousePos.y - this.evData.clientStartY;
    }

    const nextsize: IResize = {
      width: this.evData.width + xDiff,
      height: this.evData.height + yDiff
    };
    if (aspect) {
      if (this.evData.pos !== nodePoition.N && this.evData.pos !== nodePoition.S) {
        nextsize.height = nextsize.width / aspect;
      } else {
        nextsize.width = nextsize.height * aspect;
      }
    }
    if (onChange) {
      onChange(nextsize);
    }
  }

  // tslint:disable-next-line: no-any
  private onDocMouseTouchEnd(e: MouseEvent | any): void {
    const { width, height, onDragEnd, onComplete } = this.props;
    if (this.dragStarted) {
      this.dragStarted = false;
      if (onDragEnd) {
        onDragEnd(e);
      }
      this.evData = undefined;
      if (onComplete) {
        onComplete({ width: width, height: height });
        this.setState({ cropIsActive: false, newCropIsBeingDrawn: false });
      }
    }
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
}
