import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from "./../../setup/axios"
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import ReactMarkdown from 'react-markdown';
const HomePage = () => {
    const [blockConversation, setBlockConversation] = useState([])
    const [method, setMethod] = useState("")
    const [input, setInput] = useState("")
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const getOutput = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/code-explain/", {
                "_input": input,
                "_method": method
            }, {
                withCredentials: true,
            })
            console.log(response.data);
            if (response && response.data) {
                let current = blockConversation;
                current.push(response.data)
                setBlockConversation(current);
            }
            setIsLoading(false)
            setInput("");
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            toast.error(error);
        }
    }

    return (
        <Container style={{ backgroundColor: "#f0f0f0" }} className="vw-100 p-5 border border-2 rounded-2">
            <Row >
                <Nav activeKey="1" >
                    <NavDropdown title="Menu" id="nav-dropdown">
                        <NavDropdown.Item onClick={() => { navigate("/") }}>HomePage</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { navigate("/doc") }}>Doc</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Row>
            <Row className="border border-2 rounded-2 p-2">
                <div as={Col} md="12" style={{ minHeight: "30vh", maxHeight: "50vh", overflowY: "auto" }}>
                    {
                        isLoading === true &&
                        <>
                            <ClipLoader
                                color={"#000000"}
                                loading={isLoading}
                                // cssOverride={}
                                size={100}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            <div>
                                <span>Loading...</span>
                            </div>

                        </>

                    }

                    {
                        isLoading === false && blockConversation && blockConversation.length > 0 && blockConversation.map((message, index) => {
                            return (
                                <div key={index} >
                                    <div style={{ textAlign: "start" }}>
                                        <h5>You:</h5>
                                        <h6 style={{ textAlign: "justify" }}>{message._input}</h6>
                                    </div>

                                    {/* <span><h6>ASSISTANT:</h6> {message._output.split('\n').map((line, i) => (
                                        <span key={i}>{line}<br /></span>
                                    ))}</span> */}
                                    <div style={{ textAlign: "start" }}>
                                        <h5>Assistant: </h5>
                                        <ReactMarkdown style={{ textAlign: "justify" }}>{message._output}</ReactMarkdown>
                                    </div>

                                    {index != blockConversation.length - 1 && <hr />}

                                </div>

                            )
                        })
                    }


                </div>
                <hr />
                <div className="d-flex align-items-center p-2 " as={Col} md={12} >
                    <Form className="w-100 ">
                        <Form.Group  >
                            <Form.Control
                                as="textarea"
                                rows={1}
                                placeholder="chat here"
                                onChange={(e) => { setInput(e.target.value) }} value={input}
                            />
                        </Form.Group>
                    </Form>
                    <div className="mx-2 " >
                        <Form.Select aria-label="Default select example" onChange={(e) => { setMethod(e.target.value) }}>
                            <option value="" disabled selected>Open this select menu</option>
                            <option value="check grammar the sentence:">Grammar checking</option>
                            <option value="generate idea of sentence:">Generate idea</option>
                            <option value="translate to vietnamese:">Translate to Vietnamese</option>
                            <option value="translate to chinese:">Translate to Chinese</option>
                            <option value="translate to english:">Translate to English</option>
                            <option value="Summary this sentence:">Summary</option>
                            <option value="count total words:">Word count</option>
                            <option value="statistics of:">statistics</option>
                            <option value="Writing Templates and Examples:">Templates and Examples</option>
                            <option value="">Chat with AI</option>
                        </Form.Select>
                    </div>

                    <Button
                        variant="outline-success"
                        style={{ height: "100%" }}
                        className="d-flex justify-content-center align-items-center"
                        onClick={() => { getOutput() }} >
                        <span className="me-1">Send </span>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                </div>
            </Row>
        </Container>
    );
}

export default HomePage;