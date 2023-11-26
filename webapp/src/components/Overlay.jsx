import * as Courses from "../api/dbCourses";

import { Box, Button, Input, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import { supabase } from "../supabaseClient";

export const Overlay = (
  {sendMessage}
) => {
  // set email to null to prevent infinite loop
  const [email, setEmail] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
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
  function actionBuilding(buildingName){
    console.log("Building Name:", buildingName);
    sendMessage(buildingName, "MakeBuildingSelected", buildingName);
  }

  const handleSearch = async() => {
    // Handle search here (you can call a function or perform an API request)
    console.log("Search Query:", searchQuery);
    if(searchQuery === "biologia" || searchQuery === "Biologia"){
      // Add code to show the library
      actionBuilding("Biologia")
    } else{

      const result = await Courses.getCoursesMatchingString(searchQuery)
      setSearchResults(result)
    }
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
        <Sidebar
          sendMessage={sendMessage}
        />
      </Stack>


    <Stack
      direction={"row"}
      spacing={"5%"}
      height={"100%"}
      width={"100%"}
      style={styles.overlay}
    >
      {/* <Button>UPRM Interactive Map</Button> */}
      <Button
      borderRadius={10}
      marginBottom={5}
      ><img style={{width: 230, height: 50}} src="https://i.ibb.co/3sB25sy/Logo-removebg-preview.png" /></Button>
      <Button
      borderRadius={10}
      marginBottom={5}
        onClick={() => {
          showUserEmail();
        }}
      >
        Profile
      </Button>
      <Input
      borderRadius={10}
      marginBottom={5}
        type="text"
        tabIndex={0}
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      >
      </Input>
        

      <Button  borderRadius={10}
      marginBottom={5} onClick={handleSearch}>Search</Button>
      <Button
      borderRadius={10}
      marginBottom={5}
      
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Sign Out
      </Button>
          </Stack>
          {/* Search recomendations */}
          <Stack direction={"column"} spacing={"5%"} height={"100%"} width={"100%"} style={{
            position: "absolute",
            top: "15%",
            left: "45%",
            width: "10%",
            height: "10%",
            zIndex: "1",
          }}>
          
           {
              searchResults && searchResults.map((val, key) => {
                return (
                 <>
                 {/* Additioanl Inforamtion could be added to each course returned */}
                 <Button
                  borderRadius={10}
                  marginBottom={5}
                 
                  >{val.course_code} </Button>
                 </>
                )
              } )
              
           }
           {
            searchResults && searchResults.length > 0 ? (
              <Button borderRadius={10} onClick={
              () => setSearchResults(null)
           } > Close </Button>
            ) : null
           }
           
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
