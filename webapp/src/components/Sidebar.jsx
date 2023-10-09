import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Box, List, ListItem } from "@chakra-ui/react";
import './Scheduler'
import Scheduler from "./Scheduler";

const buildingsInfo = [
    {
        Name: "Biblioteca General",
        Info: "Information"
    },
    {
        Name: "Stefani",
        Info: "Information"
    },
    {
        Name: "Biologia",
        Info: "Information"
    },
    {
        Name: "Fisica",
        Info: "Information"
    },
]

export default function Sidebar() {
    const [showBox, setShowBox] = useState(
        Array(buildingsInfo.length).fill(false)
    );
    const [showScheduler, setShowScheduler] = useState(false);

    function handleButtonClick(index){
        const newArray = [...showBox];
        newArray[index] = !newArray[index];
        setShowBox(newArray);
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
        <Accordion.Header>Building</Accordion.Header>
        <Accordion.Body>

            <List>
                {buildingsInfo.map((item, index) => (
                    <ListItem key={index}>
                    <Button onClick={() => handleButtonClick(index)} width={"100%"}>{item.Name}</Button>
                    {showBox[index] && (
                        <Box
                            width="100%"
                            height="auto"
                            backgroundColor="black"
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


