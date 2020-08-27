import AuthReducer from "./AuthReducer"
import {attendEvent,event} from "./EventReducer"
import {combineReducers} from 'redux';
import AlertReducer from "./AlertReducer"
import UserReducer from "./UserReducer"
import WebsocketReducer from "./WebsocketReducer"

export const rootReducer = combineReducers({

    auth: AuthReducer,
    event: event,
    attendEvent: attendEvent,
    alert: AlertReducer,
    user: UserReducer,
    websocket: WebsocketReducer,
})
