import { useQuestionnaireById } from "@/data/useQuestionnaireById";
import { Button, Flex, Spinner, Text } from "theme-ui";
import Question from "./question/Question";
import { FormEvent, useEffect, useState } from "react";
import { Answer } from "@/utils/types/answer";
import { AnswersContext } from "@/context/AnswersContext";
import { useInsertAnswers } from "@/data/useInsertAnswers";
import { useRouter } from "next/navigation";
import { usePastAnswers } from "@/data/usePastAnswers";
import { useAuth } from "@/auth/useAuth";

interface QuestionnaireFormProps {
  id: number;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ id }) => {
  const { user } = useAuth();
  const { data, loading, error } = useQuestionnaireById(id);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { insertAnswers, loading: isSubmitting } = useInsertAnswers();
  const { pastAnswers } = usePastAnswers(user ?? "");
  const router = useRouter();

  useEffect(() => {
    if (data && pastAnswers.length > 0) {
      const pastAnswersMap = new Map<number, string[]>(
        pastAnswers.map((answer) => [answer.question_id, answer.answers])
      );

      const existingAnswers = data.map((questionData) => {
        const pastAnswer = pastAnswersMap.get(questionData.questionId);
        return {
          questionId: questionData.questionId,
          questionnaireId: questionData.questionnaireId,
          type: questionData.type,
          answers: pastAnswer ? pastAnswer : [],
        };
      });
      
      setAnswers(existingAnswers);
    }
  }, [data, pastAnswers]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (data && answers.length < data.length) {
      alert(
        "Please verify that you have answered all questions and try again."
      );
    } else {
      try {
        await insertAnswers(answers);
        alert("Successfully submitted questionnaire!");
        router.push("/questionnaire-select");
      } catch (error) {
        alert("Error submitting questionnaire, please try again.");
        console.error(error);
      }
    }
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
        <Button type="submit">{isSubmitting ? <Spinner /> : "Submit"}</Button>
      </Flex>
    </AnswersContext.Provider>
  );
};

export default QuestionnaireForm;
