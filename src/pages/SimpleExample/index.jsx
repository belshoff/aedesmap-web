// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './style.css'

export default class SimpleExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: -4.5764529,
      lng: -37.7769052,
      zoom: 15,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}
