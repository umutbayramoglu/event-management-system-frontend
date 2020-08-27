import axios from 'axios';
import { URL, LOGIN, PROFILE } from "../constants/ApiConfig"
import authHeader from "../services/requestHeader"

/**
 * Manages all authentication-related requests.
 *
 * Created 26.07.2020
 * @author Umut Emre Bayramoglu
 */

function login(email, pass) {
   return axios.post(URL + LOGIN, { username: email, password: pass });
}

function logout() {
   localStorage.removeItem('token');
}

function getProfile() {
   return axios.get(URL + PROFILE,  authHeader())
}

function saveToken(token) {
   localStorage.setItem('token', token);
}

export function getToken() {
   return localStorage.getItem('token');
}


export const  AuthService = { login,logout, saveToken, getProfile, getToken }