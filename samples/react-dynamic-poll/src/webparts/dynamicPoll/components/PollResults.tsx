import { ProgressIndicator } from "@fluentui/react";
import * as React from "react";
import { Poll, PollResult } from "../models/Poll";
import styles from "./DynamicPoll.module.scss";

export interface PollResultsProps {
  pollItem: Poll | undefined;
  results: PollResult[];
  totalVotes: number;
  votedAnswer?: string;
}

export function PollResults(props: PollResultsProps): React.ReactElement {
  const { pollItem, results, totalVotes, votedAnswer } = props;
  if (!pollItem) return <></>;

  return (
    <section className={styles.pollResults} aria-label="Poll results">
      <h3>Poll Results</h3>
      <p>
        <strong>Total Votes:</strong> {totalVotes}
      </p>
      {results.map((result) => {
        const isVotedAnswer = result.Answer === votedAnswer;
        const voteSummary = `${result.Count} votes (${Math.round(
          result.Percentage * 100,
        )}%)`;

        return (
          <div
            key={result.Answer}
            className={`${styles.pollResultsItem} ${
              isVotedAnswer ? styles.selectedResult : ""
            }`}
          >
            <div className={styles.pollResultsRow}>
              <div className={styles.pollResultsAnswer}>
                {result.Answer}
                {isVotedAnswer && (
                  <span className={styles.yourChoice}>Your choice</span>
                )}
              </div>
              <span className={styles.voteSummary}>{voteSummary}</span>
            </div>
            <ProgressIndicator
              percentComplete={result.Percentage}
              barHeight={10}
              styles={{
                progressBar: styles.progressBar,
              }}
            />
          </div>
        );
      })}
    </section>
  );
}
