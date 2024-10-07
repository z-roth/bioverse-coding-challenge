import { Box, Text } from "theme-ui";
import InputQuestion from "./InputQuestion";
import type { Question } from "@/utils/types/question";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

export interface QuestionProps {
  data: Question;
}

const Question: React.FC<QuestionProps> = ({ data }) => {
  if (data.type === "mcq") {
    return <MultipleChoiceQuestion data={data} />;
  }

  if (data.type === "input") {
    return <InputQuestion data={data} />;
  }

  return (
    <Box>
      <Text>Something went wrong.</Text>
    </Box>
  );
};

export default Question;
