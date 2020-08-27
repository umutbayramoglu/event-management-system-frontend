import {EventService} from "../../../services"
import {addingOpSuccessful,addingOpFailed} from "./eventActionCreators"
import {alertActions} from "../AlertActions"

/**
 * Make request to server to add new event.
 * @param eventData     Event data's which will be created.
 * @return      redux dispatch {function(...[*]=)}
 */
export const addEventAction = (eventData) => dispatch => {
   EventService.addNewEvent(eventData).then(
      resp => {
         if(resp.data){
            dispatch(addingOpSuccessful());
            dispatch(alertActions.success('Event created successfully.'));
         }
         else{
            dispatch(addingOpFailed())
            dispatch(alertActions.error("Some error occurred")); // TODO: HANDLE THIS
         }
   })
   .catch(error => {
      dispatch(addingOpFailed(error))
      dispatch(alertActions.error(error.toString()));
   });
}
