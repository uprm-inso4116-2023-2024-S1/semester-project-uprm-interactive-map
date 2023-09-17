import "./index.css";

import { Button, Center, Text } from "@chakra-ui/react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react";

import { Auth } from "@supabase/auth-ui-react";
import { Home } from "./screens/Home";
import { Overlay } from "./components/Overlay";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState(null);
  // change device pixel ratio when resizing the browser window
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  // following files are from the Unity build exporter for webgl
  const { unityProvider, loadingProgression, isLoaded, sendMessage } =
    useUnityContext({
      loaderUrl: "/Builds.loader.js",
      dataUrl: "/Builds.data.br",
      frameworkUrl: "/Builds.framework.js.br",
      codeUrl: "/Builds.wasm.br",
    });

 

  useEffect(() => {
    // We'll use the onAuthStateChange() method to listen for changes in
    // authentication state (e.g. signing in, signing out, etc.)
    supabase.auth.getSession().then(({ data: { session } }) => {
      // on build check if session has a registered user
      setSession(session);
      setEmail(session.user.email);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // while on webpage check if user has authenticated
      setSession(session);
      setEmail(session.user.email);
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
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
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
            >Loading... ({loadingPercentage}%)</Text>
          </Center>
        ):(
          
            //Overlay shows buttons on top of Unity webgl
            //Example button:
            // - Sign Out
            // - Show Email inside of Unity Text Object
           
        <Overlay
          session={session}
          sendMessage={sendMessage}
          unityProvider={unityProvider}

        />
        )
        }

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
