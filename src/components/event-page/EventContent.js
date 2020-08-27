import React, {Component} from 'react'
import {Card, CardBody, Row} from "shards-react";

export default class EventContent extends Component {


    render() {


        const {content, owner,img} = this.props;

        return (

            <Card small className="mb-lg-3 mb-md-3 mb-sm-0">

                <img class="card-img-top fade-in" src={require('../../assets/images/' + img)}/>

                <CardBody>
                    <div className="post-content-text">
                        <div className="Container" dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>

                    <hr/>
                    <Row className="event-owner-info p-3">
                        <img
                            className="rounded-circle img-thumbnail my-auto"
                            src={require("../../assets/images/" + owner.profilePic)}
                            alt="User Avatar"
                        />{" "}
                        <div className="ml-3 my-auto">
                            <div className="owner-label">
                                {"Owner"}
                            </div>
                            <div className="owner-name">
                                {owner.name + " " + owner.surName}
                            </div>
                        </div>


                    </Row>
                </CardBody>
            </Card>

        )
    }
}
