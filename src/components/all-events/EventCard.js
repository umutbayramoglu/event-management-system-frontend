import React, { Component } from 'react'
import { Row, Col } from 'shards-react';
import TitleUtil from '../../util/TitleUtil';
import EventInfo from "./EventInfo";

export default class EventCard extends Component {

    onEventClick = (e) => {
        const eventId = this.props.eventLink.split("-").pop();
        this.props.history.push({pathname:this.props.eventLink,
                                eventInfo:{eventId}});
    }

    render() {
        const { title, img, } = this.props;
        return (    
            <Col lg="4" md="6" sm="12" >
                <div className="card mb-3">
                    <img onClick={this.onEventClick} class="card-img-top fade-in" src={require('../../assets/images/' + img)} />
                    <div class="card-body pt-0 mt-0">
                        <a onClick={this.onEventClick} ><TitleUtil title={title} class=" mt-2" ></TitleUtil></a>
                        <hr class="m-0 p-0"></hr>

                        <EventInfo info={this.props} />
                    </div>
                </div>
            </Col>

        );
    }
}
