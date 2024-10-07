import { Answer } from "@/utils/types/answer";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useAuth } from "@/auth/useAuth";
import { v4 as uuidv4 } from "uuid";

export const useInsertAnswers = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const insertAnswers = async (answers: Answer[], questionnaireId: number) => {
    const sessionId = uuidv4();
    setLoading(true);

    try {
      const { error } = await supabase.from("questionnaire_answers").insert(
        answers.map((answer) => {
          return {
            username: user,
            questionnaire_id: answer.questionnaireId,
            question_id: answer.questionId,
            answers: answer.answers,
            session_id: sessionId,
            type: answer.type,
          };
        })
      );

      if (error) {
        throw new Error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { insertAnswers, loading };
};
