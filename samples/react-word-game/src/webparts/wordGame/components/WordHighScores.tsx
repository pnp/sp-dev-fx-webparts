import * as React from 'react';
import { WordGameListItem } from './WordService';

export interface IWordHighScoresProps {
  scores: WordGameListItem[];
}

export default class WordHighScores extends React.Component<IWordHighScoresProps, {}> {

  constructor(props: IWordHighScoresProps) {
    super(props);

  }

  public render(): React.ReactElement<IWordHighScoresProps> {
    let rank: number = 1;
    return (
      <div>
        {
          this.props.scores.length > 0 ?
            <h3 style={{ textDecoration: 'underline' }}>High Scores</h3> : ''
        }
        <table style={{ marginLeft: 'Auto', marginRight: 'Auto' }}>
          <tbody>
            {
              this.props.scores.map(score => (
                <tr>
                  <td><b>{rank++ + ') '}</b></td>
                  <td><b>{score.Name} </b></td>
                  <td><span style={{ marginLeft: '10px' }}>Score: {score.Score} </span></td>
                  <td><span style={{ marginLeft: '10px' }}>Seconds: {score.Seconds}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
