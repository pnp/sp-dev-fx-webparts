import * as riot from "riot/riot+compiler";
import * as Riot from "./../../core/riot/Riot";

@Riot.template(require("./Spinner.html") as string)
export class Spinner extends Riot.Element {
  private eightSize: number = 0.2;
  private animationSpeed: number = 90;
  private interval: number;
  private spinner: HTMLElement;
  private numCircles: number;
  private offsetSize: number;
  private parentSize: number = 20;
  private fadeIncrement: number = 0;
  private circleObjects: Array<CircleObject> = [];

  protected getSubComponentTypes(): any[] {
    return [];
  }

  protected mounted() {
    this.init();
  }

  public start(): void {
    this.stop();
    this.interval = setInterval(() => {
      let i = this.circleObjects.length;
      while (i--) {
        this._fade(this.circleObjects[i]);
      }
    }, this.animationSpeed);
  }

  public stop(): void {
    clearInterval(this.interval);
  }

  private init(): void {
    this._setTargetElement();
    this._setPropertiesForSize();
    this._createCirclesAndArrange();
    this._initializeOpacities();
    this.start();
  }

  private _setPropertiesForSize(): void {
    if (this.spinner.className.indexOf("large") > -1) {
      this.parentSize = 28;
      this.eightSize = 0.179;
    }

    this.offsetSize = this.eightSize;
    this.numCircles = 8;
  }

  private _setTargetElement(): void {
    this.spinner = this.root.getElementsByClassName(this.opts.styles['ms-Spinner'])[0] as HTMLElement;
  }

  private _initializeOpacities(): void {
    let i = 0;
    let j = 1;
    let opacity;
    this.fadeIncrement = 1 / this.numCircles;

    for (i; i < this.numCircles; i++) {
      let circleObject = this.circleObjects[i];
      opacity = (this.fadeIncrement * j++);
      this._setOpacity(circleObject.element, opacity);
    }
  }

  private _fade(circleObject: CircleObject): void {
    let opacity = this._getOpacity(circleObject.element) - this.fadeIncrement;

    if (opacity <= 0) {
      opacity = 1;
    }

    this._setOpacity(circleObject.element, opacity);
  }

  private _getOpacity(element: HTMLElement): number {
    return parseFloat(window.getComputedStyle(element).getPropertyValue("opacity"));
  }

  private _setOpacity(element: HTMLElement, opacity: number): void {
    element.style.opacity = opacity.toString();
  }

  private _createCircle(): HTMLElement {
    let circle = document.createElement("div");
    circle.className = this.opts.styles['ms-Spinner-circle'];
    circle.style.width = circle.style.height = this.parentSize * this.offsetSize + "px";
    return circle;
  }

  private _createCirclesAndArrange(): void {
    let angle = 0;
    let offset = this.parentSize * this.offsetSize;
    let step = (2 * Math.PI) / this.numCircles;
    let i = this.numCircles;
    let circleObject;
    let radius = (this.parentSize - offset) * 0.5;

    while (i--) {
      let circle = this._createCircle();
      let x = Math.round(this.parentSize * 0.5 + radius * Math.cos(angle) - circle.clientWidth * 0.5) - offset * 0.5;
      let y = Math.round(this.parentSize * 0.5 + radius * Math.sin(angle) - circle.clientHeight * 0.5) - offset * 0.5;
      this.spinner.appendChild(circle);
      circle.style.left = x + "px";
      circle.style.top = y + "px";
      angle += step;
      circleObject = new CircleObject(circle, i);
      this.circleObjects.push(circleObject);
    }
  }
}

class CircleObject {
  public element: HTMLElement;
  public j: number;

  constructor(element, j) {
    this.element = element;
    this.j = j;
  }
}