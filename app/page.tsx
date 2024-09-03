import {useMemo} from "react";
import dynamic from "next/dynamic";

export default async function Home() {
    const Map = useMemo(() => dynamic(() => import('@/app/misc/map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
    }), [])

    return (
        <div>
            <Map markers={null} links={null}/>
        </div>
    )
}
