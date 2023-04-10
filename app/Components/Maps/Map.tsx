'use client'
import React from 'react'

import L from 'leaflet'
import { MapContainer,Marker,TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcons2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl:markerIcon.src,
    iconRetinaUrl:markerIcons2x.src,
    shadowUrl:markerShadow.src
})

interface Props{
    center?:number[],

}

 const Map = ({center}:Props) => {
    console.log(center);
    
  return (
        <MapContainer
        center={center as L.LatLngExpression || [51,-0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={true}
        className='h-[35vh] rounded-lg'
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             {
                center &&(
                    <Marker
                    position={center as L.LatLngExpression}
                    />
                )
             }

        </MapContainer>
  )
}
export default Map