import React, {Component} from 'react'
import {Container, Row} from "reactstrap";
import {Col} from "shards-react";
import PostContent from "../components/event-page/EventContent"
import PostInfo from "../components/event-page/EventInfo"
import Participants from "../components/event-page/Participants"
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ConfirmModal from "../components/snackbar/ConfirmModal"
import {deleteEventAction, getEventAction} from "../redux/actions/EventActions"
import ParticipateButtons from "../components/event-page/ParticipateButtons";
import {alertActions} from "../redux/actions/AlertActions";
import AdminActions from "../components/event-page/AdminActions";

export class EventView extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false, event: {}, hasWritePerm: false, eventId: ""}

    }

    async componentDidMount() {
        const eventId = this.props.match.params.eventId;
        this.props.getEventAction(eventId, this.props.history);
        this.setState({
            eventId: eventId
        });
    }

    editEvent = () => {
        const {eventLoaded, event} = this.props;

        if (eventLoaded) {
            let currentDate = new Date();
            let startDate = new Date(event.startDate)
            if (startDate.getTime() < currentDate.getTime()) {
                this.props.errorAlert("Event can not be edited after event started.")
            } else {
                this.props.history.push({
                    pathname: this.props.history.location.pathname + '/edit'
                })
            }

        }
    }

    analyzeEvent = () => {
        this.props.history.push({
            pathname: this.props.history.location.pathname + '/analyze'
        })
    }


    deleteEvent = () => {
        const {eventLoaded, event} = this.props;

        if (eventLoaded) {
            let currentDate = new Date();
            let startDate = new Date(event.startDate)
            if (startDate.getTime() < currentDate.getTime()) {
                this.props.errorAlert("Event can not be deleted after event started.")
            } else {
                this.setState({showModal: true});
            }

        }
    }

    saveForm = () => {
        this.props.deleteEventAction(this.state.eventId, this.props.history);
        this.setState({showModal: false})
    }

    handleShow = () => {
        this.setState({showModal: true})
    }

    handleClose = () => {
        this.setState({showModal: false})
    }

    listParticipants = () => {
        this.props.history.push({
            pathname: this.props.history.location.pathname + '/participants'
        })
    }

    render() {
        const {event, eventLoaded, user} = this.props;
        let hasWritePerm;
        if (user)
            hasWritePerm = this.props.user.hasWritePerm;

        return (

            <Container fluid className="main-content-container">
                {eventLoaded &&
                <div>
                    <ConfirmModal
                        title="Delete Event"
                        body="Event is about to be deleted, do you confirm that?"
                        opt1="No"
                        opt2="Yes"
                        opt1Show="true"
                        opt2Show="true"
                        show={this.state.showModal}
                        saveForm={this.saveForm}
                        handleClose={this.handleClose}
                        handleShow={this.handleShow}/>

                    <Row noGutters className="event-post-header p-4 justify-content-center ">
                        <Col sm="12" xs="12" md="12" lg="3" className="my-auto">
                            <div className="post-title">{event.title}</div>
                        </Col>
                        <Col sm="12" xs="12" md="12" lg="9" className="">
                            {hasWritePerm &&
                            <AdminActions analyzeEvent={this.analyzeEvent}
                                          editEvent={this.editEvent}
                                          deleteEvent={this.deleteEvent}
                                          listParticipants={this.listParticipants}/>}
                        </Col>

                    </Row>

                    <Row className="justify-content-center">
                        <Col lg="7" className="mt-3">
                            <PostContent img={event.img} content={event.explanation} owner={event.owner}/>
                        </Col>
                        <Col lg="4" className="mt-3">
                            <Row>
                                {/**
                                 TODO:  not auth. user can show participate buttons,
                                        but they will route to login page or may be shown modal
                                 */}
                                {user && event && <Col lg="12" md="12">
                                    <ParticipateButtons event={event} user={user}/>
                                </Col>}

                                <Col lg="12" md="12" className="mt-3">
                                    <PostInfo event={event}/>
                                </Col>

                                <Col lg="12" md="12" className="mt-3">
                                    <Participants/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>}
            </Container>


        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            user: state.auth.user,
            event: state.event.curEvent,
            eventLoaded: state.event.eventLoaded
        }
    }

const
    actionCreators = {
        deleteEventAction: deleteEventAction,
        getEventAction: getEventAction,
        errorAlert: alertActions.error
    };


export default withRouter(connect

(
    mapStateToProps
    ,
    actionCreators
)(
    EventView
))
;