import 'bootstrap/dist/css/bootstrap.min.css';
import './Scheduler'

import { AccordionButton, Box, Button, List, ListItem } from "@chakra-ui/react";
import React, { useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import Scheduler from "./Scheduler";
import buildingsInfo from "./Buildings.data";

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
    <>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Building</Accordion.Header>
        <Accordion.Body>

            <List>
                <Button onClick={deselectAllBuildings} width={"100%"}>Deselect All Buildings</Button>
                {buildingsInfo.map((item, index) => (
                    <ListItem key={index}>
                    <Button onClick={() => handleButtonClick(index)}
                        backgroundColor={showBox[index] ? "lightblack" : "grey"}
                     width={"100%"}>{item.Name}</Button>
                    {showBox[index] && (
                        <Box
                            width="100%"
                            height="auto"
                            backgroundColor="white"
                            color="black"
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
                Open Schedule
            </Button>

          

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
     {showScheduler && (
        <Scheduler
            closeScheduler={closeScheduler}
        />
    )}
</>
  );
}


