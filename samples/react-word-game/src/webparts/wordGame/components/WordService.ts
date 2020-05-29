// import * as $ from '../assets/jquery.min';
import { SPComponentLoader } from '@microsoft/sp-loader';
import WordGame from './WordGame';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
  SPHttpClient,
  SPHttpClientResponse,   
  HttpClientConfiguration,
  ISPHttpClientOptions
 } from '@microsoft/sp-http';
const wordjpg: any = require('../assets/wordlist.jpg');
const $: any = require('../assets/jquery.min');
// const wordlist: any = require('../assets/wordlist.json');

export class Game
{
    rounds:Round[] = [];
}

export class Round
{
    word = "";
    answers:string[] = [];
    correctAnswer = "";
    incorrectAnswers:string[] = [];
}


export class WordService {

  allwords: string[] = [];
  words3: string[] = [];
  words4: string[] = [];
  words5: string[] = [];
  words6: string[] = [];
  words7: string[] = [];
  words8: string[] = [];
  context:WebPartContext;

  GenerateGame():Game
  {

      let game = new Game();

      let round1 = new Round(); round1.word = this.GetRandomScrambledWord(5); round1.answers = this.FindPossibleWords(round1.word);
      let round2 = new Round(); round2.word = this.GetRandomScrambledWord(5); round2.answers = this.FindPossibleWords(round2.word);
      let round3 = new Round(); round3.word = this.GetRandomScrambledWord(5); round3.answers = this.FindPossibleWords(round3.word);
      let round4 = new Round(); round4.word = this.GetRandomScrambledWord(6); round4.answers = this.FindPossibleWords(round4.word);
      let round5 = new Round(); round5.word = this.GetRandomScrambledWord(6); round5.answers = this.FindPossibleWords(round5.word);
      let round6 = new Round(); round6.word = this.GetRandomScrambledWord(6); round6.answers = this.FindPossibleWords(round6.word);

      game.rounds.push(round1);
      game.rounds.push(round2);
      game.rounds.push(round3);
      game.rounds.push(round4);
      game.rounds.push(round5);
      game.rounds.push(round6);

      return game;
  }


