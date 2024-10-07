"use client";

import { Box, Container, Select, Spinner, Text } from "theme-ui";
import QuestionnaireSelect from "./QuestionnaireSelect";

const QuestionnaireSelectPage: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        pt: 80,
      }}
    >
      <QuestionnaireSelect />
    </Container>
  );
};

export default QuestionnaireSelectPage;
