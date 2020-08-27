import React from 'react'
import {Card, CardBody, Col} from "reactstrap"
import Event from "@material-ui/icons/Event";
import Payment from "@material-ui/icons/Payment";
import {Row} from "shards-react";
import {Group} from "@material-ui/icons";

export function InfoPart() {
    return (

        <Col lg="4" md="4">
            <Card small className="mb-3">
                <CardBody>
                    <div className="my-4 ">
                            <Row><Event className="justify-content-center mx-auto" style={{fontSize: 40, color: "#007bff"}}></Event></Row>
                            <Row><span className="justify-content-center page-title mt-2 mx-auto">Manage your events.</span></Row>
                        <div className="text-black-50"> Do you want to organize online or onsite events? With EventBell,
                            you can organize online events and easily manage your events with event tools.
                        </div>
                    </div>

                    <hr className="my-2"/>

                    <div className="my-4">
                        <Row><Payment className="justify-content-center mx-auto"
                                      style={{fontSize: 40, color: "#007bff"}}></Payment></Row>
                        <Row><span
                            className="justify-content-center page-title mt-2 mx-auto">It's a free service.</span></Row>
                        <div className="text-black-50"> You can create or attend as many events as you want without
                            paying any fee. This is a free service and will always be.
                        </div>
                    </div>

                    <hr className="my-2"/>

                    <div className="my-4 ">

                        <Row><Group className="justify-content-center mx-auto"
                                      style={{fontSize: 40, color: "#007bff"}}></Group></Row>
                        <Row><span
                            className="justify-content-center page-title mt-2 mx-auto">We support communities.</span></Row>
                        <div className="text-black-50"> We always support communities. We are here so that people can organize activities that they can teach and learn together.
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>


    )
}
