import React from 'react'
import classNames from "classnames";
import {Container, Navbar, Nav} from "shards-react";
import NavUserActions from "./NavUserActions";
import NavSearch from "./NavSearch";
import Notifications from "./Notifications";

export const MainNavbar = () => {
    const classes = classNames(
        "main-navbar",
        "bg-white",
        "sticky-top"
    );

    return (
        <div className={classes}>
            <Container className="p-0">
                <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
                        <NavSearch/>

                        <NavUserActions/>


                    {/*
                    <Nav navbar className="border-left justify-content-center px-3">
                        <NavUserActions/>
                    </Nav>
                     */}


                    {/* <NavbarToggle /> */}
                </Navbar>
            </Container>
        </div>
    );
};

export default MainNavbar;