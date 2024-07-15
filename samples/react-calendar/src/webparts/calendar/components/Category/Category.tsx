import React from 'react';
import { ICategoryProps, ICategoryState } from "./ICategory";
import { ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from '@fluentui/react';

export default class Category extends React.PureComponent<ICategoryProps, ICategoryState> {

  private selectableOptions = this.props.catogries.filter(
    option =>
      (option.itemType === SelectableOptionMenuItemType.Normal || option.itemType === undefined) && !option.disabled,
  );

  public constructor(props) {
    super(props);
    this.state = {
      selectedKeys: this.props.selectedCategories.length == 0 ?
        [String('selectAll'), ...this.props.catogries.map(o => o.key as string)] :
        [String('selectAll'), ...this.props.selectedCategories.map(o => o.key as string)]
    };
  }

  private onChange = (event, option, index, value) => {

    const selected = option?.selected;
    const { selectedKeys } = this.state;
    const currentSelectedOptionKeys = selectedKeys.filter(key => key !== 'selectAll');
    const selectAllState = currentSelectedOptionKeys.length === this.selectableOptions.length;

    if (option) {
      if (option?.itemType === SelectableOptionMenuItemType.SelectAll) {

        selectAllState
          ? this.setState({ selectedKeys: [] }, () => { this.updateSelectableCategories(); })
          : this.setState({ selectedKeys: ['selectAll', ...this.selectableOptions.map(o => o.key as string)] }, () => { this.updateSelectableCategories(); });
      }
      else {
        const updatedKeys = selected
          ? [...currentSelectedOptionKeys, option!.key as string]
          : currentSelectedOptionKeys.filter(k => k !== option.key);

        if (updatedKeys.length === this.selectableOptions.length) {
          updatedKeys.push('selectAll');
        }

        this.setState({ selectedKeys: updatedKeys, }, () => { this.updateSelectableCategories(); });
      }
    }
  }

  private updateSelectableCategories() {
    const currentSelectedCategories: IComboBoxOption[] = [];

    if (this.state.selectedKeys.length >= 0) {
      this.state.selectedKeys.forEach(key => {
        const category: IComboBoxOption[] = this.selectableOptions.filter(opt => opt.key === key);
        if (category.length > 0) {
          currentSelectedCategories.push(category[0]);
        }
      });
    }

    this.props.onChangeCategories(currentSelectedCategories);
  }

  public render(): React.ReactElement {
    return (
      <div>
        <ComboBox
          label="Select Category"
          multiSelect
          options={[
            { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
            ...this.props.catogries
          ]}
          selectedKey={this.state.selectedKeys}
          onChange={this.onChange}
        />
      </div>
    );
  }
}