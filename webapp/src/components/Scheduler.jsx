import './Scheduler.css';
import './AddCourse'

import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';

import AddCourse from "./AddCourse";
import { AiOutlineClose } from "react-icons/ai";
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
                const query = await supabase.from("enrolled_courses").select("*")
                setEnrolledCourses(query.data)
                // for each item in courses
                // get the course data
                for (let i = 0; i < query.data.length; i++) {
                    const course = query.data[i];
                    const courseQuery = await supabase.from("courses").select("*").eq("course_id", course.course_id)
                    setCourseData([
                        ...courseData,
                        courseQuery.data[0]
                    ])
                    console.log(courseData)
                }
            }
        }
      )()
    }
    , [courseData, enrolled_courses]);
 

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
                            <th>Time/Days</th>
                            <th>Professor</th>
                            <th>Building</th>
                            <th>Classroom</th>
                        </tr>
                        {
                            courseData && courseData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.course_code}</td>
                                    <td>{item.section}</td>
                                    <td>{'--:--:--'}</td>
                                    <td>{'--:--:--'}</td>
                                    <td>{item.building_id}</td>
                                    <td>{item.classroom_num}</td>
                                </tr>
                            ))
                        }
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