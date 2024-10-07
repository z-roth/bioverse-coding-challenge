"use client";

import { QuestionProps } from "./Question";
import { Checkbox, Label } from "theme-ui";
import { useAnswers } from "@/context/useAnswers";
import { QuestionBox } from "./QuestionBox";

const MultipleChoiceQuestion: React.FC<QuestionProps> = ({ data }) => {
  const { updateAnswers, answers } = useAnswers();

  // Use the correct type for selectedAnswer based on the new structure
  const selectedAnswer = answers.find((a) => a.questionId === data.questionId);

  const handleChange = (answer: string) => {
    if (selectedAnswer && selectedAnswer.answers.includes(answer)) {
      updateAnswers({
        questionId: data.questionId,
        questionnaireId: data.questionnaireId,
        type: data.type,
        answers: selectedAnswer.answers.filter((a) => a !== answer), // Filter out the deselected answer
      });
    } else {
      updateAnswers({
        questionId: data.questionId,
        questionnaireId: data.questionnaireId,
        type: data.type,
        answers: [...(selectedAnswer?.answers ?? []), answer], // Add the newly selected answer
      });
    }
  };

  if (!data.options) {
    throw new Error("data.options should be defined!");
  }

  return (
    <QuestionBox title={data.question}>
      {data.options.map((option, idx) => (
        <Label
          key={idx}
          sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}
        >
          <Checkbox
            value={option}
            checked={selectedAnswer?.answers.includes(option) ?? false}
            onChange={() => handleChange(option)}
          />
          {option}
        </Label>
      ))}
    </QuestionBox>
  );
};

export default MultipleChoiceQuestion;
