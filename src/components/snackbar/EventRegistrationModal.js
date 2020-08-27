import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap';
import RegistrationForm from "../event-page/RegistrationForm";
import {createQrCodeDetails} from "../../util/QrCodeDetailsUtil";
import {Row} from "reactstrap";
import QRCode from "qrcode.react";
import {CircularProgress} from "@material-ui/core";
import {attendEventAction, cancelAttendingAction, checkAttendingAction} from "../../redux/actions/EventActions";
import {updateNotifications} from "../../redux/actions/UserActions/userActionCreators";
import {sendTicketQrCodeMail} from "../../services";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {clearAttendanceCallbacks} from "../../redux/actions/EventActions/eventActionCreators";

export class EventRegistrationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalBody: null,
        }
    }

    componentWillUnmount() {

        this.props.clearAttendanceCallbacks();
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
        const {event, user, attendanceOpSuccess} = this.props;
        const qrCodeDetails = createQrCodeDetails(event, user);

        const qrCodeBody = (
            attendanceOpSuccess ? <div>
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
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.saveForm}>Close</Button>
                    </Modal.Footer>
                </div>

                : <div>

                    <Row className="justify-content-center ">
                        <CircularProgress color="secondary"/>
                    </Row>
                    <Row className="justify-content-center ">
                        Waiting response...
                    </Row>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.saveForm}>Close</Button>
                    </Modal.Footer>
                </div>
        )

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{color: "#960f26",}}>
                        {!event.hasRegistrationQuestion && qrCodeBody}
                        {event.hasRegistrationQuestion && !attendanceOpSuccess && <RegistrationForm event={event}/>}
                        {attendanceOpSuccess && qrCodeBody}
                    </div>
                </Modal.Body>


                {/* <Modal.Footer>
                    {this.props.opt1Show === "true" && <Button variant="secondary" onClick={this.props.handleClose}>
                        {this.props.opt1}
                    </Button>}
                    {this.props.opt2Show === "true" && <Button variant="primary" onClick={this.props.saveForm}>
                        {this.props.opt2}
                    </Button>}
                </Modal.Footer>
                */}
            </Modal>

        )
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
    clearAttendanceCallbacks,
}


export default withRouter(connect(mapStateToProps, actions)(EventRegistrationModal));
