import {userConstants} from "../../../constants"

/**
 * (Reducers corresponds to action creators below defined on UserReducer.js)
 *
 * Created: 28.07.2020
 * @author Umut Emre Bayramoglu
 */


export function setCurrentUser(user){
  return {type: userConstants.SET_CURRENT_USER, user}
}

export function getCreatedEvents(events){
  return {type: userConstants.GET_CREATED_EVENTS, events};
}


export function getParticipatedEvents(events){
  return {type: userConstants.GET_PARTICIPATED_EVENTS, events};
}

export function getNotifications(notifications){
  return {type: userConstants.GET_NOTIFICATIONS,notifications}
}

export function updateNotifications(notifications){
  return {type: userConstants.NOTIFICATION_RECEIVED,notifications}
}