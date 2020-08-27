import {websocketConstants} from "../../constants";


const initialState = { clientRef: null}

const websocket = (state = initialState, action) => {
    switch (action.type) {
        case websocketConstants.SET_CLIENT_REF:
            console.log("clientRef")
            return {
                clientRef: action.clientRef
            }
    }
    return state;
}

export default websocket;