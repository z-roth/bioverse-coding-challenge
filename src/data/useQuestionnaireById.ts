import { supabase } from "@/utils/supabase/client";
import { Question } from "@/utils/types/question";
import { useEffect, useState } from "react";

export const useQuestionnaireById = (id: number | undefined) => {
  const [data, setData] = useState<Question[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchQuestionnaireById = async () => {
      const { data: fetchedData, error: fetchError } = await supabase
        .from("questionnaire_junction")
        .select(
          `
        id,
        priority,
        questionnaire_questions (
          id,
          question
        )
        `
        )
        .eq("questionnaire_id", id)
        .order("priority", { ascending: true });

      if (fetchError) {
        console.error("Error fetching questionnaire questions", fetchError);
        setError(true);
      } else {
        if (fetchedData) {
          const formattedData = fetchedData.map((q): Question => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const questionData = q.questionnaire_questions as any; // issue with type mismatch between what supabase returns and what is expected, had to use "any"
            return {
              questionnaireId: id,
              questionId: questionData.id,
              type: questionData.question.type,
              question: questionData.question.question,
              options: questionData.question.options,
            };
          });
          setData(formattedData);
        }
      }
      setLoading(false);
    };

    fetchQuestionnaireById();
  }, [id]);

  return { data, loading, error };
};
