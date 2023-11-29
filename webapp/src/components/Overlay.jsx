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

  const handleSearch = async() => {
    // Handle search here (you can call a function or perform an API request)
    sendMessage("SelectionManager", "DeselectAllBuildings")
    // if string contains Stefani
    if(searchQuery === "Stefani"){
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Stefani')
  } else if (searchQuery === "Biblioteca"){
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Biblioteca')
  } else if (searchQuery === "Luis"){
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Luis')
  }
  else if (searchQuery === "Chardon"){
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Chardon')
  }
  else if (searchQuery === "ROTC"){
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'ROTC/')
  }   else if (searchQuery === "Centro"){
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Centro')
  }     else if (searchQuery === "Quimica") {
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Quimica')
  }  else if (searchQuery === "Fisica") {
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Fisica')
  } else if (searchQuery === "Hidalgo") {
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Hidalgo')
  } else if (searchQuery === "Oficinas") {
    console.log("Search Query:", searchQuery);
    sendMessage("SelectionManager", "MakeBuildingSelected", 'Oficinas')
  }
  
  else{
    const str = searchQuery;
    const searchQueryTrimmed = str.replaceAll(' ', ''); // Decided to cut spaces on the search Query in order to make sure that it can search for ie.  PSIC3002 and PSIC 3002.
    const result = await Courses.getCoursesMatchingString(searchQueryTrimmed)
    setSearchResults(result)
  }
  }
  function HelpBtn() {
    alert("Here's some of the button's functionalities: \nUPRM Interactive Map: Coming soon! \nShow Email: Displays your email on screen \nSign Out: Signs you out and returns you to the home page");
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
      <Button
         borderRadius={10}
      marginBottom={5}
       onClick={() => {
          HelpBtn();
        }}>Help
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
