export type Answer = {
  questionId: number;
  questionnaireId: number;
  type: "mcq" | "input" | undefined;
  answers: string[];
};
