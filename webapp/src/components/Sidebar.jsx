import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Box, List, ListItem } from "@chakra-ui/react";

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

    const handleButtonClick = (index) => {
        const newArray = [...showBox];
        newArray[index] = !newArray[index];
        setShowBox(newArray);
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
        <Accordion.Body>------------</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}


