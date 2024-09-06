'use client'

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
import "leaflet/dist/leaflet.css"

import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet"
import {icon, LatLng} from "leaflet";

interface ReceivedMarker {
    name: string,
    lat: string,
    long: string
}

interface ReceivedCoordinatePair {
    a_lat: string,
    a_lng: string,
    b_lat: string,
    b_lng: string
}

export default function Map({markers, links}: {markers: any, links: any}) {
    const rotterdam = new LatLng(51.92492887890045, 4.468036742571581);
    const pathOpt = {color: '#00a8f3'};
    const stnIcon = icon({
        iconUrl: "stn.png",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -10]
    });

    let markerList = [];
    for (const i in markers) {
        const m: ReceivedMarker = markers[i];
        markerList.push(
            <Marker key={"m"+i} position={new LatLng(parseFloat(m.lat), parseFloat(m.long))} icon={stnIcon}>
                <Popup className={"font-bold"}>{m.name}</Popup>
            </Marker>
        )
    }

    let linkList = [];
    for (const i in links) {
        const l: ReceivedCoordinatePair = links[i];
        const path = [
            new LatLng(parseFloat(l.a_lat), parseFloat(l.a_lng)),
            new LatLng(parseFloat(l.b_lat), parseFloat(l.b_lng))
        ]
        linkList.push(<Polyline key={"l"+i} pathOptions={pathOpt} positions={path}/>);
    }

    return (
        <MapContainer className={"h-[calc(100dvh-4rem)]"} center={rotterdam} zoom={5}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerList}
            {linkList}
        </MapContainer>
    )
}