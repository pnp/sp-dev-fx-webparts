import { IListServce } from "../services/IListService";
import { IReactSlideSwiperWebPartProps } from "../ReactSlideSwiperWebPart";

export interface IReactSlideSwiperProps {
  listService: IListServce;
  swiperOptions: IReactSlideSwiperWebPartProps;
}
