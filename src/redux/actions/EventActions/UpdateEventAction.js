import {EventService} from "../../../services";
import {alertActions} from "../AlertActions";


/**
 * Make request to server to update event.
 * @param eventId
 * @param history
 * @param routeAfterUpdateUrl   After event updated, app will be redirected to that url.
 * @returns redux dispatch {function(...[*]=)}
 */
export const updateEventAction = (eventId, history, routeAfterUpdateUrl) => dispatch => {
    EventService.updateEvent(eventId).then(
        resp => {
            if(resp.status == 200){
                dispatch(alertActions.success('Event updated successfully.'));
                history.push(routeAfterUpdateUrl)
            }
        }
    )
        .catch(error => {
            // Todo : handle error case
        });
}