export type Question = {
  questionId: number;
  questionnaireId: number;
  type: "mcq" | "input" | undefined;
  question: string;
  options: string[] | undefined;
};
