import React, {Component} from 'react';
import TitleUtil from "../util/TitleUtil";
import {Container, Row} from "reactstrap";
import "react-quill/dist/quill.snow.css";
import "../assets/css/react-quill.css";
import {InfoPart} from "../components/add-new-event"
import CreateForm from "../components/add-new-event/CreateForm"
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export class AddEventView extends Component {

    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4 content-fade-in">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <TitleUtil title="Add New Event" explanation="You can create an event here"/>
                </Row>

                <Row>
                    {/* Editor */}
                    <CreateForm user={this.props.user}/>
                    <InfoPart/>

                </Row>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        loginResponseStatus: state.auth.loginResponseStatus,
    }
}


export default withRouter(connect(mapStateToProps, null)(AddEventView));
