import styles from './EmployeeSpotlight.module.scss';

export class SliderHelper {
    public static slideIndex: number = 0;
    // /**
    //   * Constructor of helper class.
    //   */
    public constructor() {
        SliderHelper.slideIndex = 0;
    }

    /**
     * auto play slider
     */
    public startAutoPlay(): void {
        var slides = <HTMLScriptElement[]><any>document.getElementsByClassName(styles.mySlides);
        debugger;
        if (slides.length > 0) {
            for (var i: number = 0; i < slides.length; i++) {
                slides[i].style.display = SliderHelper.slideIndex == i ? "block" : "none";
            }
            SliderHelper.slideIndex = (++SliderHelper.slideIndex) >= slides.length ? 0 : SliderHelper.slideIndex;
        }
    }

    /**
     * move slide 
     * @param n - slide index.
     */
    public moveSlides(n: number = 0): boolean {
        SliderHelper.slideIndex += n;
        var slides = (<HTMLScriptElement[]><any>document.getElementsByClassName(styles.mySlides));
        if (slides.length > 0) {
            if (SliderHelper.slideIndex >= slides.length) { SliderHelper.slideIndex = 0; }
            if (SliderHelper.slideIndex < 0) { SliderHelper.slideIndex = slides.length - 1; }
            for (var i: number = 0; i < slides.length; i++) {
                slides[i].style.display = SliderHelper.slideIndex == i ? "block" : "none";
            }
        }
        return true;
    }
}