import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

const useUserAnswers = (username?: string) => {
  const [data, setData] = useState<
    {
      questionnaireName: string;
      answers: { question: string; answer: string }[];
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAnswers = async () => {
      setLoading(true);
      setError(false);

      if (!username) {
        setData([]);
        setLoading(false);
        return;
      }

      const { data: answers, error: fetchError } = await supabase
        .from("questionnaire_answers")
        .select(
          "session_id, question_id, answers, questionnaire_questions(question), questionnaire_questionnaires(name)"
        )
        .eq("username", username);

      if (fetchError) {
        console.error("Error fetching answers:", fetchError);
        setError(true);
        setLoading(false);
        return;
      }

      const groupedAnswers: {
        questionnaireName: string;
        answers: { question: string; answer: string }[];
      }[] = [];

      answers.forEach((answer) => {
        console.log(answer);
        const questionnaires: any = answer.questionnaire_questionnaires; // I try not to use any, but there was some problem between supabase's actual and expected types I couldn't figure out.
        const questions: any = answer.questionnaire_questions;
        const questionnaireName = questionnaires.name;
        const questionText = questions.question;
        const userAnswer = answer.answers;

        let questionnaire = groupedAnswers.find(
          (q) => q.questionnaireName === questionnaireName
        );

        if (!questionnaire) {
          questionnaire = { questionnaireName, answers: [] };
          groupedAnswers.push(questionnaire);
        }

        questionnaire.answers.push({
          question: questionText,
          answer: userAnswer,
        });
      });

      setData(groupedAnswers);
      setLoading(false);
    };

    fetchUserAnswers();
  }, [username]);

  return { data, loading, error };
};

export default useUserAnswers;
