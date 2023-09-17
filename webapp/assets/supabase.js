import { useEffect, useState } from "react";

import { Unity } from "react-unity-webgl";
import { createClient } from "@supabase/supabase-js";

// create database supabase client connection
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

    

export { supabase };