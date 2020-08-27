import {eventConstants} from "../../constants"

const initialState = {
    eventLoaded: false,
    curEvent: {},
}

export const event = (state = initialState, action) => {

    switch (action.type) {
        case eventConstants.ADD_OP_SUCCESS:
            return {
                ...state,
                addEventSuccess: true
            }

        case eventConstants.ADD_OP_FAILED:
            return {
                ...state,
                addEventFailed: true
            }

        case eventConstants.GET_EVENT:
            return {
                eventLoaded: true,
                curEvent: action.curEvent
            }

        case eventConstants.GET_EVENT_PARTICIPANTS:
            return {
                participantsLoaded: true,
                participants: action.participants
            }
        default:
    }

    return state;
}

export const attendEvent = (state = {}, action) => {
    switch (action.type) {
        case eventConstants.ATTENDANCE_OP_SUCCESS:
            return {
                ...state,
                attendanceOpSuccess: action.isOpSuccess
            }
        case eventConstants.ATTENDING_STATUS:
            return {
                ...state,
                attendanceStatus: action.attendanceStatus
            }
        case eventConstants.CLEAR_ATTENDANCE_CALLBACK:
            return {
                ...state,
                attendanceOpSuccess:null,
            }
    }

    return state;
}


export default event;