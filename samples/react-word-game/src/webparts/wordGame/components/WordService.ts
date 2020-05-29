// import * as $ from '../assets/jquery.min';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from '@microsoft/sp-http';

// tslint:disable-next-line: no-any
const wordjpg: any = require('../assets/wordlist.jpg');

// tslint:disable-next-line: no-any
const $: any = require('../assets/jquery.min');

export class Game {
  public rounds: Round[] = [];
}

export class Round {
  public word: string = '';
  public answers: string[] = [];
  public correctAnswer: string = '';
  public incorrectAnswers: string[] = [];
}

export class WordGameListItem {
  // tslint:disable-next-line: variable-name
  public Name: string;

  // tslint:disable-next-line: variable-name
  public Score: number;

  // tslint:disable-next-line: variable-name
  public Seconds: number;

  // tslint:disable-next-line: variable-name
  public Details: string;

  constructor(name: string, score: number, seconds: number, details: string) {
    this.Name = name;
    this.Score = score;
    this.Seconds = seconds;
    this.Details = details;
  }
}

export class WordService {
  public allwords: string[] = [];
  public words3: string[] = [];
  public words4: string[] = [];
  public words5: string[] = [];
  public words6: string[] = [];
  public words7: string[] = [];
  public words8: string[] = [];
  public context: WebPartContext;

  public GenerateGame(): Game {

    const game: Game = new Game();

    const round1: Round = new Round();
    round1.word = this.GetRandomScrambledWord(5);
    round1.answers = this.FindPossibleWords(round1.word);

    const round2: Round = new Round();
    round2.word = this.GetRandomScrambledWord(5);
    round2.answers = this.FindPossibleWords(round2.word);

    const round3: Round = new Round();
    round3.word = this.GetRandomScrambledWord(5);
    round3.answers = this.FindPossibleWords(round3.word);

    const round4: Round = new Round();
    round4.word = this.GetRandomScrambledWord(6);
    round4.answers = this.FindPossibleWords(round4.word);

    const round5: Round = new Round();
    round5.word = this.GetRandomScrambledWord(6);
    round5.answers = this.FindPossibleWords(round5.word);

    const round6: Round = new Round();
    round6.word = this.GetRandomScrambledWord(6);
    round6.answers = this.FindPossibleWords(round6.word);

    game.rounds.push(round1);
    game.rounds.push(round2);
    game.rounds.push(round3);
    game.rounds.push(round4);
    game.rounds.push(round5);
    game.rounds.push(round6);

    return game;
  }

  public async loadWords(): Promise<void> {

    // tslint:disable-next-line: no-string-literal
    window['wordService'] = this;

    /* SP Loader Implementation */
    // console.log(jquery);
    // await SPComponentLoader.loadScript('../assets/jquery.min.js', { globalExportsName: "ScriptGlobal" });
    // console.log('jquery loaded');

    /* JSON File Implementation
          If you have a custom word list you would like to use
          add it as a JSON file in assets/wordlist.json and
          uncomment the const wordlist at the top of this file.
          Then comment out the Text File implementation below  */
    // let wordvalues = (Object as any).values(wordlist) as any;
    // let wordlistlength = wordvalues.length as number;
    // for(let i=0;i<wordlistlength;i++)
    //   this.allwords.push(wordvalues[i]);

    /* Text File Implementation
          Yields the smallest file download size vs JSON (700k vs 1.3mb)
          The word list is a text file stored as wordlist.jpg and
          loaded as text/plain using an overrided mime type */
    const responseText: string = await $.ajax({
      url: wordjpg,
      beforeSend: (xhr) => {
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
      }
    }) as string;
    this.allwords = responseText.split('\r\n');

    this.allwords.forEach(word => {
      if (word.indexOf('-') > -1) {
        return;
      }
      if (word.indexOf('-') > -1) {
        return;
      }
      switch (word.length) {
        case 3:
          this.words3.push(word);
          break;
        case 4:
          this.words4.push(word);
          break;
        case 5:
          this.words5.push(word);
          break;
        case 6:
          this.words6.push(word);
          break;
        case 7:
          this.words7.push(word);
          break;
        case 8:
          this.words8.push(word);
          break;
        default:
          break;
      }
    });

    console.log('words length: ' + this.allwords.length);

  }

