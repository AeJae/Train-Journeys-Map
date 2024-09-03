'use client'

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import {icon, LatLng} from "leaflet";

export default function Map({markers, links}: {markers: any, links: any}) {
    const center = new LatLng(51.45, -0.155);

    const stnIcon = icon({
        iconUrl: "stn.png",

        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -10]
    })

    return (
        <MapContainer className={"h-[calc(100dvh-4rem)]"} center={center} zoom={5}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={new LatLng(51.5280408, -0.1333271)} icon={stnIcon}>
                <Popup>
                    London Euston
                </Popup>
            </Marker>
        </MapContainer>
    )
}