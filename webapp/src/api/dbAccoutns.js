import supabase from "../supabaseClient";

// supabase functions to comunicae with the database Courses table
// getCourses() returns all courses in the table
// getCourse() returns a single course in the table
// updateCourse() updates a single course in the table
// deleteCourse() deletes a single course in the table


export async function getAccountByEmail(email) {
    return await supabase.from("Accounts").select("*").eq("email_address", email);
    }

