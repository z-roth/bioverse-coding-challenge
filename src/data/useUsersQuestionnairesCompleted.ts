import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

const useUsersQuestionnairesCompleted = () => {
  const [data, setData] = useState<
    { username: string; questionnairesCompleted: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersQuestionnairesCompleted = async () => {
      setLoading(true);
      setError(false);

      const { data: answers, error: fetchError } = await supabase
        .from("questionnaire_answers")
        .select("username, session_id");

      if (fetchError) {
        console.error(fetchError);
        setError(true);
        setLoading(false);
        return;
      }

      const userQuestionnairesCount: { [key: string]: Set<string> } = {};

      answers?.forEach((answer) => {
        const { username, session_id } = answer;

        if (username) {
          if (!userQuestionnairesCount[username]) {
            userQuestionnairesCount[username] = new Set();
          }

          userQuestionnairesCount[username].add(session_id);
        }
      });

      const transformedData = Object.entries(userQuestionnairesCount).map(
        ([username, sessions]) => ({
          username,
          questionnairesCompleted: sessions.size,
        })
      );

      setData(transformedData);
      setLoading(false);
    };

    fetchUsersQuestionnairesCompleted();
  }, []);

  return { data, loading, error };
};

export default useUsersQuestionnairesCompleted;
