import {EventService} from "../../../services";
import {alertActions} from "../AlertActions"
import {setAttendanceStatus} from "./eventActionCreators";

/**
 * Make request to server to check if the user participated
 * the specific event or not.
 *
 * @param eventId     Id of event
 * @return      redux dispatch {function(...[*]=)}
 */
export const checkAttendingAction = (eventId, username) => dispatch => {
    EventService.checkAttendingStatus(eventId, username)
        .then(
            resp => {
                if (resp.status === 200){
                    dispatch(setAttendanceStatus(resp.data));
                }
            }
        )
        .catch(
            error => {
                if(error.response && error.response.data)
                    dispatch(alertActions.error(error.response.data));
            }
        );
}

