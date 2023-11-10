import "./index.css";

import { useEffect, useState } from "react";

import { Authentication } from "../screens/Authentication";
import { Overlay } from "./components/Overlay";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);


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

  }, []);

  if (!session) {
    // if user has no active session redirect to user authentication
    return <Authentication />;
  } else {
    return (
      <>
        <Overlay
          session={session}
        />
      </>
  
    );
  }
}
