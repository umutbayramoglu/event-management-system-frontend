import { userConstants } from '../../../constants';
import {AuthService} from '../../../services'
import {setCurrentUser} from "./userActionCreators"


/**
 * Make login request.
 * @param loginData
 * @param history
 * @returns {function(...[*]=)}
 */
export function login(loginData, history) {
    return dispatch => {
        AuthService.login(loginData.email, loginData.pass)
        .then(resp => {
            if(resp.data.success){
                dispatch(setCurrentUser(resp.data.user));
                AuthService.saveToken(resp.data.token);
                navigate();
            }
        })  
        .catch(error => {
            if (error){
                dispatch(handleErrors(error));
            }
        });
        
    };

    function navigate() {
        history.push("/dashboard");
    }
    
    function handleErrors() {
        console.log("Login error occured");
        return { type: userConstants.LOGIN_FAILURE, loginData }
    }

    /*function request(loginData) {
        return { type: userConstants.LOGIN_REQUEST, loginData }
    }

    function successLogin(loginData) {
        return { type: userConstants.LOGIN_SUCCESS, loginData }
    }*/
}


/**
 * Make login request.
 * @param history
 * @returns {function(...[*]=)}
 */
export const logout = (history) => dispatch => {
    AuthService.logout();
    history.push("/");
    window.location.reload();
    dispatch(logoutReq());
    
    function logoutReq() {
        return { type: userConstants.LOGOUT };
    }
}

