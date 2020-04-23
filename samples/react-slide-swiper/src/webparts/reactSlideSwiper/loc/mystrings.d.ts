declare interface IReactSlideSwiperWebPartStrings {
  SwiperOptions: string;
  GeneralGroupName: string;
  EnableNavigation: string;
  EnablePagination: string;
  SlidesPerWiew: string;
  AutoplayGroupName: string;
  EnableAutoplay: string;
  DelayAutoplay: string;
  Miliseconds: string;
  DisableAutoplayOnInteraction: string;
  AdvancedGroupName: string;
  SlidesPerGroup: string;
  SpaceBetweenSlides: string;
  InPixels: string;
  EnableGrabCursor: string;
  EnableLoop: string;
  ListName:string;
}

declare module 'ReactSlideSwiperWebPartStrings' {
  const strings: IReactSlideSwiperWebPartStrings;
  export = strings;
}
