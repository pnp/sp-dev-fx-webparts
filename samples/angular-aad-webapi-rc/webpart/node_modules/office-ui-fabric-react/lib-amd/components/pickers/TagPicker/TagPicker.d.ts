import { BasePicker } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.Props';
export interface ITag {
    key: string;
    name: string;
}
export interface ITagPickerProps extends IBasePickerProps<ITag> {
}
export declare class TagPicker extends BasePicker<ITag, ITagPickerProps> {
    protected static defaultProps: {
        onRenderItem: (props: any) => JSX.Element;
        onRenderSuggestionsItem: (props: ITag) => JSX.Element;
    };
}
