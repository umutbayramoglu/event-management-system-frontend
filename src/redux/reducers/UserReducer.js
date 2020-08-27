import {userConstants} from "../../constants"

let events = {}
const initialState = {areEventsLoaded: false, events};

const user = (state = initialState, action) => {
    switch (action.type) {

        case userConstants.GET_CREATED_EVENTS:
            return {
                areEventsLoaded: true,
                events: action.events
            }

        case userConstants.GET_PARTICIPATED_EVENTS:
            return {
                areEventsLoaded: true,
                events: action.events
            }

        case userConstants.NOTIFICATION_RECEIVED:
            return{
                ...state,
                notifications: action.notifications,
        }

        case userConstants.GET_NOTIFICATIONS:
            return{
                ...state,
                notifications: action.notifications,
            }
        default:
    }
    return state;
}

export default user;