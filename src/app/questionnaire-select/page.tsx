"use client";

import { Button, Container } from "theme-ui";
import QuestionnaireSelect from "./QuestionnaireSelect";
import { useAuth } from "@/auth/useAuth";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

const QuestionnaireSelectPage: React.FC = () => {
  useProtectedRoute();
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
