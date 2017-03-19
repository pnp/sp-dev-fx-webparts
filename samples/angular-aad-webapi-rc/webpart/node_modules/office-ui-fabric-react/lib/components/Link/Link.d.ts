import { BaseComponent } from '../../common/BaseComponent';
import { ILink, ILinkProps } from './Link.Props';
import './Link.scss';
export declare class Link extends BaseComponent<ILinkProps, any> implements ILink {
    private _link;
    render(): JSX.Element;
    focus(): void;
    private _onClick(ev);
}
