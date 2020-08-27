import {eventConstants} from "../../../constants"

/**
 * (Reducers corresponds to action creators below defined on EventReducer.js)
 *
 * Created: 28.07.2020
 * @author Umut Emre Bayramoglu
 */


export function addingOpSuccessful(){
  return {type: eventConstants.ADD_OP_SUCCESS, }
}

export function addingOpFailed(error){
  return {type: eventConstants.ADD_NEW_EVENT_SUCCESS, error }
}


export function deleteOpSuccessful(){
  return {type: eventConstants.DELETE_OP_SUCCESS, }
}

export function deleteOpFailed(error){
  return {type: eventConstants.DELETE_OP_FAILED, error }
}


export function getEventSuccessful(curEvent){
  return {type: eventConstants.GET_EVENT, curEvent }
}

export function getParticipantsSuccessful(participants){
  return {type: eventConstants.GET_EVENT_PARTICIPANTS, participants }
}

export function setAttendanceStatus(attendanceStatus){
  return {type: eventConstants.ATTENDING_STATUS, attendanceStatus}
}


export function attendanceOpSuccess(isOpSuccess){
  return {type: eventConstants.ATTENDANCE_OP_SUCCESS, isOpSuccess}
}

export function clearAttendanceCallbacks(){
  return {type: eventConstants.CLEAR_ATTENDANCE_CALLBACK,}
}

