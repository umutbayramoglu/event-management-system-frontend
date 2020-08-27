import {EventService} from "../../../services"
import {getParticipantsSuccessful} from "./eventActionCreators"
import {navigateErrorPage} from "../NavigateToErrorPageAction";

/**
 * Make request to server to get participants of event.
 * @param eventId     Id of event
 * @return      redux dispatch {function(...[*]=)}
 */
export const getParticipantsAction = (eventId,history) => dispatch => {
    EventService.getParticipants(eventId).then(
        resp => {
            if(resp.status === 200){
                dispatch(getParticipantsSuccessful(resp.data));
            }
            else{
                 navigateErrorPage(history,"Something went wrong !");
            }
        })
        .catch(error => {
            if(error.response && error.response.data())
                navigateErrorPage(history,error.response.data);
        });
}
