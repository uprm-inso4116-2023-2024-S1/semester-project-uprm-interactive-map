import './Scheduler.css';
import { IconButton } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import './AddCourse'
import AddCourse from "./AddCourse";

function Scheduler({ closeScheduler }) {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch('data.json',{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            setData(myJson)
        });
    }
    useEffect(() => {
        getData()
    }, [])

    const [showAddModal, setAddModal] = useState(false);

    function openAddModal() {
        setAddModal(true);
    }

    function closeAddModal() {
        setAddModal(false);
    }

    return (<div>
        <div className="scheduler">
            <div className="header">
                <div className="closebtn"> 
                    <IconButton icon={<AiOutlineClose />} onClick={closeScheduler} />
                </div>
                <h1>Course Schedule</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Class code</th>
                            <th>Time</th>
                            <th>Days</th>
                            <th>Professor</th>
                            <th>Building</th>
                            <th>Classroom</th>
                        </tr>
                        {data && data.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.ClassCode}</td>
                                    <td>{val.Time}</td>
                                    <td>{val.Days}</td>
                                    <td>{val.Professor}</td>
                                    <td>{val.Building}</td>
                                    <td>{val.Classroom}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="addCourse" onClick={openAddModal}>Add Course</button>
                <button className="deleteCourse">Delete Course</button>
            </div>
        </div>
        {showAddModal && (< AddCourse closeAddModal={closeAddModal} />)}
     </div>)
}

export default Scheduler