import * as React from 'react';
import { IQuestionsModalState } from './IQuestionsModalState';

import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {
    DetailsList,
    IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "@pnp/spfx-controls-react/lib/AccessibleAccordion";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

export class QuestionsModal extends React.Component<{}, IQuestionsModalState> {
    private myRichText;
    constructor(props) {
        super(props);
        this.closeQuestionsModal = this.closeQuestionsModal.bind(this);
        this.showQuestionsModal = this.showQuestionsModal.bind(this);
        const columns: IColumn[] = [
            {
                key: 'Question',
                name: 'Question',
                fieldName: 'Title',
                minWidth: 210
            },
            {
                key: 'Answer',
                name: 'Answer',
                fieldName: 'Answer',
                minWidth: 210
            }
        ];
        this.state = {
            columns: columns,
            questions: [],
            openQuestionsModal: false,
            titleCategory: ""
        };
    }

    public showQuestionsModal(questions): void {
        this.setState({
            questions: questions,
            openQuestionsModal: true,
            titleCategory: questions[0].Category
        });
    }

    public closeQuestionsModal(): void {
        this.setState({
            openQuestionsModal: false
        });
    }

    private onTextChange = (newText: string) => {
        this.myRichText = newText;
        return newText;
    }


    public render(): React.ReactElement<{}> {
        return (
            <div>
                <Modal
                    isOpen={this.state.openQuestionsModal}
                    onDismiss={this.closeQuestionsModal}>
                    
                    <Accordion allowZeroExpanded style={{ width: '700px' }} >
                        <div style={{ textAlign: 'center', fontSize: '20px', padding: '10px' }} >{this.state.titleCategory}</div>

                        {this.state.questions.map((question) => {
                            return (
                                <AccordionItem >
                                    <AccordionItemHeading >
                                        <AccordionItemButton  >
                                            {question.Title}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                        <RichText value={question.Answer}
                                            onChange={(text) => this.onTextChange(text)} />
                                    </AccordionItemPanel>

                                </AccordionItem>
                            );
                        })}
                    </Accordion>

                </Modal>
            </div>
        );
    }


}