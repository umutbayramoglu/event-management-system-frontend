import React, { Component } from 'react';
import { Sidebar } from "../components/sidebar/Sidebar";
import {MainNavbar} from "../components/navbar/MainNavbar";
import { Container, Col, Row } from "react-bootstrap";

const BaseLayout = ({ children }) => (

    <Container fluid>
        <Row>
            <Sidebar />

            <Col
                className="main-content p-0"
                lg={{ size: 10, offset: 2 }}
                md={{ size: 9, offset: 3 }}
                sm="12"
                tag="main"
            >
                <MainNavbar />
                {children}
            </Col>
        </Row>
    </Container>
);

export default BaseLayout;