  public GetWordCount(): number {
    return this.allwords.length;
  }

  public GetRandomScrambledWord(level: number): string {
    let randomWord: string = '';
    let randwordnum: number = 0;
    switch (level) {
      case 3:
        randwordnum = Math.floor(Math.random() * Math.floor(this.words3.length));
        randomWord = this.words3[randwordnum];
        break;
      case 4:
        randwordnum = Math.floor(Math.random() * Math.floor(this.words4.length));
        randomWord = this.words4[randwordnum];
        break;
      case 5:
        randwordnum = Math.floor(Math.random() * Math.floor(this.words5.length));
        randomWord = this.words5[randwordnum];
        break;
      case 6:
        randwordnum = Math.floor(Math.random() * Math.floor(this.words6.length));
        randomWord = this.words6[randwordnum];
        break;
      case 7:
        randwordnum = Math.floor(Math.random() * Math.floor(this.words7.length));
        randomWord = this.words7[randwordnum];
        break;
      case 8:
        randwordnum = Math.floor(Math.random() * Math.floor(this.words8.length));
        randomWord = this.words8[randwordnum];
        break;
      default:
        break;
    }

    const scrambledWord: string = this.ScrambleWord(randomWord);
    return scrambledWord;
  }

  public FindPossibleWords(currentWord: string): string[] {
    // coati
    // taco

    // currentWord = "coati";
    const possibleWords: string[] = [];
    this.allwords.forEach(word => {
      let tempword: string = word; // taco
      for (let i: number = 0; i < currentWord.length; i++) {

        const letter: string = currentWord[i];
        if (tempword.indexOf(letter) > -1) {
          tempword = tempword.slice(0, tempword.indexOf(letter)) + tempword.slice(tempword.indexOf(letter) + 1);
        } else {
          tempword = 'n';
          break;
        }
      }
      if (tempword.length === 0) {
        possibleWords.push(word);
      }
    });

    return possibleWords;

  }

  public ScrambleWord(word: string): string {
    let notScrambled: boolean = true;
    let scrambledWord: string = '';
    let count: number = 0;
    const originalword: string = word;
    while (notScrambled) {
      word = originalword;
      let chars: string = '';
      for (let i: number = 0; i < word.length; i++) {
        chars += ' ';
      }

      let index: number = 0;
      while (word.length > 0) {
        // Get a random number between 0 and the length of the word.
        const next: number = Math.floor(Math.random() * Math.floor(word.length));

        // Take the character from the random position and add to our char array.
        chars = this.replaceCharAt(chars, index, word[next]);

        // Remove the character from the word.
        word = word.substr(0, next) + word.substr(next + 1);
        ++index;
      }
      scrambledWord = chars.slice(0);
      count++;

      if (originalword !== scrambledWord) {
        notScrambled = false;
      }

      // just in case there is a problem
      if (count === 10) {
        notScrambled = false;
      }
    }

    return scrambledWord;
  }

  // SHAREPOINT APIS

  public SetContext(context: WebPartContext): void {
    this.context = context;
  }

  public async SubmitScore(score: number, seconds: number, details: string): Promise<void> {
    try {
      await this.CreateListIfNotExists();
      await this.CreateListItem(score, seconds, details);
    } catch (error) {
      // do nothing
    }
  }

