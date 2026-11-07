import { IEventItem } from '../../models';
import { SizeClass } from '../../common/useContainerSize';

export interface ILayoutProps {
  events: IEventItem[];
  /** Width class of the web part itself, so layouts adapt to the section they sit in. */
  size: SizeClass;
  /** Carousel only: rotate slides automatically. */
  autoplay?: boolean;
  /** Fixed height in pixels, 0 when the height follows the content. */
  height?: number;
}
