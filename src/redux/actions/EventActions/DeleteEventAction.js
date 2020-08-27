import {EventService} from "../../../services"
import {deleteOpFailed,deleteOpSuccessful} from "./eventActionCreators"
import {alertActions} from "../AlertActions"


/**
 * Make request to server to delete event with given id.
 * @param eventId
 * @param history
 * @returns redux dispatch {function(...[*]=)}
 */
export const deleteEventAction = (eventId,history) => dispatch => {
   EventService.deleteEventById(eventId).then(
      resp => {
         console.log(resp);
         if(resp.status === 200){
            history.push("/");
            dispatch(deleteOpSuccessful());
            dispatch(alertActions.success('Event deleted successfully.'));
         }
         else{
            dispatch(deleteOpFailed())
            dispatch(alertActions.error("Some error occured")); // HANDLE THIS
         }
   })
   .catch(error => {
      dispatch(deleteOpFailed(error))
      dispatch(alertActions.error(error.toString()));
   });
}
