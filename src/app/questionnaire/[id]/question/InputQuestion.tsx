"use client";

import { Input } from "theme-ui";
import { QuestionProps } from "./Question";
import { QuestionBox } from "./QuestionBox";
import { useAnswers } from "@/context/useAnswers";

const InputQuestion: React.FC<QuestionProps> = ({ data }) => {
  const { updateAnswers, answers } = useAnswers();

  const handleChange = (answer: string) => {
    updateAnswers({
      questionId: data.questionId,
      questionnaireId: data.questionnaireId,
      type: data.type,
      answers: [answer],
    });
  };

  const preFilledValue =
    answers.find((a) => a.questionId == data.questionId)?.answers[0] ?? "";

  return (
    <QuestionBox title={data.question}>
      <Input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={preFilledValue}
      />
    </QuestionBox>
  );
};

export default InputQuestion;
