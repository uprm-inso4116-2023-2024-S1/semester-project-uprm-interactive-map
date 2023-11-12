import {supabase} from "../supabaseClient";

// supabase functions to comunicae with the database Courses table
// updateCourse() updates a single course in the table
// deleteCourse() deletes a single course in the table
// createCourse() creates a single course in the table


// This method must be updated to follow the format of the other methods
export async function updateCourse(id, data) {
    return await supabase.from("Courses").update(data).eq("id", id);
    }


export async function getEnrolledCoursesByEmail(email) {
    /*
    This method returns the logged user enrolled courses. The days are an array of strings.

    The !inner hint is used to only return records associated
    with the given email address.
    More info: https://supabase.com/docs/reference/javascript/select?example=querying-foreign-table-with-inner-join
    */

    const {data, error} = await supabase
        .from('enrolled_courses')
        .select(`
            accounts!inner(email_address),
            courses!inner(course_code, section, days, time, professor, classroom_num, buildings(name))
        `)
        .eq('accounts.email_address', email)
        .eq('courses.is_valid', true)
        .eq('is_valid', true)

    if (error) {
        console.log(error)
        return
    }

    return data
}


