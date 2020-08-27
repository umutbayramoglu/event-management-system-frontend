import React, { Component } from 'react';
import Util from "../../util/Util";
import { Nav } from "shards-react";
import SideNavbarItem from "./SideNavbarItem";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class SideNavbarItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            navbarItems : Util.getSidebarItems()
        };
    }

    render() {
        const {user,loginResponseStatus} = this.props
        return (
            <div className="nav-wrapper">
            <Nav className="nav--no-borders flex-column">
              {this.state.navbarItems.map((item, idx) => (
                  item.needAdminPermission
                  ? loginResponseStatus && user && user.hasWritePerm && <SideNavbarItem key={idx} item={item}/>
                  : loginResponseStatus && <SideNavbarItem key={idx} item={item}/>
              ))}
            </Nav>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
       user: state.auth.user,
       loginResponseStatus: state.auth.loginResponseStatus,
   }
}

export default withRouter(connect(mapStateToProps,null)(SideNavbarItems));