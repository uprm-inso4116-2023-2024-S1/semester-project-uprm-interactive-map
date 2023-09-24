import { Button, Stack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Sidebar from "./Sidebar";

export const Overlay = (
  {sendMessage}
) => {
  // set email to null to prevent infinite loop
  const [email, setEmail] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(
    () => {
      if (email === null) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          // on build check if session has a registered user
          setEmail(session.user.email);
        });
      }
    },
    // run tick to check if email is null and get email from session
    [email]
  );

  function showUserEmail() {
    // Function is called when button is clicked
    // emailText is the name of the GameObject in Unity
    // FetchEmail is the name of the function in Unity
    // email is the parameter passed to the function in Unity
    if (email !== null) {
      sendMessage("emailText", "FetchEmail", email);
    } else {
      return "Loading...";
    }
  }
  function handleSearch() {
    // Handle search here (you can call a function or perform an API request)
    console.log("Search Query:", searchQuery);
  }
  return (
    // horizontal stack of buttons

    <>

      <Stack
        direction={"col"}
        spacing={"100%"}
        height={"100%"}
        width={"100%"}
        style={styles.sidebar}
      >
        <Sidebar />
      </Stack>


    <Stack
      direction={"row"}
      spacing={"5%"}
      height={"100%"}
      width={"100%"}
      style={styles.overlay}
    >
      {/* <Button>UPRM Interactive Map</Button> */}
      <Button><img style={{width: 230, height: 50}} src="https://i.ibb.co/3sB25sy/Logo-removebg-preview.png" /></Button>
      <Button
        onClick={() => {
          showUserEmail();
        }}
      >
        Profile
      </Button>
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      >
      </Input>
      <Button onClick={() => handleSearch()}>Search</Button>
      <Button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Sign Out
      </Button>
          </Stack>
    </>
  );
};

const styles = {
  overlay: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "10%",
    height: "10%",
    zIndex: "1",
  },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    color: "white",
    fontSize: "1.5vw",
    fontWeight: "bold",
    border: "none",
    outline: "none",
  },
  sidebar: {
    position: "absolute",
    top: "15%",
    left: "5%",
    width: "10%",
    height: "10%",
    zIndex: "1",
  }
};
