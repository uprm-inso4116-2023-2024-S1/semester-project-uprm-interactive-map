import {supabase} from "../supabaseClient";

// supabase functions to comunicae with the database Courses table
// updateCourse() updates a single course in the table
// deleteCourse() deletes a single course in the table
// createCourse() creates a single course in the table


// This method must be updated to follow the format of the other methods
export async function updateCourse(id, data) {
    return await supabase.from("Courses").update(data).eq("id", id);
    }


export async function getEnrolledCoursesByEmail(id) {
    /*
    This method returns the logged user enrolled courses. The days are an array of strings.

    The !inner hint is used to only return records associated
    with the given email address.
    More info: https://supabase.com/docs/reference/javascript/select?example=querying-foreign-table-with-inner-join
    */

    const {data, error} = await supabase
        .from('enrolled_courses')
        .select(`
            accounts!inner(account_id),
            courses!inner(course_id, course_code, section, days, time, professor, classroom_num, buildings(name))
        `)
        .eq('accounts.account_id', id)
        .eq('courses.is_valid', true)
        .eq('is_valid', true)

    if (error) {
        console.log(error)
        return
    }

    return data
}

export async function unenrollCourseByAccoutnIdAndCourseCode(account_id, course_code) {
    /*
    This method unenrolls a course from the logged user.
    */

    const {data, error} = await supabase
        .from('enrolled_courses')
        .update({is_valid: false})
        .eq('account_id', account_id)
        .eq('course_id', course_code)

    if (error) {
        console.log(error)
        return
    }

    return data
}


