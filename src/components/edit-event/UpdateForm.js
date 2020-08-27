import React, { Component } from 'react'
import { Col, Card, CardBody, Form, FormInput, Button } from "shards-react";
import ReactQuill from "react-quill";
import { DatePicker_,} from '../add-new-event'
import { Row } from 'reactstrap';
import classNames from "classnames";
import { connect } from "react-redux"
import { addEventAction,updateEventAction } from "../../redux/actions/EventActions"
import { withRouter } from 'react-router-dom';
import ConfirmModal from '../snackbar/ConfirmModal';
import { alertActions } from "../../redux/actions/AlertActions"
import {EventService} from "../../services";
import {convertLocationForRequest, convertLocationToShow} from "../../util/LocationConverterUtil";
import FileUpload from "../add-new-event/FileUpload";


export class UpdateForm extends Component {
    constructor(props) {
        super(props);
        const {event} = this.props;
        this.state = {
            showModal: false,
            title: event.title,
            explanation: event.explanation,
            location: event.location != null && convertLocationToShow(event.location).eventLocationAddress,
            language: event.language,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            quota: event.quota,
            id: this.props.eventId,
            img: event.img
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.startDate.getTime() >= this.state.endDate.getTime()) {
            this.props.errorAlert("The event ending date cannot be after the starting date.")
        }
        else (this.setState({ showModal: true }));

    }

    onChange = (e) => {
        this.setState({ [ e.target.name]: e.target.value });
    }

    onExpChange = (val) => {
        this.setState({ ["explanation"]: val })
    }

    onDateChange = (field, date) => {
        this.setState({ [field]: date });
    }

    saveForm = async () => {

        // TODO: Check current participant count is not less than new quota.

        this.setState({ showModal: false })
        let locationInfo = await EventService.getEventLocationLngLat(this.state.location);
        this.setState({location: convertLocationForRequest(locationInfo)});
        const updateEventFormDto = { event: this.state}
        const {params} = this.props.match;
        const routeAfterUpdateUrl =  params.ownerName + "/events/" + params[0] + "-" + params.eventId;
        this.props.updateEventAction(updateEventFormDto,this.props.history,routeAfterUpdateUrl);
    }

    handleShow = () => {
        this.setState({ showModal: true })
    }

    handleClose = () => {
        this.setState({ showModal: false })
    }


    /**
     * Load event poster from {@link FileUpload component}
     * @param poster
     */
    onEventPosterUpload = (poster) => {
        let posterName = poster.split("\\").pop();
        this.setState({img: posterName})
    }

    render() {
        const { title, startDate, endDate, location, language, explanation, quota } = this.state;
        const createFormEnabled = title && startDate && endDate && location && language && quota && explanation;
        //      STYLE OF FORM INPUT LABEL       //
        const formInputLabel = classNames(
            "mb-2",
            "mt-3",
            "text-muted",
            "d-block",
            "text-uppercase"
        )

        return (
            <Col lg="8" md="8">
                <ConfirmModal
                    title="Update Event"
                    body="Event is about to be updated, do you confirm that?"
                    opt1="No"
                    opt2="Yes"
                    opt1Show ="true"
                    opt2Show = "true"
                    show={this.state.showModal}
                    saveForm={this.saveForm}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow} />

                {this.props.eventLoaded && <Card small className="mb-3">
                    <CardBody>
                        <Form className="add-new-post" onSubmit={this.onSubmit}>

                            {/* NAME OF EVENT INPUT */}
                            <strong className="" className={formInputLabel}>Name of event</strong>
                            <FormInput onChange={this.onChange} value={title} name="title" size="lg"
                                       placeholder="Enter the event name"/>


                            {/* EXPLANATION INPUT */}
                            <strong className={formInputLabel}>Explanation</strong>
                            <ReactQuill value= {explanation} name="explanation" onChange={this.onExpChange}
                                        className="add-new-post__editor mb-1"/>


                            {/* EVENT POSTER AND QUOTA INPUT */}
                            <Row>
                                <Col lg="6" md="6">
                                    <strong className="" className={formInputLabel}>Event Poster</strong>
                                    <FileUpload load={this.onEventPosterUpload}/>
                                </Col>
                                <Col lg="6" md="6">
                                    <strong className="" className={formInputLabel}>Event Quota</strong>
                                    <FormInput type="number" value={quota} onChange={this.onChange} name="quota"
                                               size="md" placeholder="Enter the quota"/>
                                </Col>
                            </Row>


                            {/* STARTING AND TIME */}
                            <Row>
                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Start</strong>
                                    <div className="form-control p-1 m-1 text-center">
                                        <DatePicker_ value={startDate} onDateChange={this.onDateChange}
                                                     name="startDate"/>
                                    </div>

                                </Col>

                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>End</strong>
                                    <div className="form-control p-1 m-1 text-center">
                                        <DatePicker_ value={endDate} onDateChange={this.onDateChange}
                                                     name="endDate"/>
                                    </div>
                                </Col>
                            </Row>


                            {/* LOCATION AND LANGUAGE INPUT */}
                            <Row>
                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Location</strong>

                                    <FormInput value={location} name="location" type="text" onChange={this.onChange} size="md"
                                               placeholder="Enter the location"/>

                                </Col>

                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Language</strong>

                                    <FormInput value={language} name="language" type="text" onChange={this.onChange} size="md"
                                               placeholder="Enter the language"/>

                                </Col>
                            </Row>


                            {/* SUBMIT BUTTON */}
                            <div className="text-center text-uppercase">
                                <Button className="btn btn-primary mt-4 mr-1 center-block"
                                        disabled={!createFormEnabled}>
                                    Update Event
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                }

            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    const { alert,user} = state;
    return {
        alert,
        user,
    }
}

const actionCreators = {
    addEventAction: addEventAction,
    errorAlert: alertActions.error,
    updateEventAction: updateEventAction

};


export default withRouter(connect(mapStateToProps, actionCreators)(UpdateForm));
