import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { WarningIcon } from "@chakra-ui/icons";
import { supabase } from "../supabaseClient";

export const Overlay = () => {
  // set email to null to prevent infinite loop
  const [email, setEmail] = React.useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [courseNameInput, setCourseNameInput] = useState("");
  const [courseCodeInput, setCourseCodeInput] = useState("");
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );
  const [userCourseList, setUserCourseList] = useState([]);
  // following files are from the Unity build exporter for webgl
  const { unityProvider, loadingProgression, isLoaded, sendMessage } =
    useUnityContext({
      loaderUrl: "/Builds.loader.js",
      dataUrl: "/Builds.data.unityweb.br",
      frameworkUrl: "/Builds.framework.js.unityweb",
      codeUrl: "/Builds.wasm.unityweb",
    });
  const loadingPercentage = Math.round(loadingProgression * 100); 
  const canvasRef = React.useRef(null);
  const [value, setValue] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(
    () => {
      // When page refreshes, fetch email and user data from session
      if (email === null) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          // on build check if session has a registered user
          setEmail(session.user.email);
          supabase
            .from("accounts")
            .select("*")
            .eq("email_address", session.user.email)
            .then(({ data: users, error }) => {
              if (error) {
                console.log(error);
              } else {
                console.log(users);
                if (users.length === 0) {
                  supabase
                    .from("accounts")
                    .insert([
                      {
                        email_address: session.user.email,
                        first_name: "test",
                        last_name: "test",
                      },
                    ])
                    .then(({ data: users, error }) => {
                      if (error) {
                        console.log(error);
                      } else {
                        // Verify if user has been added to accounts db
                        console.log(users);
                      }
                    });
                }
              }
            });
        });
      }
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    // run tick to check if email is null and get email from session
    [email, devicePixelRatio]
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
    <>
      <Stack
        direction={"row"}
        // spacing={"5%"}
        height={"8%"}
        margin={"1%"}
        width={"100%"}
        position={"absolute"}
        top={"0"}
        left={"0"}
        zIndex={10}
      >
        <Button borderRadius={10}>
          <img
            style={{ width: 230, height: 50 }}
            src="https://i.ibb.co/3sB25sy/Logo-removebg-preview.png"
          />
        </Button>
        <Menu>
          <MenuButton borderRadius={10} as={Button} rightIcon={<WarningIcon />}>
            Menu
          </MenuButton>
          <MenuList borderRadius={10}>
            <MenuItem
              borderStartStartRadius={10}
              borderStartEndRadius={10}
              ref={btnRef}
              onClick={onOpen}
              color="white"
            >
              Show API
            </MenuItem>
            <MenuItem
              onClick={() => {
                showUserEmail();
              }}
              color="white"
            >
              Show Email in Unity
            </MenuItem>
          </MenuList>

          <Input
            value={value}
            borderRadius={10}
            // ref={(input) => setValue(input)}
            borderColor={"transparent"}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            tabIndex={2}
            placeholder="Search ..."
            size="lg"
            // margin={'auto'}
          ></Input>

          {/* </FormControl> */}
          <Button borderRadius={10} onClick={() => handleSearch()}>
            Search
          </Button>
          <Button
            borderRadius={10}
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </Button>
        </Menu>
      </Stack>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create </DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <FormControl top={"50%"} left={"5%"} position={"absolute"}>
        <Stack>
          {/* input course name, course_code */}
          <Input
            onChange={(e) => {
              setCourseNameInput(e.target.value);
            }}
            placeholder="Course Name"
          />
          <Input
            onChange={(e) => {
              setCourseCodeInput(e.target.value);
            }}
            placeholder="Course Code"
          />
          <Button
            onClick={async () => {
              // Maybe adding courses can be a nested value in accounts not a new table
              await supabase
                .from("courses")
                .insert([
                  {
                    course_name: courseNameInput,
                    course_code: courseCodeInput,
                    account: email,
                  },
                ])
                .then(({ data: users, error }) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(users);
                  }
                });
            }}
            borderRadius={10}
          >
            Add Course
          </Button>
          <Button
            onClick={async () => {
              const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("account", email);
              if (error) {
                console.log(error);
              } else {
                console.log(data);
                setUserCourseList(data);
              }
            }}
            borderRadius={10}
          >
            Fetch courses
          </Button>
        </Stack>
      </FormControl>


{/* Unity is set to run in background and hidden until fully loaded */}
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        className="mapCanvas"
        ref={canvasRef}
        tabIndex={1}
        style={{
          visibility: isLoaded ? "visible" : "hidden",
          width: "100%",
          height: "100%",
          top: "0",

          zIndex: -100,
          left: "0",
          position: "absolute",
        }}
      />
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
    backgroundColor: "black",
    borderRadius: "10%",
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
  },
};
