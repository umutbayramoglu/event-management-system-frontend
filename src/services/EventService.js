import axios from 'axios';
import {
    URL,
    EVENTS,
    MAP_API_KEY,
    MAP_BASE_URL,
    GET_PARTICIPANTS,
} from "../constants/ApiConfig"
import authHeader from "../services/requestHeader"

/**
 * Service class to make all event-related requests to server by using {@link axios}
 *
 * Created 28.07.2020
 * @author Umut Emre Bayramoglu
 */

/**
 * This method is not part of redux.
 */
export const getAllEvents = async () => {
    const allEvents = await axios.get(URL + "/events");
    console.log(allEvents.data)
    return allEvents.data;
};


export const addNewEvent = (eventData) => {
    const {event} = eventData;
    return axios.post(URL + EVENTS, event, authHeader());
}


export const deleteEventById = (eventId) => {
    return axios.delete(URL + EVENTS + eventId, authHeader());
}


export const updateEvent = (eventData) => {
    const {event} = eventData;
    return axios.patch(URL + EVENTS + event.id, event, authHeader());
}


export const getEventById = (eventId) => {
    return axios.get(URL + EVENTS + eventId);
}


/**
 * This method is not part of redux.
 */
async function getEventLocationLngLat(location) {
    const locationInfo = axios.get(MAP_BASE_URL + location + MAP_API_KEY).then(
        resp => {
            const address = resp.data.results[0].formatted_address;
            const {lat, lng} = resp.data.results[0].geometry.location;
            return {address, lat, lng};
        }
    );
    return locationInfo;
}


export const getParticipants = (eventId) => {
    return axios.get(URL + EVENTS + eventId + GET_PARTICIPANTS, authHeader());
}


export const checkAttendingStatus = (eventId, username) => {
    return axios.get(URL + EVENTS + eventId + GET_PARTICIPANTS + "/" + username, authHeader());
}


export const attendEvent = (eventId, username,userAnswers) => {
    return axios.post(URL + EVENTS + eventId + "/participants/" + username,userAnswers, authHeader());
}


export const cancelAttending = (eventId, username) => {
    return axios.delete(URL + EVENTS + eventId + "/participants/" + username, authHeader());
}


/**
 * This method is not part of redux.
 */
export const getEventEnrolledDates = async (eventId) => {
    return axios.get(URL + EVENTS + eventId + "/participants-by-date", authHeader())
}


export const EventService = {
    addNewEvent,
    getEventById,
    deleteEventById,
    updateEvent,
    getEventLocationLngLat,
    getParticipants,
    attendEvent,
    cancelAttending,
    checkAttendingStatus,
    getEventEnrolledDates,
    getAllEvents

};

