import { AuthService,UserService} from "../../../services";
import { setCurrentUser,getCreatedEvents } from "../UserActions/userActionCreators";

/**
 *
 * @returns redux dispatch {function(*=): Promise<unknown>}
 */
export function getProfile() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const token = AuthService.getToken();
      if (token) {
        AuthService.getProfile().then(resp => {
          if (resp.data) {
            dispatch(setCurrentUser(resp.data));
          }
          else{
            dispatch(setCurrentUser(null));
          }
          resolve();
        });
      } else {
        dispatch(setCurrentUser(null));
        resolve();
      }
    });
  }
}

/**
 * @param username
 * @returns redux dispatch {function(*=): Promise<unknown>}
 */
export function getCreatedEventsAction(username) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      UserService.getCreatedEvents(username)
        .then(resp => {
          if (resp.data) {
            dispatch(getCreatedEvents(resp.data));
          }
          resolve();
        })
        .catch(error => {

        });
    });
  }
}





