import React, {Component} from 'react';
import {Row} from "reactstrap";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    attendEventAction,
    cancelAttendingAction,
    checkAttendingAction,
} from "../../redux/actions/EventActions"
import {Button, Col} from "shards-react";
import {createQrCodeDetails} from "../../util/QrCodeDetailsUtil";
import {CircularProgress} from "@material-ui/core";
import QRCode from "qrcode.react"
import {updateNotifications} from "../../redux/actions/UserActions/userActionCreators";
import {sendTicketQrCodeMail} from "../../services";
import EventRegistrationModal from "../snackbar/EventRegistrationModal";
import ConfirmModal from "../snackbar/ConfirmModal";
import {createNotificationDto, createQrCodeEmailDto} from "../../util/DtoUtil";

class ParticipateButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    async componentDidMount() {
        let eventId = this.props.match.params.eventId;
        let username = this.props.user.username;
        this.props.checkAttendingAction(eventId, username);
    }


    handleAttend = () => {
        if(!this.props.event.hasRegistrationQuestion)
        {
            const {event, user,clientRef} = this.props;
            let eventId = this.props.match.params.eventId;
            let username = user.username;

            let notificationDto = createNotificationDto(event,user);
            this.props.attendEventAction(eventId, username,clientRef,notificationDto,[]);
        }


        this.setState({showModal: true});
    }

    handleCancelling = () => {
        let eventId = this.props.match.params.eventId;
        let username = this.props.user.username;
        this.props.cancelAttendingAction(eventId, username);
    }

    closeFormButton = () => {
        this.setState({showModal: false})
    }

    handleShow = () => {
        this.setState({showModal: true})
    }

    handleClose = () => {
        this.setState({showModal: false})
    }

    downloadQR = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QR_" + this.props.event.title + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    sendQrCode = () => {
        const {event, user} = this.props;

        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        let qrCodeEmailDto = {
            base64ImageUrl: pngUrl,
            eventTitle: event.title,
            participantName: user.name,
            participantEmail: user.email,
            eventUrl: window.location.href,
        }

        this.props.sendTicketQrCodeMail(qrCodeEmailDto);

    }

    render() {
        const {showModal} = this.state;
        const {event, user, attendanceStatus, attendanceOpSuccess} = this.props;
        const qrCodeDetails = createQrCodeDetails(event, user);

        const qrCodeBody =(
            attendanceStatus ? <div>
                    <Row className="mb-3">Attended the event successfully. You can see your ticket details by QR code
                        below.</Row>
                    <Row className="justify-content-center">
                        <QRCode
                            id={"qrcode"}
                            size="150"
                            value={qrCodeDetails}/>
                    </Row>
                    <Row className="justify-content-center mt-2"><a style={{cursor: 'pointer'}}
                                                                    onClick={this.downloadQR}> Download Qr Code </a> </Row>
                    <Row className="justify-content-center mt-1"> <a style={{cursor: 'pointer'}}
                                                                     onClick={this.sendQrCode}> Send Qr Code to my
                        email </a></Row>
                </div>

                : <div>

                    <Row className="justify-content-center ">
                        <CircularProgress color="secondary"/>
                    </Row>
                    <Row className="justify-content-center ">
                        Waiting response...
                    </Row>
                </div>
        )


        let classNameExt = !attendanceStatus ? "participate-buttons-success" : "participate-buttons-danger";

        return (
            <div>
                <EventRegistrationModal
                    event = {event}
                    ha
                    show={event.hasRegistrationQuestion && showModal}
                    saveForm={this.closeFormButton}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}/>

                <ConfirmModal
                    title="QR code is ready !"
                    body={
                        qrCodeBody
                    }
                    opt1="No"
                    opt2="Close"
                    opt1Show="false"
                    opt2Show="true"
                    show={!event.hasRegistrationQuestion && showModal}
                    saveForm={this.closeFormButton}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}/>

                {attendanceStatus != null
                    ? <Row noGutters className={"participate-buttons-bg " + classNameExt}>
                        <Col sm="12" xs="12" lg="12" className="text-center">
                            {!attendanceStatus
                                ? <Button size="md" theme="success" onClick={this.handleAttend}>Attend Event</Button>
                                : (<Button size="md" theme="danger" onClick={this.handleCancelling}>Cancel
                                    Attending</Button>)}

                        </Col> </Row>
                    : <div></div>
                }
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        attendanceOpSuccess: state.attendEvent.attendanceOpSuccess,
        attendanceStatus: state.attendEvent.attendanceStatus,
        clientRef: state.websocket.clientRef,
    }
}

const actions = {
    attendEventAction,
    cancelAttendingAction,
    checkAttendingAction,
    updateNotifications,
    sendTicketQrCodeMail,
}


export default withRouter(connect(mapStateToProps, actions)(ParticipateButtons));
