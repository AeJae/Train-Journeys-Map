import {LocationCreateOverAPI, LocationDeleteOverAPI, LocationEditOverAPI} from "@/app/misc/interfaces";
import LocationElem from "@/app/stations/locationElem";
import NewLocation from "@/app/stations/newLocation";

export default async function Page() {
    const rawStations = await fetch("http://localhost:3000/api/stations", {cache: "no-cache"});
    const stations = await rawStations.json();
    const rawWaypoints = await fetch("http://localhost:3000/api/waypoints", {cache: "no-cache"});
    const waypoints = await rawWaypoints.json();

    async function post(data: any) {
        'use server'
        const response = await fetch("http://localhost:3000/api/editLocation", {method: "POST", cache: "no-cache", body: JSON.stringify(data)});
        return await response.json();
    }

    async function dbUpdateName(originalName: string, newName: string) {
        'use server'
        const data: LocationEditOverAPI = {editType: "name", name: originalName, newName: newName};
        return await post(data);
    }

    async function dbUpdateLatLong(name: string, lat: number, long: number) {
        'use server'
        const data: LocationEditOverAPI = {editType: "latLong", name: name, newLat: lat, newLong: long};
        return await post(data);
    }

    async function dbSwapType(name: string, newIsStation: boolean) {
        'use server'
        const data: LocationEditOverAPI = {editType: "isStation", name: name, newIsStation: newIsStation};
        return await post(data);
    }

    async function dbDeleteLocation(name: string) {
        'use server'
        const data: LocationDeleteOverAPI = {type: "location", name: name};
        const response = await fetch("http://localhost:3000/api/deleteItem", {method: "POST", cache: "no-cache", body: JSON.stringify(data)});
        return await response.json();
    }

    async function dbCreateLocation(type: string, name: string, lat: number, long: number) {
        'use server'
        const data: LocationCreateOverAPI = {type: "location", name: name, isStation: (type === "stn"), lat: lat, long: long};
        const response = await fetch("http://localhost:3000/api/addItem", {method: "POST", cache: "no-cache", body: JSON.stringify(data)});
        return await response.json();
    }

    let stationElems = [];
    for (const i in stations) {
        const stn = stations[i];
        stationElems.push(<LocationElem
            key={"s"+stn.name}
            loc={stn}
            nameFunc={dbUpdateName}
            latLongFunc={dbUpdateLatLong}
            swapFunc={dbSwapType}
            deleteFunc={dbDeleteLocation}
        />);
    }

    let waypointElems = [];
    for (const i in waypoints) {
        const wpt = waypoints[i];
        waypointElems.push(<LocationElem
            key={"w"+wpt.name}
            loc={wpt}
            nameFunc={dbUpdateName}
            latLongFunc={dbUpdateLatLong}
            swapFunc={dbSwapType}
            deleteFunc={dbDeleteLocation}
        />)
    }

    return (
        <>
            <div className={"flex flex-col items-center m-4 font-medium"}>
                <NewLocation station={true} createFunc={dbCreateLocation}/>
                {stationElems}
                <p className={"text-2xl font-bold mt-2 mb-4"}>Waypoints</p>
                <NewLocation station={false} createFunc={dbCreateLocation}/>
                {waypointElems}
            </div>
        </>
    )
}