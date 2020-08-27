import axios from 'axios';
import {URL, USERS, NOTIFICATIONS, CHECK_WRITE_PERM} from "../constants/ApiConfig"
import authHeader from "../services/requestHeader"

/**
 * Manages all user-related requests.
 *
 * Created 27.07.2020
 * @author Umut Emre Bayramoglu
 */

export const hasWritePerm = async (username) => {
    const hasWritePerm = await axios.get(URL + CHECK_WRITE_PERM + username, authHeader());
    return hasWritePerm.data;
}


export const getCreatedEvents = (username) => {
    return axios.get(URL + USERS + username + "/events" ,authHeader());
}


export const getNotifications = (username) => {
    return JSON.parse(localStorage.getItem("notifications")) || [];
}

export const saveNotification = (notification) => {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push(notification);
    localStorage.save("Notifications",JSON.stringify(notifications))
}

export const UserService = {hasWritePerm, getCreatedEvents,getNotifications,saveNotification}