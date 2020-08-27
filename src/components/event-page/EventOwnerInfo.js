import React, { Component } from 'react'
import {Row, Col, Card, CardBody, CardHeader} from "shards-react";

export default class EventOwnerInfo extends Component {
    render(){
        const {owner} = this.props;
        return (
            <Card>
                <CardHeader>Owner</CardHeader>
                <hr className="m-0 p-0" />

                <Row>
                    <Col lg="4" md="4" sm="4" xs= "4" className="m-2" >
                        <img
                            className="rounded-circle img-thumbnail"
                            src={require("../../assets/images/" + owner.profilePic)}
                            alt="User Avatar"
                        />{" "}
                    </Col>
                    <Col lg="8" md="8" sm="8" xs= "8" className="m-2">
                        <Row>{owner.name + " " + owner.surName} </Row>
                        <Row>r2</Row>
                    </Col>
                </Row>
                <CardBody>
                </CardBody>
            </Card>


        )
    }
}
