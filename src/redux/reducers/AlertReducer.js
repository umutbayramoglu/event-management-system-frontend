import {alerts} from "../../constants/alerts"

const initialState = { success: false,failed:false}

const alert = (state = initialState, action) => {
    switch (action.type) {
        case alerts.SUCCESS:
            return {
                success:true,
                message: action.message
            }
        case alerts.ERROR:
            return {
                failed:true,
                message: action.message
            }
        case alerts.CLEAR:
            return {
            }
        default:
    }
    return state;
}

export default alert;