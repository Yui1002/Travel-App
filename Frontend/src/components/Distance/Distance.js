import React, { Component } from 'react';

class Distance extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            latitude: null,
            longitude: null
        }
        this.getUserLocation = this.getUserLocation.bind(this);
        this.showPosition = this.showPosition.bind(this)
    }

    getUserLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
            return 'Geolocation is not supported by this browser'
        }
    }

    showPosition(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

        console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`)
    }
    
    render() { 
        return ( 
            <div>
                <h1>Distance</h1>
                <p>You are at </p>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
                <button onClick={() => this.getUserLocation()}>Get my location</button>
                <input placeholder={this.state.distance}></input>km
                <button>submit</button>
            </div>
        );
    }
}
 
export default Distance;