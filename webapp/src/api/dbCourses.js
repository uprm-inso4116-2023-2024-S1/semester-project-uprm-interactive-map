import { supabase } from "../supabaseClient";
import * as Accounts from "../api/dbAccounts"

// supabase functions to comunicae with the database Courses table
// getCourses() returns all courses in the table
// getCourse() returns a single course in the table
// updateCourse() updates a single course in the table
// deleteCourse() deletes a single course in the table
// createCourse() creates a single course in the table

export async function getCourses() {
    /*
    This method returns all the courses stored currently in the database.
    It also provides the name of the building associated with each course.
    */

    const {data, error} = await supabase
        .from("courses")
        .select(`
            course_code,
            section,
            classroom_num,
            days,
            time,
            professor,
            buildings(name)

        `)
        .eq('is_valid', true)
    
    if (error){
        console.log(error)
        return
    }

    return data
    }

export async function getCourseByCourseCode(id) {
    /*
    This method returns the course matchign the given course code,
    beaware that the course code provided must match exactly the 
    course code in the database. A common mistake could be providing
    'ININ4015' to retreive 'ININ 4015' which has a whitespace as is 
    stored in the database.
    */

    const {data, error} =  await supabase
        .from("courses")
        .select(`
            course_code,
            section,
            classroom_num,
            days,
            time,
            professor,
            buildings(name)
        `)
        .eq("course_code", id)
        .eq("is_valid", true)

    if (error) {
        console.log(error)
        return
    }

    return data
    }



export async function getCoursesMatchingString(args) {
    /*
    This method returns the first three courses code containing the given case insensitive pattern.

    The 'ilike' method is use to find strings that contains a given case insensitive pattern.
    More information: https://supabase.com/docs/reference/javascript/ilike#:~:text=Response-,Column%20matches%20a%20case%2Dinsensitive%20pattern,-Match%20only%20rows
    */

    const {data, error} = await supabase
        .from('courses')
        .select('course_code')
        .ilike('course_code', '%'+args+'%')
        .limit(3)
        .eq('is_valid', true)


    if (error) {
        console.log(error)
        return
    }
    return data
}



export async function deleteCourseByCourseCode(course_code) {
    /*
    This method soft deletes a course from the database.
    A soft delete sets the is_valid attribute of the record
    to false. This only works if all the other methods retreive
    only the records with the is_valid attribute set to true.
    
    WARNING: Hard Deletes should not be used.
    */

    const {error} = await supabase
        .from('courses')
        .update({is_valid: false})
        .eq('course_code', course_code)

    if (error) {
        console.log(error)
    }

    return
}



export async function addNewCourse(args) {
    /*
    This method adds a new course to the courses table.
    Arguments must be provided as a dict with the following
    format:
    {
        "course_code" : value,
        "section" : value,
        "classroom_num" : value,
        "time" : value,
        "days" : value,
        "professor" : value,
        "building_id" : value
    }
    */

    console.log("Args: ", args)
    const {data, error1} = await supabase
        .from('courses')
        .insert({
            course_code: args['course_code'],
            section: args['section'],
            classroom_num: args['classroom_num'],
            time: args['time'],
            days: args['days'],
            professor: args['professor'],
            building_id: args['building_id']
        })
        .select('course_id')

    if (error1) {
        console.log(error1)
    }

    const account_id = await Accounts.getLoggedUserAccountID()
    const {error2} = await supabase
        .from('enrolled_courses')
        .insert({
            account_id: account_id,
            is_valid: true,
            course_id: data[0]?.course_id
        })
    
    if (error2) {
        console.log(error2)
    }
    
    return 
}