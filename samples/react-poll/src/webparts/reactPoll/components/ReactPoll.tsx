import * as React from "react";
import styles from "./ReactPoll.module.scss";
import { IReactPollProps } from "./IReactPollProps";
import { useGetData } from "../../../apiHooks/useGetData";
import { useEffect } from "react";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { PrimaryButton } from "office-ui-fabric-react/lib/components/Button/PrimaryButton/PrimaryButton";
import { IQuestion } from "../../../models/models";
import {
  ChartControl,
  ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import { ShimmerLoadder } from "./Loader";

const ReactPoll: React.FunctionComponent<IReactPollProps> = (props) => {
  const {
    isLoading,
    isSubmitting,
    questions,
    getQuestion,
    submitAnswer,
    setQuestions,
  } = useGetData(props.context, props.userEmail, props.webServerRelativeUrl);

  useEffect(() => {
    //Get Question

    getQuestion()
      .then(() => {
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //Submit Answer
  const handleSubmitClick = (question: IQuestion): void => {
    submitAnswer(question.id, question.selectedOption, props.userEmail)
      .then(() => {
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Change Selection
  const chnageSelectidOption = (
    ev: React.FormEvent<HTMLElement | HTMLInputElement>,
    option: IChoiceGroupOption,
    questionId: number
  ): void => {
    const updatedQuestions = questions.map((question: IQuestion) => {
      if (question.id === questionId) {
        return { ...question, selectedOption: option.key };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  return (
    <>
      {/* Show Loadder while Loading Question */}
      {isLoading && <ShimmerLoadder />}

      {/* Show Chart if Current User already gave answer */}
      {questions &&
        questions.length > 0 &&
        questions.map((question) => (
          <div key={question.id}>
            {question.answer.isCurrentUserAnswered && (
              <React.Fragment key={question.id}>
                <div className={styles["ms-Grid"]} dir="ltr">
                  <div className={styles["ms-Grid-row"]}>
                    <div
                      className={` ${styles["ms-Grid-col"]} ${styles["ms-sm12"]} ${styles["ms-font-m-plus"]} ${styles["ms-fontWeight-bold"]}  `}
                    >
                      {question.question}
                    </div>
                  </div>
                  <div
                    className={`${styles["ms-Grid-row"]} ${styles.chartRow}`}
                  >
                    <div
                      className={` ${styles["ms-Grid-col"]} ${styles["ms-sm12"]} ${styles["ms-md12"]} ${styles["ms-lg6"]} `}
                    >
                      <ChartControl
                        type={ChartType.Pie}
                        data={{
                          labels: question.options
                            .filter((i) => i !== null)
                            .map((i) => i?.text),
                          datasets: [
                            {
                              label: question.question,
                              data: question.answer.allAnswers,
                            },
                          ],
                        }}
                        options={{
                          Animation: false,
                          legend: {
                            display: true,
                            position: "right",
                          },
                          title: {
                            display: false,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}

            {/* Show Question with Options if Current User already didn't give answer */}
            {!question.answer.isCurrentUserAnswered && (
              <React.Fragment key={question.id}>
                <div className={styles["ms-Grid"]} dir="ltr">
                  <div className={styles["ms-Grid-row"]}>
                    <div
                      className={` ${styles["ms-Grid-col"]} ${styles["ms-sm12"]}   `}
                    >
                      <ChoiceGroup
                        options={question.options.filter((i) => i !== null)}
                        label={question.question}
                        onChange={(e, selectedOption) =>
                          chnageSelectidOption(e, selectedOption, question.id)
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={` ${styles["ms-Grid-row"]} ${styles.submitButtonRow}`}
                  >
                    <div
                      className={` ${styles["ms-Grid-col"]} ${styles["ms-sm12"]} `}
                    >
                      <PrimaryButton
                        text="Submit"
                        disabled={
                          question.selectedOption === undefined || isSubmitting
                        }
                        onClick={() => handleSubmitClick(question)}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        ))}
    </>
  );
};
export default ReactPoll;
