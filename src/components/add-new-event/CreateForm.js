import React, {Component} from 'react'
import {Col, Card, CardBody, Form, FormInput, Button, FormTextarea, FormCheckbox} from "shards-react";
import ReactQuill from "react-quill";
import {DatePicker_,} from '../add-new-event'
import {Row} from 'reactstrap';
import classNames from "classnames";
import {connect} from "react-redux"
import {addEventAction} from "../../redux/actions/EventActions/AddEventAction"
import {withRouter} from 'react-router';
import ConfirmModal from '../snackbar/ConfirmModal';
import {alertActions} from "../../redux/actions/AlertActions"
import {EventService} from "../../services/EventService"
import {convertLocationForRequest} from "../../util/LocationConverterUtil"
import FileUpload from "./FileUpload";

export class CreateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false, askRegistrationQuestion: false}
    }

    /**
     *  Form submit action
     *  Shows the @ErrorAlert if form is not valid.
     * */
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.startDate.getTime() >= this.state.endDate.getTime()) {
            this.props.errorAlert("The event ending date cannot be after the starting date.")
        } else (this.setState({showModal: true}));

    }

    /**
     *  Common onChange functions for all form input field but 'explanation' and 'date' fields.
     *  Sets the related state to typed form value.
     */
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }




    /**
     *  onChange function for 'explanation' field.
     *  Sets the related state to typed form value.
     */
    onExpChange = (val) => {
        this.setState({"explanation": val})
    }

    /**
     *  onDateChange function for 'date' field.
     *  Sets the related state to typed form value.
     */
    onDateChange = (field, date) => {
        this.setState({[field]: date});
    }


    /**
     *  Firstly, make api call to get event location info (latitude, longitude, address name)
     *  Then call redux-related action that named 'addEventAction' to create new event.
     */
    saveForm = async () => {
        this.setState({showModal: false})
        let locationInfo = await EventService.getEventLocationLngLat(this.state.location);
        this.setState({location: convertLocationForRequest(locationInfo)});
        this.setState({
            registrationFormQuestions:
                this.state["registrationFormQuestions"] != null
                    ? [{questionText: this.state["registrationFormQuestions"]}]
                    : []})
        this.props.addEventAction({event: this.state});
    }


    /**
     *  Make @ConfirmModal visible.
     */
    handleShow = () => {
        this.setState({showModal: true})
    }


    /**
     *  Make @ConfirmModal invisible.
     */
    handleClose = () => {
        this.setState({showModal: false})
    }

    /**
     * Handle checkbox changes
     * @param e
     * @param opt
     */
    handleCheckboxChange = (e, opt) => {
        const newState = {};
        let checked = this.state[opt]
        newState[opt] = !checked;
        this.setState({...this.state, ...newState})
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
        const {title, startDate, endDate, location, language, explanation, quota, askRegistrationQuestion, registrationFormQuestions,img} = this.state;

        /** Form enable conditions */
        const createFormEnabled = title && startDate && endDate && location
            && language
            && quota
            && explanation
            && img
            && (!askRegistrationQuestion || (askRegistrationQuestion && registrationFormQuestions));

        const formInputLabel = classNames(
            "mb-2",
            "mt-3",
            "text-muted",
            "d-block",
            "text-uppercase"
        )

        return (

            <Col lg="8" md="8">

                {/**
                 * Confirm modal is visible if user click create button.
                 */}
                <ConfirmModal
                    title="Create New Event"
                    body="Event is about to be created, do you confirm that?"
                    opt1="No"
                    opt2="Yes"
                    opt1Show="true"
                    opt2Show="true"
                    show={this.state.showModal}
                    saveForm={this.saveForm}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}/>


                {/**
                 * Card content that contains all form fields.
                 */}
                <Card small className="mb-3">
                    <CardBody>
                        <Form className="add-new-post" onSubmit={this.onSubmit}>

                            {/** NAME OF EVENT INPUT */}
                            <strong className={formInputLabel}>Name of event</strong>
                            <FormInput onChange={this.onChange} name="title" size="lg"
                                       placeholder="Enter the event name"/>


                            {/** EXPLANATION INPUT */}
                            <strong className={formInputLabel}>Explanation</strong>
                            <ReactQuill name="explanation" onChange={this.onExpChange}
                                        className="add-new-post__editor mb-1"/>


                            {/** EVENT POSTER AND QUOTA INPUT */}
                            <Row>
                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Event Poster</strong>
                                    <FileUpload load={this.onEventPosterUpload}/>
                                </Col>
                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Event Quota</strong>
                                    <FormInput type="number" onChange={this.onChange} name="quota" size="md"
                                               placeholder="Enter the quota"/>
                                </Col>
                            </Row>


                            {/** STARTING AND TIME */}
                            <Row>
                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Start</strong>
                                    <div className="form-control p-1 m-1 text-center"><DatePicker_
                                        onDateChange={this.onDateChange} name="startDate"/></div>

                                </Col>

                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>End</strong>
                                    <div className="form-control p-1 m-1 text-center"><DatePicker_
                                        onDateChange={this.onDateChange} name="endDate"/></div>
                                </Col>
                            </Row>


                            {/** LOCATION AND LANGUAGE INPUT */}
                            <Row>
                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Location</strong>

                                    <FormInput name="location" type="text" onChange={this.onChange} size="md"
                                               placeholder="Enter the location"/>

                                </Col>

                                <Col lg="6" md="6">
                                    <strong className={formInputLabel}>Language</strong>

                                    <FormInput name="language" type="text" onChange={this.onChange} size="md"
                                               placeholder="Enter the language"/>

                                </Col>
                            </Row>


                            {/** ADDITIONAL REGISTRATION QUESTION */}
                            <strong className={formInputLabel}>Event Registration Form Questions</strong>

                            <FormCheckbox
                                checked={this.state.askRegistrationQuestion}
                                onChange={e => this.handleCheckboxChange(e, "askRegistrationQuestion")}
                            >
                                I want to ask additional question on the event registration screen.
                            </FormCheckbox>
                            <FormTextarea disabled={!this.state.askRegistrationQuestion} onChange={this.onChange}
                                          name="registrationFormQuestions" size="lg"
                                          placeholder="Enter the questions that will be asked on event registration page."/>


                            {/** SUBMIT BUTTON */}
                            <div className="text-center text-uppercase">
                                <Button className="btn btn-primary mt-4 mr-1 center-block"
                                        disabled={!createFormEnabled}>
                                    Create Event
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>


            </Col>
        )
    }
}

/**
 * Extract all Redux Store state data to props
 * @param state
 * @returns {{alert: *, user: *}}
 */
const mapStateToProps = (state) => {
    const {alert, user} = state;
    return {
        alert,
        user,
    }
}

/**
 * Necessary redux actions for this component
 * @type {{addEventAction: addEventAction, errorAlert: error}}
 */
const reduxActions = {
    addEventAction: addEventAction,
    errorAlert: alertActions.error
};


export default withRouter(connect(mapStateToProps, reduxActions)(CreateForm));
