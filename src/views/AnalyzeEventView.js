import React, {Component} from 'react'
import PropTypes from "prop-types";
import UsersByDate from "../components/analyze-event/UsersByDate";
import {Col, Container, Row} from "shards-react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getEventAction} from "../redux/actions/EventActions";
import {CircularProgress} from "@material-ui/core";
import {getEventEnrolledDates} from "../services";
import {alertActions} from "../redux/actions/AlertActions";
import EventSmallStats from "../components/analyze-event/EventSmallStats";

/**
 * Views the statistics and charts of the related event.
 * @author Umut Emre Bayramoglu - 05.08.2020
 */
export class AnalyzeEventView extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            dates: null,
            dateLoadFailed: false
        })

    }


    async componentDidMount() {
        const {isLoggedIn, history, user} = this.props;

        /**
         *  If @isLoggedIn:
         *      null    :   waiting response for login
         *      false   :   login is failed
         *      true    :   login is successful
         *
         *  If received login response and login is failed, route user to Login Page.
         */
        if (isLoggedIn !== null && !user) {
            history.push("/login");
        }

        /**
         * If user has not permission to analyze event, route user to Main Page.
         */
        else if (user && !user.hasWritePerm) {
            history.push("/");
        } else {
            const eventId = this.props.match.params.eventId;

            /** Get event data*/
            this.props.getEventAction(eventId)

            /** Get users enrolled date to event */
            this.getEnrolledDatesToEvent(eventId);

            /** Set 'participated user' stat value */
            const {participantCount} = this.props.event;
            this.props.smallStats[0].value = participantCount ;

        }
    }

    /**
     * When viewing event is changed, @smallStats props doesn't change.
     * So, @smallStats props should re-assign with new event data's.
     * @param prevProps
     */
    componentDidUpdate(prevProps) {
        const {participantCount} = this.props.event;
        if(participantCount !== prevProps.event.participantCount)
        {
            this.props.smallStats[0].value = participantCount;
        }
    }

    /**
     * Get the enrolled dates to current event.
     * @param: eventId: Id of requested event.
     */
    getEnrolledDatesToEvent(eventId) {

        getEventEnrolledDates(eventId).then(
            resp => {
                this.setState({dates: resp.data})
            }
        )
            .catch(() => {
                this.setState({dateLoadFailed: true})
            })

    }


    render() {
        const {event} = this.props;
        const {dateLoadFailed, dates} = this.state;
        return (
            <Container fluid className="main-content-container px-4">

                {/**
                 *  Show loading progress bar until receive response from service.
                 */}
                {!dates && !dateLoadFailed &&
                <div className="mt-4">
                    <Row className="justify-content-center ">
                        <CircularProgress/>
                    </Row>
                    <Row className="justify-content-center ">
                        <h5 className="mt-2">Loading</h5>
                    </Row>
                </div>
                }

                {/**
                 *  Show some stats such as count of participants, questions etc..
                 */}
                {event.title &&
                <Row className="mt-3">
                    {this.props.smallStats.map((stats, idx) => (
                        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                            <EventSmallStats
                                id={`small-stats-${idx}`}
                                variation="1"
                                chartData={stats.datasets}
                                chartLabels={stats.chartLabels}
                                label={stats.label}
                                value={stats.value}
                                percentage={stats.percentage}
                                increase={stats.increase}
                                decrease={stats.decrease}
                            />
                        </Col>
                    ))}
                </Row>}


                {/**
                 *  Chart that shows enrolled date-count relation.
                 */}
                {dates &&
                <Row className="justify-content-center m-0 p-0">

                    <Col lg="4" md="6" sm="12" className="mt-3">
                        <UsersByDate dates={dates}/>
                    </Col>
                </Row>
                }

            </Container>
        )
    }
}

AnalyzeEventView.propTypes = {
    /**
     * The small stats dataset.
     */
    smallStats: PropTypes.array
};



AnalyzeEventView.defaultProps = {
    smallStats: [
        {
            label: "PARTICIPATED USER",
            value: "",
            percentage: "4.7%",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: {md: "6", sm: "6"},
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(0, 184, 216, 0.1)",
                    borderColor: "rgb(0, 184, 216)",
                    data: [1, 2, 1, 3, 5, 4, 7]
                }
            ]
        },
        {
            label: "QUESTIONS",
            value: "",
            percentage: "12.4",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: {md: "6", sm: "6"},
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(23,198,113,0.1)",
                    borderColor: "rgb(23,198,113)",
                    data: [1, 2, 3, 3, 3, 4, 4]
                }
            ]
        },
    ]
};


/**
 *  * Extract all Redux Store state data to props
 * @param state
 * @returns {alert: (message?: any) => void, isLoggedIn: (null|boolean), event: *, user: *}
 */
const mapStateToProps = (state) => {
    const {curEvent} =  state.event;

    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        event:curEvent,
        alert: state.alert,

    }
}


export default withRouter(connect(mapStateToProps, {getEventAction, errorAlert: alertActions.error})(AnalyzeEventView))