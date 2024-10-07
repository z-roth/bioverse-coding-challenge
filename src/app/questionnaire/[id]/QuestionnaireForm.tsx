import { useQuestionnaireById } from "@/data/useQuestionnaireById";
import { Button, Flex, Spinner, Text } from "theme-ui";
import Question from "./question/Question";
import { FormEvent, useEffect, useState } from "react";
import { Answer } from "@/utils/types/answer";
import { AnswersContext } from "@/context/AnswersContext";

interface QuestionnaireFormProps {
  id: number;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ id }) => {
  const { data, loading, error } = useQuestionnaireById(id);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const updateAnswers = (newAnswer: Answer) => {
    setAnswers((prevAnswers) => {
      const idx = prevAnswers.findIndex(
        (a) => a.questionId === newAnswer.questionId
      );

      const isAnswerEmpty = newAnswer.answers[0].trim() === "";

      // if the answer has already been added, change it or remove it
      if (idx >= 0) {
        const updatedAnswers = [...prevAnswers];

        if (newAnswer.answers.length === 0 || isAnswerEmpty) {
          updatedAnswers.splice(idx, 1);
        } else {
          updatedAnswers[idx].answers = newAnswer.answers;
        }

        return updatedAnswers;
      }

      // if its a new answer, add it to the state
      if (!isAnswerEmpty) {
        return [...prevAnswers, newAnswer];
      }

      return prevAnswers;
    });
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]); //TODO: Implement caching previously answered questions

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </Flex>
    );
  }

  if (error || !data) {
    return (
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Text variant="heading2">Something went wrong.</Text>
        <Text>Error loading data.</Text>
      </Flex>
    );
  }

  return (
    <AnswersContext.Provider value={{ answers, updateAnswers }}>
      <Flex
        sx={{ flexDirection: "column", gap: 3 }}
        as="form"
        onSubmit={handleSubmit}
      >
        {data.map((questionData, idx) => (
          <Question data={questionData} key={idx} />
        ))}
        <Button type="submit">Submit</Button>
      </Flex>
    </AnswersContext.Provider>
  );
};

export default QuestionnaireForm;
