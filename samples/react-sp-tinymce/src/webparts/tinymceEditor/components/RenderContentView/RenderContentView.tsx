import * as React from 'react';
import * as createDOMPurify from 'dompurify';
import * as DataHelper from '../../helpers/DataHelper';
import parse from 'html-react-parser';
import { IFieldSchema } from '../../model/IFieldSchema';
import { decode } from '../../utils/EncodingUtils';


export interface IRenderContentViewProps {
  listData: any;
  editorContent: string;
  listFieldsSchema: IFieldSchema[];
}

export interface IRenderContentViewState { }

export class RenderContentView extends React.PureComponent<
  IRenderContentViewProps,
  IRenderContentViewState
> {
  private DOMPurify: any;
  private editorRef = null;

  constructor(props: IRenderContentViewProps) {
    super(props);    
    this.DOMPurify = createDOMPurify(window);
    this.state = {};
  }

  
  public render(): React.ReactElement<IRenderContentViewProps> {
    const sanitisedHTML: string = this.DOMPurify.sanitize(decode(this.props.editorContent), {
      ADD_ATTR: ['target', 'frameborder', 'allowfullscreen', 'tabindex'],
      ADD_TAGS: ['iframe'],
    });

    const result: string | JSX.Element | JSX.Element[] = sanitisedHTML ? this.reactify(sanitisedHTML) : <span></span>;

    return (
      <>
        <div
          ref={this.editorRef}
          className='editor-styles'
          data-sp-feature-tag='Rich Text Editor'
        >
          {result}
        </div>
      </>
    );
  }

  private reactify(sanitisedHTML: string): string | JSX.Element | JSX.Element[] {
    const parser = (input: string) => parse(input, {
      replace: (domNode: any) => {
        if (domNode && domNode.type === 'text' && typeof domNode.data !== 'undefined') {
          const regex = new RegExp("{{(.*?)}}", "g");
          const match = regex.exec(domNode.data);
          if (match) {
            const column = match[1];
            const data = DataHelper.renderData(this.props.listData, column, this.props.listFieldsSchema);
            return data;
          }
        }
      }
    });

    const parsedData = parser(sanitisedHTML);
    return parsedData;
  }
}
