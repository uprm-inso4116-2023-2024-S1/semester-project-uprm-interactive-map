import { useEffect, useState } from "react";

import { Unity } from "react-unity-webgl";
import {supabase} from "../supabaseClient";

export function Home({
    unityProvider,
    loadingProgression,
    isLoaded,
    sendMessage,
    
}) {
    return(
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
    )
}