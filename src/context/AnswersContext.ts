import { Answer } from "@/utils/types/answer";
import { createContext } from "react";

export interface AnswersContextType {
  answers: Answer[];
  updateAnswers: (newAnswer: Answer) => void;
}

export const AnswersContext = createContext<AnswersContextType>({
  answers: [],
  updateAnswers: (_) => console.error("Answers provider not provided!"),
});
