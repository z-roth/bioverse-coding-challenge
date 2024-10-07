import { PropsWithChildren } from "react";
import { Box, Flex, Text } from "theme-ui";

interface QuestionBoxProps extends PropsWithChildren {
  title: string;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  children,
  title,
}) => {
  return (
    <Flex
      sx={{
        borderRadius: 8,
        border: "1px solid grey",
        px: 3,
        py: 3,
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Text variant="heading3">{title}</Text>
      <Box>{children}</Box>
    </Flex>
  );
};
