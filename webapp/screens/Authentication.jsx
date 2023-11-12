import { Button, Center, Input, Stack } from "@chakra-ui/react";
//import "webapp/screens/Authetication.css"
import React from "react";
import { supabase } from "../src/supabaseClient";
import "./HomePage.css";
import * as Accounts from "../src/api/dbAccounts"


export const Authentication = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {

    // Verify if user is registered
    const result = await Accounts.getAccountByEmail({email})
    if (result.length > 0) {
        alert("User already registered")
        console.log("User already registered")
    }

    // Register user if it is not already
    else{
      try {
        Accounts.addNewAccount({email, password})
        await supabase.auth.signUp({email, password})

      } 
      catch (error) {
        alert(error)
      }

    }

  }

  return (
    <Center bg="#4D7E3E" height="100vh" width="100vw">
      <Stack spacing={4} align="center" maxWidth="1200px" width="100%">
        
        {/* For the "Welcome to" text */}
        <Center>
          <div style={{textAlign: 'center', color: 'white', fontSize: 96, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
            Welcome to
          </div>
        </Center>

        {/* For the image */}
        <Center>
          <img style={{width: 931, height: 151}} src="https://i.ibb.co/3sB25sy/Logo-removebg-preview.png" />
        </Center>
        
        {/* For the input fields and buttons */}
        <Center>
          <Stack spacing={2}>
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
            <Button onClick={async () => supabase.auth.signInWithPassword({ email, password })}>
              Sign In
            </Button>
            <Button onClick={handleRegister}>
              Sign Up
            </Button>
          </Stack>
        </Center>
        
        {/* For the detailed mission text */}
        <Center>
          <div style={{textAlign: 'justify', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>
          <br /><br /><br /><br /><br />
          At our core, our mission is to empower new students in their educational journey by providing them with a seamless and intuitive means to navigate the university campus. We are dedicated to enhancing the collegiate experience, ensuring that every student, regardless of their background or familiarity with the campus, feels confident and at ease while exploring their academic surroundings. By simplifying campus navigation, we aspire to foster a sense of belonging, reduce stress, and ultimately contribute to the academic success and personal growth of each student who embarks on this exciting new chapter of their lives.
          </div>
        </Center>
      </Stack>
    </Center>
  );
};