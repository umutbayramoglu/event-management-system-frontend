import React, { Component } from 'react';
import TitleUtil from "../util/TitleUtil";
import { Container, Row} from "reactstrap";
import "react-quill/dist/quill.snow.css";
import "../assets/css/react-quill.css";
import {InfoPart} from "../components/add-new-event"
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UpdateForm from "../components/edit-event/UpdateForm";
import {getEventAction} from "../redux/actions/EventActions";

export class EditEventView extends Component {

    componentDidMount() {
        const {isLoggedIn,history,user} = this.props;
        if(isLoggedIn != null && !user){
            history.push("/login");
        }
        else if(user && !user.hasWritePerm){
            history.push("/");
        }
        else
        {
            const eventId = this.props.match.params.eventId;
            this.props.getEventAction(eventId,history);
        }

    }

    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4 content-fade-in">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <TitleUtil title="Update Event" explanation="" />
                </Row>

                <Row>
                    {/* Editor */}
                    <UpdateForm event = {this.props.event} eventId = {this.props.match.params.eventId} eventLoaded = {this.props.eventLoaded} user = {this.props.user} />
                    <InfoPart/>
                </Row>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user:state.auth.user,
        event: state.event.curEvent,
        eventLoaded: state.event.eventLoaded
    }
}


export default withRouter(connect(mapStateToProps, {getEventAction})(EditEventView));
