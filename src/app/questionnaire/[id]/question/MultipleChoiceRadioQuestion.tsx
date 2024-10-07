import { QuestionProps } from "./Question";
import { useAnswers } from "@/context/useAnswers";
import { Radio, Label } from "theme-ui";
import { QuestionBox } from "./QuestionBox";

const MultipleChoiceRadioQuestion: React.FC<QuestionProps> = ({ data }) => {
  const { updateAnswers, answers } = useAnswers();

  const selectedAnswer = answers.find((a) => a.questionId === data.questionId);

  const handleChange = (answer: string) => {
    updateAnswers({
      questionId: data.questionId,
      questionnaireId: data.questionnaireId,
      type: data.type,
      answers: [answer],
    });
  };

  if (!data.options) {
    throw new Error("data.options should be defined!");
  }

  return (
    <QuestionBox title={data.question}>
      {data.options.map((option, idx) => {
        return (
          <Label
            key={idx}
            sx={{ display: "flex", alignItems: "center", paddingBottom: 1 }}
          >
            <Radio
              value={option}
              checked={selectedAnswer?.answers[0] === option}
              onChange={() => handleChange(option)}
            />
            {option}
          </Label>
        );
      })}
    </QuestionBox>
  );
};

export default MultipleChoiceRadioQuestion;
