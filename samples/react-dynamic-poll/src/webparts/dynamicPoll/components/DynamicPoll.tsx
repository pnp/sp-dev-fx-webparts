import {
  ChoiceGroup,
  IChoiceGroupOption,
  PrimaryButton,
} from "@fluentui/react";
import * as React from "react";
import { Poll, PollResult } from "../models/Poll";
import styles from "./DynamicPoll.module.scss";
import { PollResults } from "./PollResults";
import { SharePointService } from "../../../services/SharePointService";

export interface DynamicPollProps {
  pollItem: Poll | undefined;
  sharePointService: SharePointService;
  initialUserVote?: string;
  initialPollResults?: PollResult[];
  initialTotalVotes?: number;
}

export default function DynamicPoll(
  props: DynamicPollProps,
): React.ReactElement {
  const [selectedOption, setSelectedOption] = React.useState<
    string | undefined
  >(undefined);
  const [votedAnswer, setVotedAnswer] = React.useState<string | undefined>(
    props.initialUserVote,
  );
  const [pollResults, setPollResults] = React.useState<PollResult[]>(
    props.initialPollResults || [],
  );
  const [totalVotes, setTotalVotes] = React.useState<number>(
    props.initialTotalVotes || 0,
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const refreshResults = React.useCallback(async (): Promise<void> => {
    if (!props.pollItem) return;
    try {
      const { results, totalVotes } =
        await props.sharePointService.getPollResults(props.pollItem);
      setPollResults(results);
      setTotalVotes(totalVotes);
    } catch (error) {
      console.error("Error refreshing results:", error);
    }
  }, [props.pollItem, props.sharePointService]);

  const onVote = async (): Promise<void> => {
    if (!selectedOption || !props.pollItem) return;

    setLoading(true);
    try {
      await props.sharePointService.submitVote(
        props.pollItem.Id,
        selectedOption,
      );

      setVotedAnswer(selectedOption);
      await refreshResults();
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Error submitting vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!props.pollItem) {
    return (
      <div className={styles.dynamicPoll}>
        <div className={styles.container}>
          <div className={styles.noPoll}>
            <h3>No Active Poll</h3>
            <p>Check back later for new questions!</p>
          </div>
        </div>
      </div>
    );
  }

  const options: IChoiceGroupOption[] = (props.pollItem.Options || []).map(
    (option) => ({ key: option.trim(), text: option.trim() }),
  );

  return (
    <div className={styles.dynamicPoll}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{props.pollItem.Title}</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.question}>{props.pollItem.Question}</div>

          {votedAnswer ? (
            <div className={styles.thankYou}>
              <h3>Thanks for voting!</h3>
              <p>You selected:</p>
              <div className={styles.votedAnswer}>{votedAnswer}</div>
            </div>
          ) : (
            <>
              <ChoiceGroup
                options={options}
                onChange={(_, option) => setSelectedOption(option?.key)}
                required={true}
              />

              <div className={styles.actions}>
                <PrimaryButton
                  text={loading ? "Submitting..." : "Submit Vote"}
                  onClick={onVote}
                  disabled={!selectedOption || loading}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <PollResults
        pollItem={props.pollItem}
        results={pollResults}
        totalVotes={totalVotes}
      />
    </div>
  );
}
