import React, { Component } from 'react'
import {Container, Row} from "react-bootstrap";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Card,CardHeader} from "shards-react";


export class Maps extends Component {
    render() {

        const {lat,lng} = this.props;
        console.log(typeof(lat));

        return (
                    <Map
                        className="maps-container"
                        style={{width: '100%', height: '300px', position: 'fixed'}}
                        initialCenter={{
                            lat: lat,
                            lng: lng
                        }}
                        google={this.props.google} zoom={14}>
                        <Marker position={{lat: lat, lng: lng}}
                                name={'Event address'} />
                    </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBLPv7aFjfDXPNdHssytl0LP2AbrUjNGbg")
})(Maps)
