import LocationElem from "@/app/stations/locationElem";

export default async function Page() {
    const rawStations = await fetch("http://localhost:3000/api/stations", {cache: "no-cache"});
    const stations = await rawStations.json();
    const rawWaypoints = await fetch("http://localhost:3000/api/waypoints", {cache: "no-cache"});
    const waypoints = await rawWaypoints.json();

    async function dbUpdateName(originalName: string, newName: string) {
        'use server'
        console.log(`ACTION: Change name of ${originalName} to ${newName}`);
        // Actually update the database...
    }

    async function dbUpdateLatLong(name: string, lat: number, long: number) {
        'use server'
        console.log(`ACTION: Change lat and long of ${name} to ${lat}, ${long}`);
        // Actually update the database...
    }

    async function dbSwapType(name: string, newIsStation: boolean) {
        'use server'
        console.log(`ACTION: Set isStation for ${name} to ${newIsStation}`);
        // Actually update the database...
    }

    async function dbDeleteLocation(name: string) {
        'use server'
        console.log(`ACTION: Delete ${name}`);
        // Actually update the database...
    }

    let stationElems = [];
    for (const i in stations) {
        const stn = stations[i];
        stationElems.push(<LocationElem
            key={"s"+i}
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
            key={"w"+i}
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
                {stationElems}
                <p className={"text-2xl font-bold mt-2 mb-4"}>Waypoints</p>
                {waypointElems}
            </div>
        </>
    )
}