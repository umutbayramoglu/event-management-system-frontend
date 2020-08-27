import React, {Component} from 'react'
import {Container, Row, Col} from "react-bootstrap";
import TitleUtil from "../util/TitleUtil";
import EventCard from '../components/all-events/EventCard';
import Carousel from "../components/all-events/Carousel";
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import {convertLocationToShow} from "../util/LocationConverterUtil"
import {getAllEvents} from "../services";

export class DashboardView extends Component {

    state = {
        allEvents: []
    }

    componentDidMount = async () => {
        let allEvents = await getAllEvents();
        this.setState({
            allEvents: allEvents
        });
    }

    onEventClick = (e) => {
    }

    render() {
        return (

            <Container fluid className="main-content-container pb-4">

                {/* Page Header */}

                <Row>
                    <Col lg="12" md="12" className="p-0">
                        <Carousel/>
                    </Col>

                </Row>

                <Row noGutters className="page-header py-4">
                    <TitleUtil title="All Events"/>
                </Row>

                <Row>
                    {this.state.allEvents.map((event, i) => {
                        const eventUrl = event.ownerName.toLowerCase().split(" ").join("-") + "/events/" + event.title.toLowerCase().split(" ").join("-") + "-" + event.id
                        return (
                            <EventCard
                                history={this.props.history}
                                title={event.title}
                                img= {event.img}
                                eventLink={eventUrl}
                                owner={event.ownerName}
                                location={convertLocationToShow(event.location).eventLocationAddress}
                                quota={event.quota}
                                date={event.startDate}/>);
                    })}
                </Row>

            </Container>
        )

    }
}

const mapStatetoProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default withRouter(connect(mapStatetoProps, null)(DashboardView));
