export default async function Page() {
    const rawStations = await fetch("http://localhost:3000/api/stations", {cache: "no-cache"});
    const stations = await rawStations.json();
    const rawWaypoints = await fetch("http://localhost:3000/api/waypoints", {cache: "no-cache"});
    const waypoints = await rawWaypoints.json();

    let stationElems = [];
    for (const i in stations) {
        const stn = stations[i];
        stationElems.push(<p key={"s"+i}>{stn.name}</p>)
    }

    let waypointElems = [];
    for (const i in waypoints) {
        const wpt = waypoints[i];
        waypointElems.push(<p key={"w"+i}>{wpt.name}</p>)
    }

    return (
        <>
            <p className={"mt-4 font-bold"}>Stations:</p>
            {stationElems}
            <p className={"mt-10 font-bold"}>Waypoints:</p>
            {waypointElems}
        </>
    )
}