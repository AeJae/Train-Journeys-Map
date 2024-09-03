export default async function Page() {
    const rawWaypoints = await fetch("http://localhost:3000/api/waypoints", {cache: "no-cache"});
    const waypoints = await rawWaypoints.json();

    let waypointElems = [];
    for (const i in waypoints) {
        const wpt = waypoints[i];
        waypointElems.push(<p key={i}>{wpt.name}</p>)
    }

    return (
        <>
            <p>Waypoints:</p>
            {waypointElems}
        </>
    )
}