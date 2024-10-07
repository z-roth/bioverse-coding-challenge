import { useContext } from "react";
import { AnswersContext } from "./AnswersContext";

export const useAnswers = () => {
  const context = useContext(AnswersContext);

  if (!context) {
    throw new Error("No answers context provided!");
  }

  return context;
};
