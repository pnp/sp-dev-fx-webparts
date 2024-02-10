import * as React from                                     'react';

import {
  IRssResultsTemplateProps,
  IRssResultsTemplateState
} from                                                     './';

import styles from                                         './RssResultsTemplate.module.scss';

import { DomHelper } from                                  '../../../../helpers/DomHelper';

export default class RssResultsTemplate extends React.Component<IRssResultsTemplateProps, IRssResultsTemplateState> {

  private parentRef: HTMLElement;

  constructor(props: IRssResultsTemplateProps) {
    super(props);

    this.state = {
      processedTemplate: null
    };
  }

  public render(): any {
    const objectNode: any = document.querySelector("object[data='about:blank']");

    if (objectNode) {
        objectNode.style.display = "none";
    }
    return <div className={styles.templateRoot} ref={el => this.parentRef = el}>
      <div dangerouslySetInnerHTML={{ __html: this.state.processedTemplate }}></div>
    </div>;

  }

  public componentDidMount(): void {

    this._updateTemplate(this.props);

  }

  // public componentWillReceiveProps(nextProps: IRssResultsTemplateProps): void {
  public componentDidUpdate(prevProps: any): void {

    this._updateTemplate(this.props);

  }

  private async _updateTemplate(props: IRssResultsTemplateProps): Promise<void> {

    const templateContent = props.templateContent;

    // Process the Handlebars template
    const template = await this.props.templateService.processTemplate(props.templateContext, templateContent);

    this.setState({
      processedTemplate: template
    });
  }
}
