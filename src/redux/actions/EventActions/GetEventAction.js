import {EventService} from "../../../services"
import {getEventSuccessful} from "./eventActionCreators"
import {navigateErrorPage} from "../NavigateToErrorPageAction"

/**
 * Make request to server to get event data.
 * @param eventId
 * @param history
 * @returns {function(...[*]=)}
 */
export const getEventAction = (eventId,history) => async dispatch => {
    EventService.getEventById(eventId).then(
      resp => {
         if(resp.status === 200){
            dispatch(getEventSuccessful(resp.data));
         }
         else{
             navigateErrorPage(history,"Something went wrong !");
         }
   })
   .catch(error => {
      if(error.response && error.response.data){
         navigateErrorPage(history,error.response.data);
      }
   });
}
