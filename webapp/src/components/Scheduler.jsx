import './Scheduler.css';
import './AddCourse'

import * as Accounts from "../api/dbAccounts"
import * as EnrolledCourses from "../api/dbEnrolledCourses"

import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { Box, Button, HStack, Icon, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

import AddCourse from "./AddCourse";
import { supabase } from '../supabaseClient';

function Scheduler({ closeScheduler }) {
    const [enrolled_courses, setEnrolledCourses] = useState(null);
    const [courseData, setCourseData] = useState([]);
    // const getData = () => {
    //     fetch('data.json',{
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then(function (response) {
    //         console.log(response)
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         console.log(myJson);
    //         setData(myJson)
    //     });
    // }
    useEffect(() => {
      ( async () => {
            if(enrolled_courses === null) {
            //    ADD Only get courses that are enrolled in
                const id = await Accounts.getLoggedUserAccountID() // Gets the email of the logged user
                const courses = await EnrolledCourses.getEnrolledCoursesByEmail(id)  
                console.log("Courses: ", courses);
                setEnrolledCourses(courses);
    
                const newCourseData = courses.map(course => course.courses); // map over the courses
                setCourseData(newCourseData); // set the entire new array at once
            }
        })();
    }, [enrolled_courses]);

    const [showAddModal, setAddModal] = useState(false);

    function openAddModal() {
        setAddModal(true);
    }

    function closeAddModal() {
        setAddModal(false);
    }


    return (<Box
        
    >
        <Box
        style={{
            top: '50%',
            zIndex: '100',
            backgroundColor: 'white',
            position: 'absolute',
            margin: '10px',
            padding: '10px',
            borderRadius: '10px',
        }}>
            <div className="header">
                <div className="closebtn"> 
                    <IconButton icon={<AiOutlineClose />} onClick={closeScheduler} />
                </div>
                <h1>Enrolled Courses</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Class code</th>
                            <th>Section</th>
                            <th>Days</th>
                            <th>Time</th>
                            <th>Professor</th>
                            <th>Building</th>
                            <th>Classroom</th>
                        </tr>
                        {
                            enrolled_courses && enrolled_courses.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.courses.course_code}</td>
                                    <td>{item.courses.section}</td>
                                    <td>{item.courses.days}</td>
                                    <td>{item.courses.time}</td>
                                    <td>{item.courses.professor}</td>
                                    <td>{item.courses.buildings.name}</td>
                                    <td>{item.courses.classroom_num}</td>
                                    {/* drop out buton */}
                                    <td>
                                        {/* <Button borderRadius={10} className="dropCourse"> */}
                                        <IconButton
                                            p={3}
                                            size={"md"}
                                            borderRadius={10}

                                         icon={<AiOutlineDelete />} onClick={ async () => {

                                            await EnrolledCourses.unenrollCourseByAccoutnIdAndCourseCode(item.accounts.account_id, item.courses.course_id)
                                            
                                         }
                                            
                                         } />
                                        {/* </Button> */}
                                     </td>
                                </tr>
                            ))
                        }
                        {/* {
                            courseData && courseData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.course_code}</td>
                                    <td>{item.section}</td>
                                    <td>{item.days}</td>
                                    <td>{item.time}</td>
                                    <td>{item.professor}</td>
                                    <td>{item.buildings.name}</td>
                                    <td>{item.classroom_num}</td>
                                </tr>
                            ))
                        } */}
                    </tbody>
                </table>
               <HStack margin={5} >
               <Button borderRadius={10} className="addCourse" onClick={openAddModal}>Add Course</Button>
                <Button borderRadius={10} className="deleteCourse">Delete Course</Button>
               </HStack>
            </div>
        </Box>
        {showAddModal && (< AddCourse closeAddModal={closeAddModal} />)}
     </Box>)
}

export default Scheduler