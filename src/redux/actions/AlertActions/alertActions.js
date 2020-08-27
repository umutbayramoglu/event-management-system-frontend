import {alerts} from "../../../constants/"

export const alertActions = {
    success,
    error,
    clear
}


function success(message) {
    return {type: alerts.SUCCESS, message }
}

function error(message) {
    return {type: alerts.ERROR, message }
}
function clear() {
    return {type: alerts.CLEAR,  }
}