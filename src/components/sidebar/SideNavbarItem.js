import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

const SideNavbarItem = ({ item }) => (
  <NavItem>
    <NavLink tag={RouteNavLink} to={item.to}>
      {item.icon && (
        <div
          className="d-inline-block item-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
      )}
      {item.title && <span>{item.title}</span>}
    </NavLink>
  </NavItem>
);

SideNavbarItem.propTypes = {
  item: PropTypes.object
};

export default SideNavbarItem;
