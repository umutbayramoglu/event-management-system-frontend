import axios from 'axios';
import authHeader from "./requestHeader";
import {URL} from "../constants/ApiConfig"
import {alertActions} from "../redux/actions/AlertActions";

/**
 * Manages all mail-related requests.
 *
 * Created 11.08.2020
 * @author Umut Emre Bayramoglu
 */

export const sendTicketQrCodeMail = (qrCodeEmailDto) => dispatch => {
    axios.post(URL + "/mail/send-qr-code", qrCodeEmailDto, authHeader()).then(
        resp => {
            dispatch(alertActions.success("Qr code sent to your email successfully !"))
        }
    ).catch(
        err => {

        }
    )
}