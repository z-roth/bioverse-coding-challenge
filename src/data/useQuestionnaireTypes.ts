import { supabase } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

interface UseQuestionnaireTypesModel {
  data: Tables<"questionnaire_questionnaires">[] | null;
  loading: boolean;
  error: boolean;
}

export const useQuestionnaireTypes = (): UseQuestionnaireTypesModel => {
  const [data, setData] = useState<
    Tables<"questionnaire_questionnaires">[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestionnaireTypes = async () => {
      let { data: fetchedData, error: fetchError } = await supabase
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
