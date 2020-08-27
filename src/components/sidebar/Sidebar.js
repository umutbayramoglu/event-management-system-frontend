import React, { Component } from 'react';
import {Col} from "shards-react"; 
import classNames from "classnames";

// Import sidebar parts
import SideNavbar from "./SideNavbar";
import SideNavbarItems from './SideNavbarItems';

export class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          menuVisible : false
        }
    }

    render() {
      const classes = classNames(
        "main-sidebar",
        "px-0",
        "col-12",
        this.state.menuVisible && "open"
      );

        return (
          <Col
          tag="aside"
          className={classes}
          lg={{ size: 2 }}
          md={{ size: 3 }}
        >
          <SideNavbar/>
          <SideNavbarItems/>
        </Col>
        );
      }
}

export default Sidebar;
