import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

/**
 * A React hook to get all of the past answers for a certain user.
 * @param username the username of the user to get the answers of.
 * @returns The past answers data, if the data is loading, and error state.
 */
export const usePastAnswers = (username: string) => {
  const [pastAnswers, setPastAnswers] = useState<
    { question_id: number; answers: string[] }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPastAnswers = async () => {
      setLoading(true);
      setError(false);

      if (!username) {
        setPastAnswers([]);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("questionnaire_answers")
        .select("question_id, answers")
        .eq("username", username);

      if (fetchError) {
        console.error("Error fetching past answers:", fetchError);
        setError(true);
        setLoading(false);
        return;
      }

      const formattedAnswers = data.map((i) => ({
        question_id: i.question_id,
        answers: i.answers,
      }));

      setPastAnswers(formattedAnswers);
      setLoading(false);
    };

    fetchPastAnswers();
  }, [username]);

  return { pastAnswers, loading, error };
};