  async loadWords() {

    window["wordService"] = this;

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
    var responseText = await $.ajax({
      url: wordjpg,
      beforeSend: function (xhr) {
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
      }
    }) as string;
    this.allwords = responseText.split("\r\n");

    this.allwords.forEach(word => {
      if (word.indexOf("-") > -1)
        return;
      if (word.indexOf("-") > -1)
        return;
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

  GetWordCount(): number {
    return this.allwords.length;
  }

  GetRandomScrambledWord(level: number) {
    let randomWord = "";
    let randwordnum = 0;
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

    let scrambledWord = this.ScrambleWord(randomWord);
    return scrambledWord;
  }

  FindPossibleWords(currentWord: string) {
    //coati
    //taco

    //currentWord = "coati";
    let possibleWords: string[] = [];
    this.allwords.forEach(word => {
      let tempword = word;//taco 
      for (let i = 0; i < currentWord.length; i++) {

        let letter = currentWord[i];
        if (tempword.indexOf(letter) > -1) {
          tempword = tempword.slice(0, tempword.indexOf(letter)) + tempword.slice(tempword.indexOf(letter) + 1);
        }
        else {
          tempword = 'n';
          break;
        }
      }
      if (tempword.length == 0)
        possibleWords.push(word)
    });

    return possibleWords;

  }

  //replace a character in a string
  private replaceCharAt(orig:string, index:number, replacement:string): string {
    return orig.substr(0, index) + replacement + orig.substr(index + replacement.length);
  }

  ScrambleWord(word: string): string {
    let notScrambled = true;
    let scrambledWord = "";
    let count = 0;
    var originalword = word;
    while (notScrambled) {
      word = originalword;
      let chars = '';
      for (let i = 0; i < word.length; i++)
        chars += ' ';

      let index = 0;
      while (word.length > 0) { 
        let next = Math.floor(Math.random() * Math.floor(word.length)); // Get a random number between 0 and the length of the word. 
        chars = this.replaceCharAt(chars, index, word[next]); // Take the character from the random position and add to our char array. 
        word = word.substr(0, next) + word.substr(next + 1); // Remove the character from the word. 
        ++index;
      }
      scrambledWord = chars.slice(0);
      count++;

      if (originalword!=scrambledWord)
        notScrambled = false;

      //just in case there is a problem
      if (count == 10)
        notScrambled = false;
    } 

    return scrambledWord;

  }

  //SHAREPOINT APIS

  SetContext(context:WebPartContext){
    this.context = context;
  }

  public async SubmitScore(score:number,seconds:number,details:string){
    try{
      await this.CreateListIfNotExists();
      await this.CreateListItem(score,seconds,details);
    }catch(error){}
  }

  async GetHighScores():Promise<WordGameListItem[]>{

    var scores:WordGameListItem[] = [];
    try{
      let result = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('WordGameList')/items", SPHttpClient.configurations.v1);
      let json:any = await result.json();
      console.log(json);
      
  
      json.value.forEach(item => {
        scores.push(new WordGameListItem(item.Title,item.Score,item.Seconds,item.Details));
      });
  
      scores.sort((a,b)=> {return b.Score-a.Score});

      //top 10
      if (scores.length>10)
          scores = scores.slice(0,10);
  
      console.log('high scores',scores);
    }catch(error){
      console.log('could not find list');
    }
    
    return scores;

  }

  async CreateListIfNotExists(){
    let result = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists', SPHttpClient.configurations.v1);
    let json:any = await result.json();
    let exists = false;
    json.value.forEach(list => {
      if (list.Title=='WordGameList'){
        console.log('list found');
        exists = true;
      }
    });
    console.log(json);
    if (exists==false){
      console.log('Attempting to create list');
      await this.CreateList();
      await this.AddListColumnNumber('Score');
      await this.AddListColumnNumber('Seconds');
      await this.AddListColumnMultiLineText('Details');
    }
  }

  async CreateListItem(score:number,seconds:number,details:string){
    var listMetadata = {
      "__metadata": {
        "type": "SP.Data.WordGameListListItem"
      },
      "Title": this.context.pageContext.user.displayName,
      "Score": score,
      "Seconds": seconds,
      "Details": details
    };
    
    var options: ISPHttpClientOptions = {
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "OData-Version": "" //Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    let result = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('WordGameList')/items", SPHttpClient.configurations.v1,options);
    let json:any = await result.json();
    console.log(json);
  }

  async CreateList(){
    var listMetadata = {
      "__metadata": {
        "type": "SP.List"
      },
      "AllowContentTypes": true,
      "BaseTemplate": 100,
      "ContentTypesEnabled": true,
      "Description": "Holds high scores for the word game",
      "Title": "WordGameList"
    };
    
    var options: ISPHttpClientOptions = {
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "OData-Version": "" //Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    let result = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + '/_api/web/lists', SPHttpClient.configurations.v1,options);
    let json:any = await result.json();
    console.log(json);
  }

  async AddListColumnMultiLineText(name:string){
    var listMetadata = {
        '__metadata': {'type':'SP.FieldNumber'},
        'FieldTypeKind': 3,
        'Title': name,
    };

    var options: ISPHttpClientOptions = {
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "OData-Version": "" //Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    let result = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('WordGameList')/fields", SPHttpClient.configurations.v1,options);
    let json:any = await result.json();
    console.log(json);
  }

  async AddListColumnNumber(name:string){
    var listMetadata = {
        '__metadata': {'type':'SP.FieldNumber'},
        'FieldTypeKind': 9,
        'Title': name,
        'MinimumValue': 0,
        'MaximumValue': 1000000
    };

    var options: ISPHttpClientOptions = {
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "OData-Version": "" //Really important to specify
      },
      body: JSON.stringify(listMetadata)
    };

    let result = await this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('WordGameList')/fields", SPHttpClient.configurations.v1,options);
    let json:any = await result.json();
    console.log(json);
  }


}

export class WordGameListItem{
  Name:string;
  Score:number;
  Seconds:number;
  Details:string;
  constructor(name:string,score:number,seconds:number,details:string){
    this.Name = name;
    this.Score = score;
    this.Seconds = seconds;
    this.Details = details;
  }
}