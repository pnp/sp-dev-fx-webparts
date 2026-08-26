import * as React from 'react';
import styles from './Chatgpt.module.scss';
import { IChatgptProps } from './IChatgptProps';
import { PrimaryButton, DefaultButton, TextField, MessageBar, MessageBarType } from '@fluentui/react';
import { IChatgptState } from './IChatgptState';
import OpenAI from 'openai';
import { IChatgpt } from './IChatgpt';
import { Interweave } from 'interweave';

export default class Chatgpt extends React.Component<IChatgptProps, IChatgptState> {
  private static openai: OpenAI;
  private static readonly fallbackModelId = 'gpt-5-mini';

  constructor(props: IChatgptProps){
    super(props);

    this.state = ({
      chatgpt: [],
      currentQuestion: '',
      loading: false
    })
  }

  public componentDidMount(): void {
    if (this.props.apiKey) {
      Chatgpt.openai = new OpenAI({
        apiKey: this.props.apiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  public componentDidUpdate(prevProps: Readonly<IChatgptProps>): void {
    if (this.props.apiKey && this.props.apiKey !== prevProps.apiKey) {
      Chatgpt.openai = new OpenAI({
        apiKey: this.props.apiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  private updateQuestion(value: string): void{
    this.setState({currentQuestion: value});
  }

  private async askQuestion(): Promise<void>{
    const currentQuestion = this.state.currentQuestion.trim();
    if (!currentQuestion || !this.props.apiKey) {
      return;
    }
    const modelId = this.props.modelId || Chatgpt.fallbackModelId;

    const pendingEntry: IChatgpt = {
      question: currentQuestion,
      answer: '',
      isPending: true
    };

    this.setState((prevState) => ({
      loading: true,
      currentQuestion: '',
      chatgpt: [...prevState.chatgpt, pendingEntry]
    }));

    try {
      if (!Chatgpt.openai) {
        Chatgpt.openai = new OpenAI({
          apiKey: this.props.apiKey,
          dangerouslyAllowBrowser: true
        });
      }

      const response = await Chatgpt.openai.responses.create({
        model: modelId,
        input: currentQuestion,
        max_output_tokens: 1024
      });

      const answerText = response.output_text?.trim() || 'No response received from OpenAI.';

      this.setState((prevState) => {
        const updatedChat = [...prevState.chatgpt];
        const lastIndex = updatedChat.length - 1;

        if (lastIndex >= 0 && updatedChat[lastIndex].question === currentQuestion && updatedChat[lastIndex].isPending) {
          updatedChat[lastIndex] = {
            question: currentQuestion,
            answer: answerText
          };
        } else {
          updatedChat.push({
            question: currentQuestion,
            answer: answerText
          });
        }

        return {
          chatgpt: updatedChat,
          loading: false
        };
      });
    } catch (error) {
      console.error('OpenAI request failed', error);
      const fallbackAnswer = 'Unable to retrieve an answer from OpenAI. Please check the console for details.';

      this.setState((prevState) => {
        const updatedChat = [...prevState.chatgpt];
        const lastIndex = updatedChat.length - 1;

        if (lastIndex >= 0 && updatedChat[lastIndex].question === currentQuestion && updatedChat[lastIndex].isPending) {
          updatedChat[lastIndex] = {
            question: currentQuestion,
            answer: fallbackAnswer
          };
        } else {
          updatedChat.push({
            question: currentQuestion,
            answer: fallbackAnswer
          });
        }

        return {
          chatgpt: updatedChat,
          loading: false
        };
      });
    }
  }

  private clearAnswers(): void {
    this.setState({
      chatgpt: []
    });
  }

  public render(): React.ReactElement<IChatgptProps> {
    const { hasTeamsContext } = this.props;
    const chatgpt = [...this.state.chatgpt].reverse();

    return (
      <section className={`${styles.chatgpt} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.surface}>
          <div className={styles.welcome}>
            <div className={styles.welcomeContent}>
              <span className={styles.welcomeEyebrow}>Chat with GPT</span>
              <h2 className={styles.welcomeTitle}>
                Hey {this.props.context.pageContext.user.displayName}!
              </h2>
              <p className={styles.welcomeSubtitle}>
                Ask anything and get quick help right here.
              </p>
            </div>
            {!this.props.apiKey && (
              <div className={styles.apiKeyMessage}>
                <MessageBar
                  messageBarType={MessageBarType.warning}
                  isMultiline={false}
                >
                  Add your OpenAI API key in the web part properties to start a conversation.
                </MessageBar>
              </div>
            )}
          </div>
          {this.props.apiKey && (
            <section className={styles.chatArea}>
              <div className={styles.promptCard}>
                <TextField
                  className={styles.promptInput}
                  label="Ask your question"
                  placeholder="Try &quot;Draft a project status update summarising this week’s wins&quot;"
                  onChange={((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => this.updateQuestion(newValue || ''))}
                  value={this.state.currentQuestion}
                />
                <div className={styles.actions}>
                  <PrimaryButton text='Ask ChatGPT' onClick={this.askQuestion.bind(this)}/>
                  <DefaultButton text='Clear answers' onClick={this.clearAnswers.bind(this)}/>
                </div>
              </div>
              <section className={styles.loadingContainer}>
                {this.state.loading && <div className={styles.loader}>
                  <div/>
                  <div/>
                  <div/>
                </div>}
              </section>
              <section className={styles.conversation}>
                {chatgpt.map((chatgptEntry, key) => (
                  <section key={key} className={styles.messageGroup}>
                    <div className={`${styles.messageRow} ${styles.outgoing}`}>
                      <div className={`${styles.messageBubble} ${styles.questionBubble}`}>
                        {chatgptEntry.question}
                      </div>
                    </div>
                    <div className={`${styles.messageRow} ${styles.incoming}`}>
                      {chatgptEntry.isPending ? (
                        <div className={`${styles.messageBubble} ${styles.answerBubble}`}>
                          <div className={styles.typingIndicator}>
                            <span/>
                            <span/>
                            <span/>
                          </div>
                        </div>
                      ) : (
                        <Interweave className={`${styles.messageBubble} ${styles.answerBubble}`} content={chatgptEntry.answer}/>
                      )}
                    </div>
                  </section>
                ))}
              </section>
            </section>
          )}
        </div>
      </section>
    );
  }
}
