"use client";

import { Button, Container, Select, Spinner, Text } from "theme-ui";
import QuestionnaireSelect from "./QuestionnaireSelect";
import { useAuth } from "@/auth/useAuth";

const QuestionnaireSelectPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        pt: 80,
        gap: 4,
      }}
    >
      <QuestionnaireSelect />
      <Button onClick={logout}>Log out</Button>
    </Container>
  );
};

export default QuestionnaireSelectPage;
