import {getToken} from "./AuthService"

export default function authHeader(){
    return {headers:{ 
        "Authorization": "Bearer " +  getToken()}}
 }
 