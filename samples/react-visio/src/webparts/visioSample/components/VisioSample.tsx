import * as React from 'react';
import styles from './VisioSample.module.scss';
import { IVisioSampleProps } from './IVisioSampleProps';
import { escape, find } from '@microsoft/sp-lodash-subset';

export class VisioSample extends React.Component<IVisioSampleProps, {}> {

  constructor(props: IVisioSampleProps) {
    super(props);

    // set delegate functions that will be used to pass the values from the Visio service to the component
    this.props.visioService.onSelectionChanged = this._onSelectionChanged;
    this.props.visioService.getAllShapes = this._getAllShapes;
  }

  public render(): React.ReactElement<IVisioSampleProps> {
    return (
      <div className={styles.visioSample}>
        <div id='iframeHost' className={styles.iframeHost}></div>
        <div id='diagramDetailsPanel' className={styles.detailsPanel}></div>
      </div>
    );
  }

  public componentDidMount() {
    if (this.props.documentUrl) {
      this.props.visioService.load(this.props.documentUrl);
    }
  }

  /**
   * method executed after a on selection change event is triggered
   * @param selectedShape the shape selected by the user on the Visio diagram
   */
  private _onSelectionChanged = (selectedShape: Visio.Shape): void => {

    console.log("Selected shape: ", selectedShape);
    // get shape's Name property
    const nameProperty: Visio.ShapeDataItem = find(selectedShape.shapeDataItems.items,
      s => s.label === "Name"
    );
    console.log("Selected shape name: ", nameProperty.value);
  }

  /**
 * method executed after the collection of shapes is retrieved - after Visio diagram page load
 * @param shapes the collection of shapes on the Visio diagram
 */
  private _getAllShapes = (shapes: Visio.Shape[]): void => {

    console.log("Shapes: ", shapes);


  }
}
