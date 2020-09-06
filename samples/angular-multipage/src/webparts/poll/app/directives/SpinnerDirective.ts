import * as angular from 'angular';

export enum SpinnerSize {
  'small',
  'large'
}

export class SpinnerDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-Spinner"></div>';
  public controller: any = SpinnerController;
  public scope: any = {
    'ngShow': '=',
    'uifSize': '@'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new SpinnerDirective();
    return directive;
  }

  public link(
    scope: ISpinnerScope,
    instanceElement: angular.IAugmentedJQuery,
    attrs: ISpinnerAttributes,
    controller: SpinnerController,
    $transclude: angular.ITranscludeFunction): void {

    if (angular.isDefined(attrs.uifSize)) {
      if (angular.isUndefined(SpinnerSize[attrs.uifSize])) {

        controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.spinner - Unsupported size: ' +
          'Spinner size (\'' + attrs.uifSize + '\') is not supported by the Office UI Fabric.');
      }

      if (SpinnerSize[attrs.uifSize] === SpinnerSize.large) {
        instanceElement.addClass('ms-Spinner--large');
      }
    }

    if (attrs.ngShow != null) {
      scope.$watch('ngShow', (newVisible: boolean, oldVisible: boolean, spinnerScope: ISpinnerScope): void => {
        if (newVisible) {
          spinnerScope.start();
        } else {
          spinnerScope.stop();
        }
      });
    } else {
      scope.start();
    }

    $transclude((clone: angular.IAugmentedJQuery) => {
      if (clone.length > 0) {
        const wrapper: angular.IAugmentedJQuery = angular.element('<div></div>');
        wrapper.addClass('ms-Spinner-label').append(clone);
        instanceElement.append(wrapper);
      }
    });

    scope.init();
  }
}

export interface ISpinnerScope extends angular.IScope {
  start: () => void;
  stop: () => void;
  init: () => void;
  ngShow: boolean;
  uifSize: string;
}

export class SpinnerController {

  public static $inject: string[] = ['$scope', '$element', '$interval', '$log'];

  private _offsetSize: number = 0.179;
  private _numCircles: number = 8;
  private _animationSpeed: number = 90;
  private _circles: CircleObject[] = [];
  private _fadeIncrement: number;
  private _animationInterval: angular.IPromise<any>;
  private _parentSize: number;

  constructor(
    public $scope: ISpinnerScope,
    private $element: angular.IAugmentedJQuery,
    private $interval: angular.IIntervalService,
    public $log: angular.ILogService) {

    $scope.init = (): void => {
      this._parentSize = SpinnerSize[this.$scope.uifSize] === SpinnerSize.large ? 28 : 20;
      this.createCirclesAndArrange();
      this.setInitialOpacity();
    };

    $scope.start = (): void => {
      this._animationInterval = $interval(
        () => {
          let i: number = this._circles.length;
          while (i--) {
            this.fadeCircle(this._circles[i]);
          }
        },
        this._animationSpeed);
    };

    $scope.stop = (): void => {
      $interval.cancel(this._animationInterval);
    };
  }

  private createCirclesAndArrange(): void {

    let angle: number = 0;
    const offset: number = this._parentSize * this._offsetSize;
    const step: number = (2 * Math.PI) / this._numCircles;
    let i: number = this._numCircles;
    const radius: number = (this._parentSize - offset) * 0.5;

    while (i--) {
      const circle: angular.IAugmentedJQuery = this.createCircle();

      const x: number = Math.round(this._parentSize * 0.5 + radius * Math.cos(angle) - circle[0].clientWidth * 0.5) - offset * 0.5;
      const y: number = Math.round(this._parentSize * 0.5 + radius * Math.sin(angle) - circle[0].clientHeight * 0.5) - offset * 0.5;

      this.$element.append(circle);

      circle.css('left', (x + 'px'));
      circle.css('top', (y + 'px'));

      angle += step;

      const circleObject: CircleObject = new CircleObject(circle, i);
      this._circles.push(circleObject);
    }
  }

  private createCircle(): angular.IAugmentedJQuery {
    const circle: angular.IAugmentedJQuery = angular.element('<div></div>');
    const dotSize: string = (this._parentSize * this._offsetSize) + 'px';
    circle.addClass('ms-Spinner-circle').css('width', dotSize).css('height', dotSize);

    return circle;
  };

  private setInitialOpacity(): void {
    let opcaityToSet: number;
    this._fadeIncrement = 1 / this._numCircles;

    this._circles.forEach((circle: CircleObject, index: number) => {
      opcaityToSet = (this._fadeIncrement * (index + 1));
      circle.opacity = opcaityToSet;
    });
  }

  private fadeCircle(circle: CircleObject): void {
    let newOpacity: number = circle.opacity - this._fadeIncrement;

    if (newOpacity <= 0) {
      newOpacity = 1;
    }

    circle.opacity = newOpacity;
  }

}

class CircleObject {
  constructor(
    public circleElement: angular.IAugmentedJQuery,
    public circleIndex: number) {
  }

  public get opacity(): number {
    return +(this.circleElement.css('opacity'));
  }

  public set opacity(opacity: number) {
    this.circleElement.css('opacity', opacity);
  }
}

export interface ISpinnerAttributes extends angular.IAttributes {
  uifSize?: string;
  ngShow?: any;
}