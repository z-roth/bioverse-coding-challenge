"use client";

import { useQuestionnaireTypes } from "@/data/useQuestionnaireTypes";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button, Flex, Label, Select, Spinner, Text } from "theme-ui";

const QuestionnaireSelect: React.FC = () => {
  const { data, loading, error } = useQuestionnaireTypes();
  const [selectedQuestionnaireID, setSelectedQuestionnaireID] = useState<
    number | undefined
  >();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedQuestionnaireID) {
      router.push(`/questionnaire/${selectedQuestionnaireID}`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text variant="error">Failed to load questionnaires.</Text>;
  }

  if (!data || data.length === 0) {
    return <Text variant="error">No questionnaires available</Text>;
  }

  return (
    <Flex
      as="form"
      sx={{ flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <Label htmlFor="questionnaire-select">
        Please select a questionnaire.
      </Label>
      <Select
        id="questionnaire-select"
        value={selectedQuestionnaireID || ""}
        onChange={(e) => {
          setSelectedQuestionnaireID(parseInt(e.target.value));
        }}
      >
        <option value="" disabled>
          Select a value...
        </option>
        {data.map((questionnaireType) => (
          <option key={questionnaireType.id} value={questionnaireType.id}>
            {questionnaireType.name}
          </option>
        ))}
      </Select>
      <Button type="submit" disabled={!selectedQuestionnaireID}>
        Submit
      </Button>
    </Flex>
  );
};

export default QuestionnaireSelect;
