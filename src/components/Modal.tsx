import React from "react";
import { Box, Text, Flex } from "theme-ui";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        color: "black",
      }}
    >
      <Flex
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          width: "90%",
          maxWidth: "600px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          flexDirection: "column",
        }}
      >
        <Text
          sx={{
            width: 24,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          X
        </Text>
        {children}
      </Flex>
    </Box>
  );
};

export default Modal;