  public async GetHighScores(): Promise<WordGameListItem[]> {

    let scores: WordGameListItem[] = [];
    try {
      const result: SPHttpClientResponse = await this.context.spHttpClient.get(
        this.context.pageContext.web.absoluteUrl
        + "/_api/web/lists/GetByTitle('WordGameList')/items",
        SPHttpClient.configurations.v1);
      // tslint:disable-next-line: no-any
      const json: any = await result.json();
      console.log(json);

      json.value.forEach(item => {
        scores.push(new WordGameListItem(item.Title,
          item.Score,
          item.Seconds,
          item.Details));
      });

      scores.sort((a, b) => {
        return b.Score - a.Score;
      });

      // top 10
      if (scores.length > 10) {
        scores = scores.slice(0, 10);
      }

      console.log('high scores', scores);
    } catch (error) {
      console.log('could not find list');
    }

    return scores;

  }

  // replace a character in a string
  private replaceCharAt(orig: string, index: number, replacement: string): string {
    return orig.substr(0, index) + replacement + orig.substr(index + replacement.length);
  }

  private async CreateListIfNotExists(): Promise<void> {
    const result: SPHttpClientResponse = await this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl
      + '/_api/web/lists',
      SPHttpClient.configurations.v1);

    // tslint:disable-next-line: no-any
    const json: any = await result.json();
    let exists: boolean = false;
    json.value.forEach(list => {
      if (list.Title === 'WordGameList') {
        console.log('list found');
        exists = true;
      }
    });
    console.log(json);
    if (exists === false) {
      console.log('Attempting to create list');
      await this.CreateList();
      await this.AddListColumnNumber('Score');
      await this.AddListColumnNumber('Seconds');
      await this.AddListColumnMultiLineText('Details');
    }
  }

  private async CreateListItem(score: number, seconds: number, details: string): Promise<void> {
    const listMetadata: {} = {
      '__metadata': {
        'type': 'SP.Data.WordGameListListItem'
      },
      'Title': this.context.pageContext.user.displayName,
      'Score': score,
      'Seconds': seconds,
      'Details': details
    };

    const options: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'OData-Version': '' // Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    const result: SPHttpClientResponse = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl
      + "/_api/web/lists/GetByTitle('WordGameList')/items",
      SPHttpClient.configurations.v1, options);
      // tslint:disable-next-line: no-any
    const json: any = await result.json();
    console.log(json);
  }

  private async CreateList(): Promise<void> {
    const listMetadata: {} = {
      '__metadata': {
        'type': 'SP.List'
      },
      'AllowContentTypes': true,
      'BaseTemplate': 100,
      'ContentTypesEnabled': true,
      'Description': 'Holds high scores for the word game',
      'Title': 'WordGameList'
    };

    const options: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'OData-Version': '' // Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    const result: SPHttpClientResponse = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + '/_api/web/lists', SPHttpClient.configurations.v1, options);
      // tslint:disable-next-line: no-any
    const json: any = await result.json();
    console.log(json);
  }

  private async AddListColumnMultiLineText(name: string): Promise<void> {
    const listMetadata: {} = {
      '__metadata': { 'type': 'SP.FieldNumber' },
      'FieldTypeKind': 3,
      'Title': name
    };

    const options: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'OData-Version': '' // Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    const result: SPHttpClientResponse = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl
      + "/_api/web/lists/getbytitle('WordGameList')/fields",
      SPHttpClient.configurations.v1, options);
      // tslint:disable-next-line: no-any
    const json: any = await result.json();
    console.log(json);
  }

  private async AddListColumnNumber(name: string): Promise<void> {
    const listMetadata: {} = {
      '__metadata': { 'type': 'SP.FieldNumber' },
      'FieldTypeKind': 9,
      'Title': name,
      'MinimumValue': 0,
      'MaximumValue': 1000000
    };

    const options: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Content-Type': 'application/json;odata=verbose',
        'OData-Version': '' // Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    const result: SPHttpClientResponse = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('WordGameList')/fields",
      SPHttpClient.configurations.v1, options);
      // tslint:disable-next-line: no-any
    const json: any = await result.json();
    console.log(json);
  }
}
