import {EventService, sendTicketQrCodeMail} from "../../../services";
import {alertActions} from "../AlertActions"
import {setAttendanceStatus, attendanceOpSuccess} from "./eventActionCreators";

/**
 * Make request to server to attend event
 * @param eventId
 * @param username
 * @param clientRef     client reference to send websocket message
 * @param notificationDto   contains notification data's
 * @returns redux dispatch {function(...[*]=)}
 */
export const attendEventAction = (eventId, username,clientRef,notificationDto,userAnswers) => dispatch => {
    EventService.attendEvent(eventId, username,userAnswers)
        .then(
            resp => {
                if (resp.status === 200){
                    dispatch(attendanceOpSuccess(true));
                    dispatch(setAttendanceStatus(true));
                    sendParticipatedNotification(eventId,clientRef,notificationDto)
                }
                else {
                    dispatch(attendanceOpSuccess(false));
                }
            }
        )
        .catch(
            error => {
                if(error.response){
                    dispatch(attendanceOpSuccess(false));
                    dispatch(alertActions.error(error.response.data));
                }

            }
        );

    const sendParticipatedNotification = (eventId,clientRef, notificationDto) => {
        console.log("send",clientRef)
        clientRef.sendMessage('/app/notifications/participated/' + eventId, notificationDto);
    };

}

