import Modal from "@/components/Modal";
import useUserAnswers from "@/data/useUserAnswers";
import { Box, Flex, Text } from "theme-ui";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  username: string | undefined;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, username }) => {
  const { data: answers, loading, error } = useUserAnswers(username);

  console.log(answers);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4 }}>
        <Text variant="heading2">User Questionnaires</Text>
        {loading && <Text variant="heading3">Loading...</Text>}
        {error && <Text variant="heading3">Error loading user answers.</Text>}
        {answers && answers.length > 0 ? (
          <Box>
            {answers.map((q, idx) => (
              <Box sx={{ paddingY: 2 }} key={idx}>
                <Text
                  sx={{ fontWeight: "bold" }}
                >{`${username} - ${q.questionnaireName}`}</Text>
                <Flex sx={{ flexDirection: "column", gap: 1 }}>
                  {/* // more issues with typing from supabase*/}
                  {q.answers.map((answer: any, i) => (
                    <Text key={i}>
                      {`Q: ${answer.question.question} A: ${answer.answer}`}
                    </Text>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>No questionnaires found for this user.</Text>
        )}
      </Box>
    </Modal>
  );
};

export default UserModal;
