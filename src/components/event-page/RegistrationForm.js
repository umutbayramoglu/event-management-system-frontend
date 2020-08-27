import React, {Component} from 'react'
import {Form, Button, FormTextarea,} from "shards-react";
import {connect} from "react-redux"
import {withRouter} from 'react-router';
import {attendEventAction, cancelAttendingAction, checkAttendingAction} from "../../redux/actions/EventActions";
import {updateNotifications} from "../../redux/actions/UserActions/userActionCreators";
import {sendTicketQrCodeMail} from "../../services";
import {createNotificationDto, createQrCodeEmailDto} from "../../util/DtoUtil";

export class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {userAnswers: []}
    }

    /**
     *  Form submit action
     *  Call {@link #attendEventAction with @eventId, @username, @clientRef, @notificationDto }
     * */
    onSubmit = (e) => {
        e.preventDefault();
        const {event, user, clientRef} = this.props;
        let eventId = this.props.match.params.eventId;
        let username = user.username;

        let notificationDto = createNotificationDto(event, user);
        this.props.attendEventAction(eventId, username, clientRef, notificationDto,this.state.userAnswers);
    }

    /**
     *  Handle user answer inputs on registration form.
     */
    onUserAnswerChange = (e, ind) => {
        const userAnswers = [...this.state.userAnswers]
        userAnswers[ind] = {userAnswer: e.target.value};
        this.setState({userAnswers: userAnswers});
    }


    render() {
        const {userAnswers} = this.state;
        const {event} = this.props;
        const questions = event.registrationFormQuestions;

        /** Form enable conditions */
        const createFormEnabled = userAnswers.length === event.registrationFormQuestions.length;

        return (

            <div>
                <Form onSubmit={this.onSubmit}>

                    {questions.map((q, ind) => {
                        return (<div>
                            <div style={{color: "#5f5555", marginBottom: 10}}>{q.questionText}</div>
                            <FormTextarea onChange={e => this.onUserAnswerChange(e, ind)}
                                          name={"userAnswer"} size="lg"
                                          placeholder="Enter the answer"/>
                        </div>)
                    })}

                    {/** SUBMIT BUTTON */}
                    <div className="text-center text-uppercase">
                        <Button className="btn btn-primary mt-4 mr-1 center-block"
                                disabled={!createFormEnabled}>
                            Attend Event
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

/**
 * Extract all Redux Store state data to props
 * @param state
 * @returns {{alert: *, event: {}, user: *, eventLoaded: boolean}}
 */
const mapStateToProps = (state) => {
    const {alert} = state;
    return {
        alert,
        user: state.auth.user,
        event: state.event.curEvent,
        eventLoaded: state.event.eventLoaded,
        clientRef: state.websocket.clientRef,
    }
}

/**
 * Dispatch actions to props.
 */
const actions = {
    attendEventAction,
    cancelAttendingAction,
    checkAttendingAction,
    updateNotifications,
    sendTicketQrCodeMail,
}

export default withRouter(connect(mapStateToProps, actions)(RegistrationForm));
