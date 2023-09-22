import { Button, Center, Input, Stack } from "@chakra-ui/react";

import React from "react";
import { supabase } from "../src/supabaseClient";

export const Authentication = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Center bg="gray.100" height="100vh" width="100vw">
      <Stack>
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={async () => {
            supabase.auth.signInWithPassword({ email, password });
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => {
            supabase.auth.signUp({ email, password });
          }}
        >
          Sign Up
        </Button>
      </Stack>
    </Center>
  );
};
