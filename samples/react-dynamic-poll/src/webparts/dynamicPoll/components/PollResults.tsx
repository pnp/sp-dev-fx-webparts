import { ProgressIndicator } from "@fluentui/react";
import * as React from "react";
import { Poll, PollResult } from "../models/Poll";
import styles from "./DynamicPoll.module.scss";

export interface PollResultsProps {
  pollItem: Poll | undefined;
  results: PollResult[];
  totalVotes: number;
}

export function PollResults(props: PollResultsProps): React.ReactElement {
  const { pollItem, results, totalVotes } = props;
  if (!pollItem) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Poll Results</h2>
      </div>
      <div className={styles.content}>
        <p>
          <strong>Total Votes:</strong> {totalVotes}
        </p>
        {results.map((result) => (
          <div key={result.Answer} className={styles.pollResultsItem}>
            <div className={styles.pollResultsRow}>
              <span>{result.Answer}</span>
              <span>
                {result.Count} votes ({Math.round(result.Percentage * 100)}%)
              </span>
            </div>
            <ProgressIndicator
              percentComplete={result.Percentage}
              barHeight={10}
              styles={{
                progressBar: { background: "#0078d4" },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
