import React, {Component} from 'react';
import {Button, ButtonGroup, Col} from "shards-react";

class AdminActions extends Component {
    render() {
        const {analyzeEvent,listParticipants,editEvent,deleteEvent} = this.props;
        return (
            <div className="float-lg-right pr-lg-4 admin-actions">
                <Button className="m-1" theme="info"
                        onClick={analyzeEvent}>Analyze
                </Button>

                <Button className="m-1" theme="info"
                        onClick={listParticipants}>List All Participants
                </Button>

                <ButtonGroup className="m-1">
                    <Button theme="warning" onClick={editEvent}>Edit Event</Button>
                    <Button outline theme="danger" onClick={deleteEvent}>Delete Event</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default AdminActions;