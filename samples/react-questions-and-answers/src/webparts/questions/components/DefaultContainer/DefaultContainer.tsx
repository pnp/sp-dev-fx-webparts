import * as React from 'react';
// redux related
import { connect } from 'react-redux';
import { IApplicationState } from 'webparts/questions/redux/reducers/appReducer';
// other
import styles from './DefaultContainer.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import SearchComponent from '../Search/Search';
import QuestionListComponent from '../QuestionList/QuestionList';
import QuestionComponent from '../Question/Question';
import ErrorComponent from '../Error/Error';
import { IQuestionItem } from 'models';
import { getPagedQuestions, inializeNewQuestion, getSelectedQuestion } from 'webparts/questions/redux/actions/actions';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as Quill from 'quill';
import { getIconClassName } from '@uifabric/styling';
import { autobind } from '@uifabric/utilities/lib';
import { WebPartRenderMode } from 'utilities';

interface IConnectedDispatch {
    getPagedQuestions: (goingToNextPage: boolean) => void;
    inializeNewQuestion: (initialTitle: string) => void;
    getSelectedQuestion: (questionId: number) => void;
}

interface IConnectedState {
    title: string;
    displayMode: DisplayMode;
    selectedQuestion: IQuestionItem | null;
    loadInitialPage: boolean;
    applicationErrorMessage?: string;
    themeVariant: IReadonlyTheme | undefined;
    webPartRenderMode: string;
}

// map the application state to properties on this component so they can be used
function mapStateToProps(state: IApplicationState, ownProps: any): IConnectedState {
    return {
        title: state.title,
        displayMode: state.displayMode,
        selectedQuestion: state.selectedQuestion,
        loadInitialPage: state.loadInitialPage,
        applicationErrorMessage: state.applicationErrorMessage,
        themeVariant: state.themeVariant,
        webPartRenderMode: state.webPartRenderMode
    };
}

// map actions to properties so they can be invoked
const mapDispatchToProps = {
    getPagedQuestions,
    inializeNewQuestion,
    getSelectedQuestion
};

export interface IDefaultContainerProps {
    selectedQuestionId: number;
    updateTitle: (value: string) => void;
}

export interface IDefaultContainerState {
    showQuestions: boolean;
}

class DefaultContainerComponent extends React.Component<IDefaultContainerProps & IConnectedState & IConnectedDispatch, IDefaultContainerState> {

    constructor(props: IDefaultContainerProps & IConnectedState & IConnectedDispatch) {
        super(props);
        this.state = { showQuestions: true };

        this.updateQuillIcons();
    }

    public componentDidMount() {
        if (this.props.selectedQuestionId === 0) {
            this.props.inializeNewQuestion('');
            this.setState({ showQuestions: false });
        }
        else if (this.props.selectedQuestionId > 0) {
            this.props.getSelectedQuestion(this.props.selectedQuestionId);
            this.setState({ showQuestions: false });
        }
        else if (this.props.loadInitialPage === true) {
            this.props.getPagedQuestions(false);
        }
    }

    public componentDidUpdate(prevProps: IDefaultContainerProps & IConnectedState & IConnectedDispatch, prevState: IDefaultContainerState): void {

        // if our question has changed
        if (this.props.selectedQuestion !== prevProps.selectedQuestion) {
            if (this.props.selectedQuestion !== null) {
                this.setState({ showQuestions: false });
            }
            else {
                this.setState({ showQuestions: true });
            }
        }
    }

    public render(): React.ReactElement<IDefaultContainerProps> {

        const { applicationErrorMessage, webPartRenderMode } = this.props;
        const { showQuestions } = this.state;

        const color: string = (!!this.props.themeVariant && this.props.themeVariant.semanticColors.bodyText) || "inherit";

        return (
            <div style={{ color: color }} className={styles.defaultcontainer}>
                <WebPartTitle displayMode={this.props.displayMode}
                    themeVariant={this.props.themeVariant}
                    title={this.props.title}
                    updateProperty={this.props.updateTitle} />

                {!applicationErrorMessage ? (
                    <div>
                        {webPartRenderMode !== WebPartRenderMode.OpenQuestions &&
                         webPartRenderMode !== WebPartRenderMode.AnsweredQuestions &&
                            <SearchComponent show={showQuestions} />
                        }
                        <QuestionListComponent show={showQuestions} />
                        <QuestionComponent show={!showQuestions} />
                    </div>
                ) : (
                        <ErrorComponent erroMessage={applicationErrorMessage} />
                    )
                }

            </div>
        );
    }

    @autobind
    private updateQuillIcons() {
        let icons = Quill.default.import('ui/icons');
        icons['bold'] = `<i class="${getIconClassName('Bold')}" />`;
        icons['italic'] = `<i class="${getIconClassName('Italic')}" />`;
        icons['underline'] = `<i class="${getIconClassName('Underline')}" />`;
        icons['strike'] = `<i class="${getIconClassName('Strikethrough')}" />`;
        icons['color'] = `<i class="${getIconClassName('FontColor')}" />`;
        icons['background'] = `<i class="${getIconClassName('BackgroundColor')}" />`;
        icons['header']['1'] = `<i class="${getIconClassName('Header1')}" />`;
        icons['header']['2'] = `<i class="${getIconClassName('Header2')}" />`;
        icons['header']['3'] = `<i class="${getIconClassName('Header3')}" />`;
        icons['blockquote'] = `<i class="${getIconClassName('RightDoubleQuote')}" />`;
        icons['list']['ordered'] = `<i class="${getIconClassName('NumberedList')}" />`;
        icons['list']['bullet'] = `<i class="${getIconClassName('BulletedList2')}" />`;
        icons['indent']['-1'] = `<i class="${getIconClassName('DecreaseIndentLegacy')}" />`;
        icons['indent']['+1'] = `<i class="${getIconClassName('IncreaseIndentLegacy')}" />`;
        icons['align'][''] = `<i class="${getIconClassName('AlignLeft')}" />`;
        icons['align']['center'] = `<i class="${getIconClassName('AlignCenter')}" />`;
        icons['align']['justify'] = `<i class="${getIconClassName('AlignJustify')}" />`;
        icons['align']['right'] = `<i class="${getIconClassName('AlignRight')}" />`;
        icons['link'] = `<i class="${getIconClassName('Link')}" />`;
        icons['clean'] = `<i class="${getIconClassName('ClearFormatting')}" />`;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultContainerComponent);