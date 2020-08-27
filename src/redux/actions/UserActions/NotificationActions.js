import {updateNotifications, getNotifications} from "./userActionCreators";
import {UserService} from "../../../services";

/**
 * Get notification when
 * @param username
 * @returns {function(...[*]=)}
 */
export const getNotificationAction = (username) => dispatch => {
    let allNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    dispatch(getNotifications(allNotifications))
}

/**
 *
 * @param notifications
 * @returns {function(*): {type: string, notifications: *}}
 */
export const updateNotificationAction = (notification) => dispatch => {
    let allNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    allNotifications.push(notification);
    localStorage.setItem("notifications",JSON.stringify(allNotifications))
    dispatch(updateNotifications(allNotifications));
}


export const clearNotificationAction = () => dispatch => {
    let allNotifications = [];
    localStorage.setItem("notifications",JSON.stringify(allNotifications))
    dispatch(updateNotifications(allNotifications));
}
