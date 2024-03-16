import { useState } from "react";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IQuestion, IAnswer } from "../models/models";
import { Fields, ListsUrl } from "../Constants/Constants";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetData(
  context: WebPartContext,
  userEmail: string,
  webServerRelativeUrl: string
) {

  //Declare States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const sp: SPFI = spfi().using(SPFx(context));

  //Get Answer of Question from Question ID
  const getAnswer = async (questionId: number): Promise<IAnswer | null> => {
    let retVal: IAnswer | null = null;
    const answers = await sp.web
      .getList(`${webServerRelativeUrl}${ListsUrl.Answers}`)
      .select(`${Fields.Title},${Fields.UserEmail},${Fields.Option}`)
      .items.filter(`${Fields.Title} eq '${questionId}'`)
      .getAll();

    //Get Count of answers
    retVal = {
      allAnswers: [
        answers.filter((x) => x.Option === Fields.Option1).length,
        answers.filter((x) => x.Option === Fields.Option2).length,
        answers.filter((x) => x.Option === Fields.Option3).length,
        answers.filter((x) => x.Option === Fields.Option4).length,
      ],
      //Check if Current User gave Answer already
      isCurrentUserAnswered:
        answers.filter((ans) => ans.UserEmail === userEmail).length > 0,
    };
    return retVal;
  };

  //Map Question with Options and Answer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapQuestion = async (item: any): Promise<IQuestion> => {
    const question: IQuestion = {
      id: item.ID,
      question: item.Question,
      options: [
        { key: Fields.Option1, text: item.Option1 },
        { key: Fields.Option2, text: item.Option2 },
        item.Option3 ? { key: Fields.Option3, text: item.Option3 } : null,
        item.Option4 ? { key: Fields.Option4, text: item.Option4 } : null,
      ],
      answer: await getAnswer(item.ID),
    };
    return question;
  };

  
  //Get Question 
  const getQuestion = async (): Promise<void> => {
    const questions: IQuestion[] = [];
    const items = await sp.web
      .getList(`${webServerRelativeUrl}${ListsUrl.Questions}`)
      .items.select(
        `${Fields.Question},${Fields.Option1},${Fields.Option2},${Fields.Option3},${Fields.Option4},${Fields.ID}`
      )
      .top(1)
      .filter(`${Fields.IsQuestionActive} eq 1`)
      .orderBy(Fields.ID, true)()
      .catch((e) => {
        console.log(e);
      });

    if (items) {
      for (const item of items) {
        questions.push(await mapQuestion(item));
      }
    }
    setQuestions(questions);
    setIsLoading(false);
  };

  //Submit Answer 
  const submitAnswer = async (
    questionId: number,
    answer: string,
    userEmail: string
  ): Promise<void> => {
    setIsSubmitting(true);
    await sp.web
      .getList(`${webServerRelativeUrl}${ListsUrl.Answers}`)
      .items.add({
        Title: questionId.toString(),
        Option: answer,
        UserEmail: userEmail,
      })
      .catch((e) => {
        console.log(e);
      });

    await getQuestion();
    setIsSubmitting(false);
  };

  return {
    isLoading,
    isSubmitting,
    questions,
    getQuestion,
    submitAnswer,
    setQuestions,
  };
}
