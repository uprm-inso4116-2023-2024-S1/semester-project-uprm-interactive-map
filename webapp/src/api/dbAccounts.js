import {supabase} from "../supabaseClient";

// supabase functions to comunicae with the database Courses table
// getCourses() returns all courses in the table
// getCourse() returns a single course in the table
// updateCourse() updates a single course in the table
// deleteCourse() deletes a single course in the table


export async function getAccountByEmail(args) {
    
    // The following returns a list of dictionaries, the keys are the name of the columns
    console.log(args['email'])
    const {data, error} = await supabase
        .from('accounts')
        .select('email_address')
        .eq('email_address', args['email'])
    
    console.log('response', data)
    if (error) {
        console.log(error)
        return
    }

    return data
}

export async function getLoggedUserAccountID() {

    const email = await getLoggedUserEmailAddress()
    const {data, error} = await supabase
        .from('accounts')
        .select('account_id')
        .eq('email_address', email)
    
    if (error) {
        console.log(error)
        return
    }

    return data[0]?.account_id
}

export async function addNewAccount(args) {
    /*
    This methods adds a new user to the table of accounts. 
    

    MUST CHANGE: change the dummy inputs for the first_name and las_name with args['first_name'], args['last_name']
    when the front end provides a way for the user to give this information at register.
    */

    const {error} = await supabase
        .from('accounts')
        .insert({
            first_name: 'dummy_firstname',
            last_name: 'dummy_lastname',
            email_address: args['email'],
            password: args['password']
        })

    if (error) {
        console.log(error)
    }

    return
}

export async function getLoggedUserEmailAddress() {
    /*
    This method returns the email address from the logged.
    Could prove to be useful to retrieve information from 
    the database of the user.
    */

    const {data, error} = await supabase.auth.getUser()

    if (error){
        console.log(error)
        return
    }
    return data.user.email
}
