import {useMemo} from "react";
import dynamic from "next/dynamic";
import {TriangleLoader} from "@/app/misc/loading";

export default async function Home() {
    const Map = useMemo(() => dynamic(() => import('@/app/misc/map'), {
        loading: () => <TriangleLoader text={"Preparing map..."} />,
        ssr: false
    }), [])

    const rawMarkers = await fetch("http://localhost:3000/api/stations", {cache: "no-cache"});
    const markersJson = await rawMarkers.json();
    const rawLinks = await fetch("http://localhost:3000/api/link-coords", {cache: "no-cache"});
    const linksJson = await rawLinks.json();

    return (
        <div>
            <Map markers={markersJson} links={linksJson}/>
        </div>
    )
}
