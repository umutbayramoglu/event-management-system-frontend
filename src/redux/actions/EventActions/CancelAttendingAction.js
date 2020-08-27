import {EventService} from "../../../services";
import {alertActions} from "../AlertActions"
import {setAttendanceStatus} from "./eventActionCreators";


/**
 * Make request to server to cancel event attending.
 * @param eventId
 * @param username
 * @returns redux dispatch {function(...[*]=)}
 */
export const cancelAttendingAction = (eventId, username) => dispatch => {
    EventService.cancelAttending(eventId, username)
        .then(
            resp => {
                if (resp.status === 200){
                    dispatch(alertActions.success("Attending the event cancelled successfully."));
                    dispatch(setAttendanceStatus(false));
                }
            }
        )
        .catch(
            error => {
                dispatch(alertActions.error(error.response.data));
            }
        );
}

