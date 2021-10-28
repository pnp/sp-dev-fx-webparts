import * as React from 'react';
import styles from './ReactDocCardFaq.module.scss';
import { IReactDocCardFaqProps } from './IReactDocCardFaqProps';
import { escape, fromPairs } from '@microsoft/sp-lodash-subset';

import { DocumentCard, DocumentCardDetails, DocumentCardTitle } from 'office-ui-fabric-react/lib/DocumentCard';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { IFAQList } from '../_helpers/listModel';
import { listService } from '../_helpers/listService';

import { IReactDocCardFaqState } from './IReactDocCardFaqState';
import { AnswerModal } from './AnswerModal/AnswerModal';
import { QuestionsModal } from './QuestionsModal/QuestionsModal';

export default class ReactDocCardFaq extends React.Component<IReactDocCardFaqProps, IReactDocCardFaqState> {
  private _listService: listService;
  private _AnswerModal: AnswerModal;
  private _QuestionsModal: QuestionsModal;
  private modalQuestions: IFAQList[];

  constructor(props) {
    super(props);
    this.answerModal = this.answerModal.bind(this);
    this.questionsModal = this.questionsModal.bind(this);
    this.state = {
      questions: []
    };
  }

  private questionsModal(category)
  {
    this.modalQuestions = this.state.questions.filter((question) => {
      return question.Category === category;
    });
    this._QuestionsModal.showQuestionsModal(this.modalQuestions);
  }

  private answerModal(question, answer)
  {
    
    this._AnswerModal.showAnswerModal(question, answer);
    
  }

  public componentDidMount(): void {
    this._listService = new listService(this.props.absoluteUrl, this.props.context.spHttpClient);
    this._getFAQItems();
  }

  private _getFAQItems(): void {
    this._listService.getListItems()
      .then((items: IFAQList[]) => {
        this.setState({ questions: items });
      });
  }

  public render(): React.ReactElement<IReactDocCardFaqProps> {
    if (this.props.multiSelect == undefined || this.props.multiSelect.length <= 0) {

      return (
        <div>Please Select Categories</div>
      );
    }
    else if (this.props.multiSelect.length > 0) {

      return (
        <div className={styles.docCardContainer}>
          {this.props.multiSelect.map((category) => {
            return (
              <div className={styles.docCardObj}>
                <DocumentCard className={styles.docCard}>
                <a onClick={this.questionsModal.bind(this, category)}> <DocumentCardTitle title={category} className={styles.docCardTitle}></DocumentCardTitle></a>


                  {this.state.questions.map((question) => {if (question.Category === category && question.Featured == true) {
                      return (
                        <DocumentCardDetails >
                          <div className={styles.docCardQuestionButtonDiv}>
                            <DefaultButton className={styles.docCardQuestionButton} onClick={this.answerModal.bind(this, question.Title, question.Answer)}>
                              {question.Title}
                            </DefaultButton>
                          </div>
                        </DocumentCardDetails>
                      );
                    }
                  })}
                </DocumentCard>
                <AnswerModal ref={component => this._AnswerModal = component}></AnswerModal>
                <QuestionsModal ref={component => this._QuestionsModal = component}></QuestionsModal>


              </div>
            );
          })}
        </div>
      );
    }
  }
}
