import { userConstants } from "../../constants"

let user = null
const initialState ={isLoggedIn: null, user,loginResponseStatus: false};

export const auth = (state = initialState, action) => {

    switch (action.type) {
        // HANDLE SUCCESFULL LOGIN
        case userConstants.LOGIN_SUCCESS:
            return {
               
            }

        // HANDLE LOGOUT
        case userConstants.LOGOUT:
            return {
                user: null,
                isLoggedIn: false
            }

        // HANDLE LOADING CURRENT USER 
        case userConstants.SET_CURRENT_USER:
            return{
                user: action.user,
                isLoggedIn: action.user ? true : false,
                loginResponseStatus: true,
            }

        default:

    }

    return state;
}

export default auth;