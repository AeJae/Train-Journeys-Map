export default async function Page() {
    const rawStations = await fetch("http://localhost:3000/api/stations", {cache: "no-cache"});
    const stations = await rawStations.json();

    let stationElems = [];
    for (const i in stations) {
        const stn = stations[i];
        stationElems.push(<p key={i}>{stn.name}</p>)
    }

    return (
        <>
            <p>Stations:</p>
            {stationElems}
        </>
    )
}