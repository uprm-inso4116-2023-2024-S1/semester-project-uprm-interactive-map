import supabase from "../supabaseClient";

// supabase functions to comunicae with the database Buildings table
// getBuildings() returns all buildings in the table
// getBuilding() returns a single building in the table
// updateBuilding() updates a single building in the table
// deleteBuilding() deletes a single building in the table
// createBuilding() creates a single building in the table

export async function getBuildings() {
  return await supabase.from("Buildings").select("*");
} 

export async function getBuilding(id) {
    return await supabase.from("Buildings").select("*").eq("id", id);
    }
export async function updateBuilding(id, data) {
    return await supabase.from("Buildings").update(data).eq("id", id);
    }
export async function deleteBuilding(id) {
    return await supabase.from("Buildings").delete().eq("id", id);
    }
export async function createBuilding(data) {
    return await supabase.from("Buildings").insert(data);
    }
