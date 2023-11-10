import supabase from "../supabaseClient";

// supabase functions to comunicae with the database Courses table
// getCourses() returns all courses in the table
// getCourse() returns a single course in the table
// updateCourse() updates a single course in the table
// deleteCourse() deletes a single course in the table
// createCourse() creates a single course in the table

export async function getCourses() {
    return await supabase.from("Courses").select("*");
    }

export async function getCourseByCourseCode(id) {
    return await supabase.from("Courses").select("*").eq("course_code", id);
    }

export async function updateCourse(id, data) {
    return await supabase.from("Courses").update(data).eq("id", id);
    }