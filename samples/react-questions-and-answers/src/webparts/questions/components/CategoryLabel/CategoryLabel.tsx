import * as React from 'react';
import styles from './CategoryLabel.module.scss';

interface ICategoryLabelProps
{
  category?: string;
  style?: any;
}

interface ICategoryLabelState {}

/**
 * @classdesc Very basic component to wrap visual display of category labeling wherever it may appear
 */
class CategoryLabelComponent extends React.Component<ICategoryLabelProps, ICategoryLabelState> {

  public render(): React.ReactElement<ICategoryLabelProps> {
    return (
      !(this.props.category === null || this.props.category === '') ?
          <span className={styles.categoryLabel} style={this.props.style}>{this.props.category}</span>
      : <></>
    );
  }
}

export default CategoryLabelComponent;
