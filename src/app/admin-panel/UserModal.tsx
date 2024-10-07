import Modal from "@/components/Modal";
import useUserAnswers from "@/data/useUserAnswers";
import { Box, Flex, Spinner, Text } from "theme-ui";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  username: string | undefined;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, username }) => {
  const { data: answers, loading, error } = useUserAnswers(username);

  return (
    <Modal open={open} onClose={onClose}>
      <Flex sx={{ p: 4, alignItems: "center", flexDirection: "column" }}>
        <Text variant="heading2">User Questionnaires</Text>
        {loading && <Spinner />}
        {error && <Text>Error loading user answers.</Text>}
        {answers && answers.length > 0 ? (
          <Box>
            {answers.map((q, idx) => (
              <Box sx={{ paddingY: 2 }} key={idx}>
                <Text
                  sx={{ fontWeight: "bold", paddingBottom: 2 }}
                >{`${username} - ${q.questionnaireName}`}</Text>
                <Flex sx={{ flexDirection: "column", gap: 3 }}>
                  {/* // more issues with typing from supabase*/}
                  {q.answers.map((answer: any, i) => (
                    <Flex key={i} sx={{ flexDirection: "column", gap: 1 }}>
                      <Text>
                        <Text sx={{ fontWeight: "bold" }}>{`Q: `}</Text>
                        {`${answer.question.question}`}
                      </Text>
                      <Text>
                        <Text sx={{ fontWeight: "bold" }}>{`A: `}</Text>
                        {`${answer.answer}`}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            {!loading && <Text>No questionnaires found for this user.</Text>}
          </Box>
        )}
      </Flex>
    </Modal>
  );
};

export default UserModal;
