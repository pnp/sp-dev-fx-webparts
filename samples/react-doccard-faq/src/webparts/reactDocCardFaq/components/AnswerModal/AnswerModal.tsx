import * as React from 'react';

import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {IAnswerModalState} from './IAnswerModalState';

import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

export class AnswerModal extends React.Component<{}, IAnswerModalState> {
  private myRichText;
    constructor(props) {
        super(props);
        this.closeAnswerModal = this.closeAnswerModal.bind(this);
        this.showAnswerModal = this.showAnswerModal.bind(this);
        this.state = {
          openAnswerModal: false,
          answer: "",
          question: ""
        };
      }

  public showAnswerModal(question, answer): void {
        this.setState({
          question: question,
          answer: answer,
          openAnswerModal: true
        });
      }
    
      public closeAnswerModal():void {
        this.setState({
          openAnswerModal: false
        });
  }

  private onTextChange = (newText: string) => {
    this.myRichText = newText;
    return newText;
  }
  
    
      
       
    public render(): React.ReactElement<{}> {
      return (
        <Modal
        isOpen={this.state.openAnswerModal}
        onDismiss={this.closeAnswerModal} >
        
        <div style={{ maxWidth: '700px', minWidth: '400px' }}>
            <div style={{ textAlign: 'center', fontSize: '20px', padding: '10px' }}>{this.state.question}</div>
            <div style={{ width: '100%', background: 'rgba(0, 0, 0, 0.3)', height: '2px' }}></div>
            <div>
              <RichText value={this.state.answer}
                onChange={(text) => this.onTextChange(text)} />
            </div>
        </div>
            
        </Modal>
        );
    }
  
  }