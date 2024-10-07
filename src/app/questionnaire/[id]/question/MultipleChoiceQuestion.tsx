"use client";

import MultipleChoiceCheckboxQuestion from "./MultipleChoiceCheckboxQuestion";
import MultipleChoiceRadioQuestion from "./MultipleChoiceRadioQuestion";
import { QuestionProps } from "./Question";
import { QuestionBox } from "./QuestionBox";
import { Text } from "theme-ui";

const MultipleChoiceQuestion: React.FC<QuestionProps> = ({ data }) => {
  if (!data.options || data.options.length === 0) {
    return (
      <QuestionBox title={data.question}>
        <Text variant="caption">No options available for this question.</Text>
      </QuestionBox>
    );
  }

  const isCheckboxQuestion = data.question.includes("Select all that apply.");

  return isCheckboxQuestion ? (
    <MultipleChoiceCheckboxQuestion data={data} />
  ) : (
    <MultipleChoiceRadioQuestion data={data} />
  );
};

export default MultipleChoiceQuestion;
