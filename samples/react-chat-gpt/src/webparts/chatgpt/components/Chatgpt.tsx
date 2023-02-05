import * as React from 'react';
import styles from './Chatgpt.module.scss';
import { IChatgptProps } from './IChatgptProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, TextField } from 'office-ui-fabric-react';
import { IChatgptState } from './IChatgptState';
import { Configuration, OpenAIApi } from 'openai';
import { IChatgpt } from './IChatgpt';
import { Interweave } from 'interweave';

export default class Chatgpt extends React.Component<IChatgptProps, IChatgptState> {
  private static openai: OpenAIApi;

  constructor(props: IChatgptProps){
    super(props);

    this.state = ({
      chatgpt: [],
      currentQuestion: '',
      loading: false
    })
  }

  public componentDidMount(): void {
    const key = new Configuration({
      apiKey: this.props.apiKey,
    });
    Chatgpt.openai = new OpenAIApi(key);
  }

  private updateQuestion(value: string): void{
    this.setState({currentQuestion: value});
  }

  private async askQuestion(): Promise<void>{
    const currentQuestion = this.state.currentQuestion;
    this.setState({
      loading: true,
      currentQuestion: ''
    })
    const response = await Chatgpt.openai.createCompletion({
      model: "text-davinci-003",
      prompt: currentQuestion,
      max_tokens: 2048
    });

    const chatgpt: IChatgpt = {
      question: currentQuestion,
      answer: response.data.choices[0].text.replace('\n\n','')
    }

    const oldChatgpt = this.state.chatgpt;
    oldChatgpt.push(chatgpt);
    this.setState({
      chatgpt: oldChatgpt,
      loading: false
    })
  }

  private clearAnswers(): void {
    this.setState({
      chatgpt: []
    });
  }

  public render(): React.ReactElement<IChatgptProps> {
    const {
      isDarkTheme,
      hasTeamsContext,
    } = this.props;
    const chatgpt = this.state.chatgpt.reverse();

    return (
      <section className={`${styles.chatgpt} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Welcome {escape(this.props.context.pageContext.user.displayName)}, ask ChatGPT anything:</h2>
          {!this.props.apiKey && <section>No Api key present, enter your api key in the webpart properties</section>}
        </div>
        {this.props.apiKey &&<section>
          <TextField className={styles.textfield} label="Question: " onChange={((event,newValue) => this.updateQuestion(newValue))} value={this.state.currentQuestion}/>
          <PrimaryButton text='Ask ChatGPT' onClick={this.askQuestion.bind(this)}/>
          <PrimaryButton text='Clear answers' onClick={this.clearAnswers.bind(this)}/>
          <section className={styles.loadingContainer}>
            {this.state.loading && <div className={styles.loader}>
              <div/>
              <div/>
              <div/>
            </div>}
          </section>
          <section className={styles.container}>
          {chatgpt.map((chatgpt, key) => {return <section key={key}>
            <section className={styles.questionContainer}>
              <section className={styles.question}>{chatgpt.question}</section>
            </section>
            <section className={styles.answerContainer}>
              <Interweave className={styles.answer} content={chatgpt.answer}/>
            </section>
            </section>}
          )}
          </section>
        </section>}
      </section>
    );
  }
}
