'use client'

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import {icon, LatLng} from "leaflet";

export default function Map({markers, links}: {markers: any, links: any}) {
    const rotterdam = new LatLng(51.92492887890045, 4.468036742571581)

    const stnIcon = icon({
        iconUrl: "stn.png",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -10]
    })

    let markerList = []
    for (const i in markers) {
        const m = markers[i];
        markerList.push(
            <Marker key={"m"+i} position={new LatLng(parseFloat(m.lat), parseFloat(m.long))} icon={stnIcon}>
                <Popup className={"font-bold"}>{m.name}</Popup>
            </Marker>
        )
    }

    return (
        <MapContainer className={"h-[calc(100dvh-4rem)]"} center={rotterdam} zoom={5}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerList}
        </MapContainer>
    )
}