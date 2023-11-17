import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Box, List, ListItem } from "@chakra-ui/react";
import './Scheduler'
import Scheduler from "./Scheduler";
import buildingsInfo from "./Buildings.data";
import "./Sidebar.css";

export default function Sidebar({ sendMessage }) {
    const [showBox, setShowBox] = useState(
        Array(buildingsInfo.length).fill(false)
    );
    const [showScheduler, setShowScheduler] = useState(false);

    function handleButtonClick(index){
        const newArray = [...showBox];
        newArray[index] = !newArray[index];
        setShowBox(newArray);
        sendMessage("SelectionManager", "MakeBuildingSelected", buildingsInfo[index].Abrev);
    }

    function deselectAllBuildings() {
        sendMessage("SelectionManager", "DeselectAllBuildings");
    }

    function openScheduler() {
        setShowScheduler(true);
    }

    function closeScheduler() {
        setShowScheduler(false);
    }

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header className="accordion-header">Building</Accordion.Header>
        <Accordion.Body className="accordion-body">

            <List>
                <Button onClick={deselectAllBuildings} width={"100%"}>Deselect All Buildings</Button>
                {buildingsInfo.map((item, index) => (
                    <ListItem key={index}>
                    <Button onClick={() => handleButtonClick(index)} width={"100%"}>{item.Name}</Button>
                    {showBox[index] && (
                        <Box
                            width="100%"
                            height="auto"
                            backgroundColor="#1a1a1a"
                            color="white"
                        >
                            <p>{item.Info}</p>
                        </Box>
                    )}
                    </ListItem>
                ))}
            </List>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Schedule</Accordion.Header>
         <Accordion.Body> 
            <Button 
                colorScheme="blue"
                backgroundColor="Green" 
                onClick={openScheduler}
            >
                Add courses
            </Button>

            {showScheduler && (
                <Scheduler
                    closeScheduler={closeScheduler}
                />
            )}

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}


