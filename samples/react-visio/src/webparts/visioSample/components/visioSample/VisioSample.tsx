import * as React from 'react';
import styles from './VisioSample.module.scss';
import { IVisioSampleProps, IVisioSampleState } from '.';
import { Hyperlink } from '../hyperlink';

export class VisioSample extends React.Component<IVisioSampleProps, IVisioSampleState> {

  constructor(props: IVisioSampleProps) {
    super(props);

    // set delegate functions that will be used to pass the values from the Visio service to the component
    this.props.visioService.onSelectionChanged = this._onSelectionChanged;
    this.props.visioService.getAllShapes = this._getAllShapes;

    this.state = {
      selectedShape: null
    };
  }

  public render(): React.ReactElement<IVisioSampleProps> {
    return (
      <div className={styles.visioSample}>
        <div id='iframeHost' className={styles.iframeHost}></div>
        <div className={styles.detailsPanel}>
          {this.state.selectedShape &&
            <div>
              <h2>{this.state.selectedShape.name}</h2>
              <div>
                {this.state.selectedShape.hyperlinks.items.length > 0 &&
                  this.state.selectedShape.hyperlinks.items.map(
                    hyperlinkProps => <Hyperlink properties={hyperlinkProps}></Hyperlink>
                  )
                }
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  public componentDidMount() {
    if (this.props.documentUrl) {
      this.props.visioService.load(this.props.documentUrl);
    }
  }

  public async componentDidUpdate(prevProps: IVisioSampleProps) {
    if (this.props.documentUrl && this.props.documentUrl !== prevProps.documentUrl) {
      this.props.visioService.load(this.props.documentUrl);
    }
  }

  /**
   * method executed after a on selection change event is triggered
   * @param selectedShape the shape selected by the user on the Visio diagram
   */
  private _onSelectionChanged = (selectedShape: Visio.Shape): void => {

    console.log("Selected shape: ", selectedShape);
    console.log("Selected shape name: ", selectedShape.name);

    this.setState({
      selectedShape: selectedShape
    });
  }

  /**
 * method executed after the collection of shapes is retrieved - after Visio diagram page load
 * @param shapes the collection of shapes on the Visio diagram
 */
  private _getAllShapes = (shapes: Visio.Shape[]): void => {

    console.log("Shapes: ", shapes);


  }
}
