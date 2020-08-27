import {websocketConstants} from "../../constants";


export const setWebTokenClientRefAction = (clientRef) => dispatch => {
    console.log(clientRef)
    dispatch(setClientRef(clientRef))

    function setClientRef(clientRef){
        return {
            type: websocketConstants.SET_CLIENT_REF,
            clientRef: clientRef,
        }
    }
}