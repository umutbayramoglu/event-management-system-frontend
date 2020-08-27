import React, { Component } from 'react'

export default class Carousel extends Component {
    render() {
        return (
            <div id="carouselExampleIndicators " className="carousel slide" data-ride="carousel">
        
                <div class="carousel-inner">
                    
                        <div className="header-img"></div>
                       
                        <div className="carousel-caption ">
                            <h1 className="carousel-title">Discover & Organize Events</h1>
                            {/* <p>Attend events by your interests</p> */}
                        </div>
                    
                </div>
            </div>

        )
    }
}
