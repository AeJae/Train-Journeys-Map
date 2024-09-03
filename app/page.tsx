import Viewer from "@/app/viewer";

export default async function Home() {
    // const data = await fetch("http://localhost:3000/api/locations", {cache: "no-cache"});
    // const stations = await data.json();

    // const elems = [];
    // for (let i = 0; i < stations.length; i++) {
    //     const item = stations[i];
    //     elems.push(<p key={i}>{item.is_station?"Station":"Waypoint"}: {item.name} - ({item.lat}, {item.long})</p>)
    // }

  return (
    <Viewer />
  );
}
