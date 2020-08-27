import React, { Component } from 'react'
import AccessTime from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {convertLocationToShow} from "../../util/LocationConverterUtil"
import Maps from "./Maps"
import {
    Row,
    Card,
    CardHeader,
    CardBody,
} from "shards-react";
import Moment from "react-moment";
import ConfirmModal from "../snackbar/ConfirmModal";


export default class EventInfo extends Component {

    constructor(props){
        super(props)
        this.state = {showModal:false}
    }

    showLocationModal = () => {
        this.setState({showModal: true})
    }

    handleShow = () => {
        this.setState({showModal: true})
    }

    handleClose = () => {
        this.setState({showModal: false})
    }

    render() {
        const { event } = this.props;
        const {eventLocationAddress, lat, lng} = convertLocationToShow(event.location);
        const locationUrl = "https://www.google.com/maps/search/?api=1&query="+lat+","+lng;
        return (
            <Card>
                <ConfirmModal
                    title="Event Location"
                    body = { <Maps lat = {lat} lng = {lng}/>}
                    opt1=""
                    opt2="Close"
                    opt1Show="false"
                    opt2Show="true"
                    show={this.state.showModal}
                    saveForm={this.handleClose}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}/>

                <CardHeader>Post Details</CardHeader>
                <hr className="m-0 p-0" />
                <CardBody className="m-1 p-1" >
                    <Row className="mb-2 mx-auto p-0 justify-content-center">
                        <AccessTime className="" style={{ fontSize: 30,color: "#007bff"}}></AccessTime>
                        <div className="event-detail my-auto ml-2"><Moment format="HH:MM - DD/MM/YYYY" date = {event.startDate}/></div>
                    </Row>
                    <Row className="mb-1 mx-auto p-0 justify-content-center">
                        <LocationOnIcon onClick={this.showLocationModal}  className="" style={{ fontSize: 30,color: "#007bff",cursor: 'pointer'}}/>
                        <div className="event-detail my-auto ml-2">
                            {/*
                            <a href={locationUrl} target="_blank">
                            {eventLocationAddress}</a>
                            */}

                            <a onClick={this.showLocationModal} style={{cursor: 'pointer',color: "#5ca4f1"}} target="_blank">
                                Show the event location</a>

                        </div>
                    </Row>

                    <Row>

                    </Row>
                </CardBody>
            </Card>


        )
    }
}
