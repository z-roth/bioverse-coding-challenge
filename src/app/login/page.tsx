"use client";

import { useAuth } from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button, Container, Flex, Input, Label, Text } from "theme-ui";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (login(username, password)) {
      if (username === "admin") {
        router.push("/admin-panel");
      } else {
        router.push("questionnaire-select");
      }
    } else {
      alert("Failed to log in with provided credentials. Please try again.");
      setUsername("");
      setPassword("");
    }
  };

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
      <Text variant="heading1">Log In</Text>
      <Flex as="form" sx={{ flexDirection: "column" }} onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          id="username"
          mb={3}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          mb={3}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit">Submit</Button>
      </Flex>
    </Container>
  );
};

export default Login;
