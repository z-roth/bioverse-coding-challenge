import { Flex, Spinner, Text } from "theme-ui";
import UserRow from "./UserRow";
import useUsersQuestionnairesCompleted from "@/data/useUsersQuestionnairesCompleted";

const UsersList: React.FC<{ onUserSelect: (username: string) => void }> = ({
  onUserSelect,
}) => {
  const { data: users, loading, error } = useUsersQuestionnairesCompleted();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error loading users.</Text>;
  }

  if (users.length == 0) {
    return <Text>No users have completed a questionnaire.</Text>;
  }

  return (
    <Flex sx={{ flexDirection: "column", gap: 2 }}>
      {users.map((user) => (
        <UserRow
          key={user.username}
          user={user.username}
          questionnairesCompleted={user.questionnairesCompleted}
          onClick={() => onUserSelect(user.username)}
        />
      ))}
    </Flex>
  );
};

export default UsersList;
