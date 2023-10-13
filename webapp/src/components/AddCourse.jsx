import './AddCourse.css';
import { IconButton, Input } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from 'react';
import Select from "react-select";


function AddCourse({ closeAddModal }) { 

    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [time, setTime] = useState("");
    const [classCode, setClassCode] = useState("");
    const [professor, setProfessor] = useState("");

    useEffect(() => {
        const days = [
            { name: "days", value: "Monday", label: "Monday" },
            { name: "days", value: "Tuesday", label: "Tuesday" },
            { name: "days", value: "Wednesday", label: "Wednesday" },
            { name: "days", value: "Thursday", label: "Thursday" },
            { name: "days", value: "Friday", label: "Friday" },
            { name: "days", value: "Saturday", label: "Saturday" },
        ];

        const buildings = [
            { name: "building", value: "Biblioteca General", label: "Biblioteca General" },
            { name: "building", value: "Luis Stefani", label: "Luis Stefani" },
            { name: "building", value: "Biologia", label: "Biologia" },
            { name: "building", value: "Fisica, Geologia y Ciencias", label: "Fisica, Geologia y Ciencias" },
            { name: "building", value: "Ingenieria Industrial", label: "Ingenieria Industrial" },
            { name: "building", value: "Quimica", label: "Quimica" },
            { name: "building", value: "Luis Celis", label: "Luis Celis" },
            { name: "building", value: "Arte", label: "Arte" },
            { name: "building", value: "Esteban Terrats", label: "Esteban Terrats" },
            { name: "building", value: "Oficinas", label: "Oficinas" },
            { name: "building", value: "Centro de Estudiantes", label: "Centro de Estudiantes" },
            { name: "building", value: "ROTC/Sanchez Saliva", label: "ROTC/Sanchez Saliva" },
            { name: "building", value: "Sanchez Hidalgo", label: "Sanchez Hidalgo" },
        ];  

        setDays(days);
        setSelectedDays([]);
        setBuildings(buildings);
        setSelectedBuildings("");
    }, []);

    const onDaysOptionChange = (options) => {
        setSelectedDays(options);
    };

    const onBuildingsOptionChange = (options) => {
        setSelectedBuildings(options);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var days_string = "";
        var keys = Object.keys(selectedDays);
        for (var i = 0; i < keys.length; i++) {
            days_string += selectedDays[keys[i]].value;
            days_string += (i < keys.length - 1) ? ', ' : '';
        }
        var output_json = {
            ClassCode: classCode,
            Time: time,
            Days: days_string,
            Professor: professor,
            Building: selectedBuildings?.value || ""
        }
        alert(JSON.stringify(output_json)); // Here you send it to the backend with a post method instead of just showing it
    }

    return (<div>
        <div className="addCourseModal">
            <div className="header">
                <div className="closebtn">
                    <IconButton icon={<AiOutlineClose />} onClick={closeAddModal} />
                </div>
                <h1>Add Course</h1>
                <form onSubmit={handleSubmit}>
                    <label>Class Code:
                        <input
                            type="text"
                            name="classCode"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Time:
                        <input
                            type="time"
                            name="time"
                            min="07:00"
                            max="18:00"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>Days:
                        <Select
                            isMulti
                            isClearable={false}
                            className="days"
                            options={days}
                            value={selectedDays}
                            onChange={onDaysOptionChange}
                        />
                    </label>
                    <br />
                    <label>Professor:
                        <input
                            type="text"
                            name="professor"
                            value={professor || ""}
                            onChange={(e) => setProfessor(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Building:
                        <Select
                            isClearable={false}
                            className="building"
                            options={buildings}
                            value={selectedBuildings}
                            onChange={onBuildingsOptionChange}
                        />
                    </label>
                    <br />
                    <input type="submit" />
                </form>
            </div>
        </div>
    </div>)
}

export default AddCourse;