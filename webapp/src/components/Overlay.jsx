import { Button, Stack } from "@chakra-ui/react";

import React from "react";
import {supabase} from "../supabaseClient"

export const Overlay = () => {
  return (<Stack style={styles.overlay}>
     <Button
   
        >
            UPRM Map
        </Button>
        <Button
        onClick={async ()=> {
            await supabase.auth.signOut()
        }}
        >
            Sign Out
        </Button>
  </Stack>)
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
};
