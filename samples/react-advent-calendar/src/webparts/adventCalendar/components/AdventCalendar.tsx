import * as React from 'react';
import styles from './AdventCalendar.module.scss';
import { IAdventCalendarProps } from './IAdventCalendarProps';


export interface IAdventCalendarState {
  openedDays: Set<number>;
  contents: Array<{ day: number, content: string, gifUrl: string }>;
}

const dayContents = [
  {'day': 1,'content': "What's a programmer's favorite hangout place? Foo Bar.",gifUrl: "https://media.giphy.com/media/L9AqjFr6H4iaY/giphy.gif"},
{'day': 2,'content': 'The first 1GB hard disk drive was announced in 1980, weighing about 550 pounds.',gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjJqb290YzIyODlyZ2N3OGJ0empieDVmaWRiY3M0b3h1b2dyYTgyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XgXyfLgsf08yAoyrom/giphy.gif"},
{'day': 3,'content': 'The first Google Doodle was dedicated to the Burning Man festival attended by Google founders in 1998.',gifUrl: "https://media.giphy.com/media/vrxxqQbyRxYi6scCjT/giphy.gif"},
{'day': 4,'content': "How many programmers does it take to change a light bulb? None, that's a hardware problem.",gifUrl: "https://media.giphy.com/media/Dk57URqjqjHjNGHeMV/giphy.gif"},
{'day': 5, 'content': 'The first computer mouse was made of wood.',gifUrl: "https://media.giphy.com/media/8FPjV1q3tV3epx2EwP/giphy-downsized-large.gif"},
{'day': 6,'content': "The original name of Windows was 'Interface Manager'.",gifUrl: "https://media.giphy.com/media/ao668huBDpclN0XdrW/giphy.gif"},
{'day': 7, 'content': 'What do you call a programmer from Finland? Nerdic.',gifUrl: "https://media.giphy.com/media/nGMnDqebzDcfm/giphy.gif"},
{'day': 8,'content': 'The first ever VCR (Video Camera Recorder), which was made in 1956, was the size of a piano.',gifUrl: "https://media.giphy.com/media/zOvBKUUEERdNm/giphy.gif"},
{'day': 9,'content': 'Why was the function sad after a successful first call? It didn’t get a callback.',gifUrl: "https://example.com/gif1.gif"},
{'day': 10,'content': 'The first 1GB hard disk drive was announced in 1980, weighing about 550 pounds.',gifUrl: "https://example.com/gif1.gif"},
{'day': 11,'content': "Email predates the World Wide Web; it's been around since 1971.",gifUrl: "https://example.com/gif1.gif"},
{'day': 12,'content': "The first ever YouTube video was uploaded on April 23, 2005, and is titled 'Me at the zoo'.",gifUrl: "https://example.com/gif1.gif"},
{'day': 13,'content': "Email predates the World Wide Web; it's been around since 1971.",gifUrl: "https://example.com/gif1.gif"},
{'day': 14,'content': "How many programmers does it take to change a light bulb? None, that's a hardware problem.",gifUrl: "https://example.com/gif1.gif"},
{'day': 15,'content': "Why was the JavaScript developer sad? Because he didn't 'null' his feelings.",gifUrl: "https://example.com/gif1.gif"},
{'day': 16,'content': 'The first ever VCR (Video Camera Recorder), which was made in 1956, was the size of a piano.',gifUrl: "https://example.com/gif1.gif"},
{'day': 17,'content': 'Why do programmers prefer dark mode? Because light attracts bugs.',gifUrl: "https://example.com/gif1.gif"},
{'day': 18, 'content': 'The first computer mouse was made of wood.',gifUrl: "https://example.com/gif1.gif"},
{'day': 19,'content': "Why do Java developers wear glasses? Because they can't C#.",gifUrl: "https://example.com/gif1.gif"},
{'day': 20,'content': 'The first 1GB hard disk drive was announced in 1980, weighing about 550 pounds.',gifUrl: "https://example.com/gif1.gif"},
{'day': 21,'content': "The original name of Windows was 'Interface Manager'.",gifUrl: "https://example.com/gif1.gif"},
{'day': 22,'content': 'The first Google Doodle was dedicated to the Burning Man festival attended by Google founders in 1998.',gifUrl: "https://example.com/gif1.gif"},
{'day': 23,'content': 'The first ever VCR (Video Camera Recorder), which was made in 1956, was the size of a piano.',gifUrl: "https://example.com/gif1.gif"},
{'day': 24,'content': "Why was the JavaScript developer sad? Because he didn't 'null' his feelings.",gifUrl: "https://example.com/gif1.gif"}];


export default class AdventCalendar extends React.Component<IAdventCalendarProps, IAdventCalendarState> {
  constructor(props: IAdventCalendarProps) {
    super(props);
    this.state = {
      openedDays: new Set(),
      contents: dayContents,
    };
  }

  private openDay = (day: number):void => {
    this.setState(prevState => ({
      openedDays: prevState.openedDays.add(day), 
      contents: prevState.contents,
    }));
  }
  


  public render(): React.ReactElement<IAdventCalendarProps> {

    const { openedDays, contents } = this.state;

    const days = [];
    for (let i = 1; i <= 24; i++) {
      days.push(i);
    }

    return (
      <div className={styles.calendarGrid}>
      {contents.map(({ day, content, gifUrl }) => (
        <div
          key={day}
          className={`${styles.calendarDay} ${openedDays.has(day) ? styles.opened : ''}`}
          onClick={() => this.openDay(day)}
        >
          <div className={styles.calendarDayNumber}>{day}</div>
          {openedDays.has(day) && (
            <div className={`${styles.calendarContent} ${openedDays.has(day) ? styles.opened : ''}`}>
              <p>{content}</p>
              <img src={gifUrl} alt={`Content for Day ${day}`} />
            </div>
          )}
        </div>
      ))}
    </div>
    );
  }
}
