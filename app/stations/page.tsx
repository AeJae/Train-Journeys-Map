import LocationElem from "@/app/stations/locationElem";

export default async function Page() {
    const rawStations = await fetch("http://localhost:3000/api/stations", {cache: "no-cache"});
    const stations = await rawStations.json();
    const rawWaypoints = await fetch("http://localhost:3000/api/waypoints", {cache: "no-cache"});
    const waypoints = await rawWaypoints.json();

    let stationElems = [];
    for (const i in stations) {
        const stn = stations[i];
        stationElems.push(<LocationElem key={"s"+i} loc={stn} />);
    }

    let waypointElems = [];
    for (const i in waypoints) {
        const wpt = waypoints[i];
        waypointElems.push(<LocationElem key={"w"+i} loc={wpt} />)
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