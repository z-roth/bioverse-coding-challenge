import { Flex, Text } from "theme-ui";

interface UserRowProps {
  user: string;
  questionnairesCompleted: number;
  onClick: () => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  questionnairesCompleted,
  onClick,
}) => (
  <Flex
    sx={{
      justifyContent: "space-between",
      padding: 2,
      border: "1px solid grey",
      borderRadius: 4,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Text>{user}</Text>
    <Text>{questionnairesCompleted}</Text>
  </Flex>
);

export default UserRow;
