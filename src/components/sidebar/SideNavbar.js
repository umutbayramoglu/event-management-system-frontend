import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

export class SideNavbar extends Component {
    render() {
        return (
            <div className="main-navbar">
                <Navbar
                    className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
                    type="light"
                >
                    <NavbarBrand
                        className="w-100 mr-0"
                        href="#"
                        style={{ lineHeight: "25px" }}
                    >
                        <div className="d-table m-auto">
                            {/* <img
                                id="main-logo"
                                className="d-inline-block align-top mr-1"
                                style={{ maxWidth: "25px" }}
                                src={require("../../../images/shards-dashboards-logo.svg")}
                                alt="Shards Dashboard"
                            /> */}

                            <h4 className="text-center font-weight-bold text-primary">
                            eventBell
                                </h4>

                        </div>
                    </NavbarBrand>
                    {/* eslint-disable-next-line */}
                    <a
                        className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                        onClick={this.handleToggleSidebar}
                    >
                        <i className="material-icons">&#xE5C4;</i>
                    </a>
                </Navbar>
            </div>
        );
    }
}

SideNavbar.propTypes = {
    /**
     * Whether to hide the logo text, or not.
     */
    hideLogoText: PropTypes.bool
};

SideNavbar.defaultProps = {
    hideLogoText: false
};

export default SideNavbar;
