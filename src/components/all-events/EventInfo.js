import React from 'react'
import {Row} from "reactstrap";
import Moment from 'react-moment';

export default function EventInfo(props) {
    const {owner, location, quota, date} = props.info;

    return (
        <div class="mt-2">
            <Row>
                <div class="event-info-label"><i class="material-icons mr-1 ">supervisor_account</i> Owner: <b><a
                    href="/">{owner}</a></b></div>
                <div class="event-info-label"><i class="material-icons mr-1 ">today</i>Date: <b><Moment
                    format="HH:MM - DD/MM/YYYY" date={date}/></b></div>
                <div class="event-info-label"><i class="material-icons mr-1 ">location_on</i>Location: <b>{location}</b>
                </div>
                <div class="event-info-label"><i class="material-icons mr-1 ">how_to_reg</i>Quota: <b>{quota}</b></div>

            </Row>

        </div>
    )
}
