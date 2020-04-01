// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './style.css'

import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

import firebase from '../../firebase'

export default class SimpleExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      lat: -4.5764529,
      lng: -37.7769052,
      zoom: 15,
    }
  }

  componentDidMount() {
    const locations = firebase.database().ref('locations')
    locations.on( 'value', (snapshot) => {
      // console.log(snapshot.val())
      for ( let item of Object.values(snapshot.val())) {
        // console.log(item)
        const { urlImage, score, longitude, latitude, classed } = item
        const temp = {
          coords: [ latitude, longitude ],
          urlImage,
          score,
          classed
        }
        
        this.setState({
          locations: [ ...this.state.locations, temp ]
        })
      }
    } )
  }

  // makePop

  render() {
    const position = [this.state.lat, this.state.lng]
    const { locations } = this.state
    return (
      <Map center={position} zoom={this.state.zoom} maxZoom={20}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>

          {
            locations.map(
              (el, i) => (
                <Marker key={i} position={el.coords}>
                  <Popup>{}</Popup>
                </Marker>
              )
            )
          }

          {/* <Marker position={[49.8397, 24.0297]}>
            <Popup>{[49.8397, 24.0297]}</Popup>
          </Marker>
          <Marker position={[52.2297, 21.0122]}>
            <Popup>{[52.2297, 21.0122]}</Popup>
          </Marker>
          <Marker position={[51.5074, -0.0901]}>
            <Popup>{[51.5074, -0.0901]}</Popup>
          </Marker> */}
        </MarkerClusterGroup>
        {/* <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </Map>
    )
  }
}
