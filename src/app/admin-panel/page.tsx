"use client";

import { useState } from "react";
import { Button, Container, Flex, Text } from "theme-ui";
import UsersList from "./UsersList";
import UserModal from "./UserModal";
import { useAuth } from "@/auth/useAuth";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

const AdminPanel: React.FC = () => {
  useProtectedRoute(true);
  const [selectedUser, setSelectedUser] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const { logout } = useAuth();

  const onUserSelect = (username: string) => {
    setSelectedUser(username);
    setModalOpen(true); // Open the modal when a user is selected
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setSelectedUser(undefined); // Reset the selected user
  };

  return (
    <Container
      sx={{
        pt: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Text variant="heading1">Admin Panel</Text>
      <Flex sx={{ flexDirection: "column", width: "100%" }}>
        <Flex sx={{ width: "100%", justifyContent: "space-between" }}>
          <Text variant="heading3">Username</Text>
          <Text variant="heading3">Questionnaires Completed</Text>
        </Flex>
        <UsersList onUserSelect={onUserSelect} />
      </Flex>
      <UserModal
        open={modalOpen}
        onClose={closeModal}
        username={selectedUser}
      />
      <Button variant="primary" onClick={logout}>
        Log out
      </Button>
    </Container>
  );
};

export default AdminPanel;
