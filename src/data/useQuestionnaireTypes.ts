import { supabase } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

interface UseQuestionnaireTypesModel {
  data: Tables<"questionnaire_questionnaires">[] | null;
  loading: boolean;
  error: boolean;
}

/**
 * A React hook to return all different types of questionnaires.
 * @returns The data and its loading and error states.
 */
export const useQuestionnaireTypes = (): UseQuestionnaireTypesModel => {
  const [data, setData] = useState<
    Tables<"questionnaire_questionnaires">[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestionnaireTypes = async () => {
      const { data: fetchedData, error: fetchError } = await supabase
        .from("questionnaire_questionnaires")
        .select("*");

      if (fetchError) {
        console.error("Error fetching questionnaires:", fetchError);
        setError(true);
      } else {
        setData(fetchedData);
      }
      setLoading(false);
    };

    fetchQuestionnaireTypes();
  }, []);

  return { data, loading, error };
};
