import React from "react";
import {NavItem, NavLink, Badge, Collapse, DropdownItem} from "shards-react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearNotificationAction} from "../../redux/actions/UserActions/NotificationActions";

export class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggleNotifications = this.toggleNotifications.bind(this);
    }

    toggleNotifications() {

        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        const {notifications} = this.props;
        return (
            <NavItem className="border-right dropdown notifications">
                <NavLink
                    className="nav-link-icon text-center"
                    onClick={this.toggleNotifications}
                >
                    <div className="nav-link-icon__wrapper">
                        <i className="material-icons">&#xE7F4;</i>
                        {notifications != null && notifications.length

                            ? <Badge pill theme="danger">{notifications.length}</Badge>
                            : <div></div>
                        }

                    </div>
                </NavLink>
                <Collapse
                    open={this.state.visible}
                    className="dropdown-menu dropdown-menu-small"
                >
                    {notifications &&
                    notifications.length > 0
                        ? <div>
                            {
                                notifications.map((notification, ind) => {
                                    return (
                                        // TODO: ADD ONCLICK EVENT, NOTIF. SHOULD CONTAIN EVENT URL.
                                        <DropdownItem >
                                            <div className="notification__icon-wrapper">
                                                <div className="notification__icon">
                                                    <i className="material-icons">add_box</i>
                                                </div>
                                            </div>
                                            <div className="notification__content">
                                                <span className="notification__category">{notification.title}</span>
                                                <p>
                                                    {" "}
                                                    <span className="text-success text-semibold">{notification.ownerName}</span>
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </DropdownItem>
                                    )
                                })
                            }
                            <DropdownItem className="notification__all text-center">
                                View all Notifications
                            </DropdownItem>
                            <DropdownItem onClick={this.props.clearNotificationAction} className="notification__all text-center">
                                Clear Notifications
                            </DropdownItem>
                        </div>

                        : <div>
                            <DropdownItem>
                                <div className="notification__icon-wrapper">
                                    <div className="notification__icon">
                                        <i className="material-icons">info</i>
                                    </div>
                                </div>
                                <div className="notification__content my-auto">
                                    <p>
                                        There is no notification to show !
                                    </p>
                                </div>
                            </DropdownItem>
                        </div>

                    }

                </Collapse>
            </NavItem>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        notifications: state.user.notifications,
    }
}


export default withRouter(connect(mapStateToProps, {clearNotificationAction})(Notifications))
