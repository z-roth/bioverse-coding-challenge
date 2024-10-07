"use client";

import { useQuestionnaireTypes } from "@/data/useQuestionnaireTypes";
import { useParams } from "next/navigation";
import { Container, Text } from "theme-ui";
import QuestionnaireForm from "./QuestionnaireForm";
import { useEffect, useState } from "react";

const QuestionnairePage: React.FC = () => {
  const { id } = useParams();
  const parsedId = parseInt(id as string, 10);

  const { data } = useQuestionnaireTypes();

  const [title, setTitle] = useState<string>("Questionnaire");

  useEffect(() => {
    if (data) {
      const type = data.find((q) => q.id === parsedId)?.name;

      if (type) {
        setTitle(`Questionnaire for ${type}`);
      }
    }
  }, [data, parsedId]);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        py: 40,
      }}
    >
      <Text variant="heading2">{title}</Text>
      <QuestionnaireForm id={parsedId} />
    </Container>
  );
};

export default QuestionnairePage;
