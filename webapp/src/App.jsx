import "./index.css";

import { Center, Text } from "@chakra-ui/react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react";

import { Authentication } from "../screens/Authentication";
import { Overlay } from "./components/Overlay";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  // change device pixel ratio when resizing the browser window
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  // following files are from the Unity build exporter for webgl
  const { unityProvider, loadingProgression, isLoaded, sendMessage } =
    useUnityContext({
      loaderUrl: "/Builds.loader.js",
      dataUrl: "/Builds.data.unityweb",
      frameworkUrl: "/Builds.framework.js.unityweb",
      codeUrl: "/Builds.wasm.unityweb",
    });

  useEffect(() => {
    // We'll use the onAuthStateChange() method to listen for changes in
    // authentication state (e.g. signing in, signing out, etc.)
    supabase.auth.getSession().then(({ data: { session } }) => {
      // on build check if session has a registered user
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // while on webpage check if user has authenticated
      setSession(session);
    });

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
  }, [devicePixelRatio]);

  const loadingPercentage = Math.round(loadingProgression * 100);
  if (!session) {
    // if user has no active session redirect to user authentication
    return <Authentication />;
  } else {
    return (
      <>
        {isLoaded === false ? (
          // We'll conditionally render the loading overlay if the Unity
          // Application is not loaded.
          <Center
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            left="0"
            backgroundColor="black"
          >
            <Text
              color="white"
              fontSize="xl"
              fontWeight="bold"
              textAlign="center"
            >
              Loading... ({loadingPercentage}%)
            </Text>
          </Center>
        ) : (
          //Overlay shows buttons on top of Unity webgl
          //Example button:
          // - Sign Out
          // - Show Email inside of Unity Text Object

          <Overlay
            session={session}
            sendMessage={sendMessage}
            unityProvider={unityProvider}
          />
        )}

        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={devicePixelRatio}
          style={{
            visibility: isLoaded ? "visible" : "hidden",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            position: "absolute",
          }}
        />
      </>
    );
  }
}
