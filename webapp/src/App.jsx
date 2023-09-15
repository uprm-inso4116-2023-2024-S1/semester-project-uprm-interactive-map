import "./index.css";

import { Fragment, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { Auth } from "@supabase/auth-ui-react";
import { Button } from "@chakra-ui/react";
import {Overlay} from "./components/Overlay";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);



export default function App() {
  const [session, setSession] = useState(null);

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  const { unityProvider, loadingProgression, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: "/Builds.loader.js",
    dataUrl: "/Builds.data.br",
    frameworkUrl: "/Builds.framework.js.br",
    codeUrl: "/Builds.wasm.br",
  });



  function handleClickSpawnEnemies() {
    sendMessage("DbFetch", "FetchEmail", "FetchEmail");
  }



  useEffect(() => {



    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

    return () => subscription.unsubscribe();
  }, [devicePixelRatio]);







  const loadingPercentage = Math.round(loadingProgression * 100);
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {









    
    return (
    <>
    <Fragment>
      
        {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      
        {/* <Overlay handleClickSpawnEnemies={handleClickSpawnEnemies} />
         */}
         <Button 
          onPress={handleClickSpawnEnemies}
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "10%",
            height: "10%",
            zIndex: "1",
          }}>
          UPRM Map
          </Button>
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        style={{ visibility: isLoaded ? "visible" : "hidden", width: "100%", height: "100%", top: "0", left: "0", position: "absolute" }}
      />

    </Fragment>
    </>

        
    );
  }
}
