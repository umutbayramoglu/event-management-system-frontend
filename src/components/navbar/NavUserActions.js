import React, {Component} from 'react'
import {Link} from "react-router-dom";
import CreatedEventsView from "../../views/CreatedEventsView"

import {
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    NavItem,
    NavLink, Nav
} from "shards-react";
import {connect} from 'react-redux';
import {logout} from "../../redux/actions/UserActions/LoginActions"
import {withRouter} from "react-router"
import Notifications from "./Notifications";


export class NavUserActions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actionsVisible: false
        };
    }

    toggleActionsMenu = () => {
        this.setState({
                actionsVisible: !this.state.actionsVisible
            }
        );
    }

    handleLogout = () => {
        this.props.logout(this.props.history);
    }

    render() {
        const {isLoggedIn} = this.props;
        return (
            <div>
                {isLoggedIn ? (

                        <Nav navbar className="border-left flex-row">
                            <Notifications/>

                            <NavItem tag={Dropdown} caret toggle={this.toggleActionsMenu}>
                                <DropdownToggle caret tag={NavLink} className="text-nowrap pt-3 ml-3">
                                    <img
                                        className="user-avatar rounded-circle mr-2"
                                        src={require("../../assets/images/1.jpg")}
                                        alt="User Avatar"
                                    />{" "}
                                    <span className="d-none d-md-inline-block">Umut Emre Bayramoglu</span>
                                </DropdownToggle>

                                <Collapse tag={DropdownMenu} right small open={this.state.actionsVisible}>
                                    <DropdownItem tag={Link} to="login">
                                        <i className="material-icons">&#xE7FD;</i> Profile
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/my-events">
                                        <i className="material-icons">&#xE8B8;</i> Created Events
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/" className="text-danger" onClick={this.handleLogout}>
                                        <i className="material-icons text-danger">&#xE879;</i> Logout
                                    </DropdownItem>
                                </Collapse>
                            </NavItem>
                        </Nav>
                    )

                    :
                    (
                        <Nav navbar className="border-left justify-content-center">
                            <NavItem className="mr-3 ml-3 row w-100">
                                <Row >
                                    <a href="/login"><i className="material-icons ml-3 mr-1">login</i>
                                        <span className="d-none d-md-inline-block mr-2">Login</span></a>
                                    <a href="/register"><i className="material-icons ml-2 mr-1">person_add</i>
                                        <span className="d-none d-md-inline-block ">Register</span></a>
                                </Row>
                            </NavItem>
                        </Nav>
                    )

                }
            </div>
        );
    }
}

const mapStatetoProps = (state) => {

    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    }
}


export default withRouter(connect(mapStatetoProps, {logout})(NavUserActions));
