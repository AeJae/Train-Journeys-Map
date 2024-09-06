'use client'

import {useRouter} from "next/navigation";
import {useState} from "react";

interface Link {
    location_a: string,
    location_b: string
}

export default function Link({link, removeLink}: {link: Link, removeLink: Function}) {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);

    function removeThis() {
        setShowConfirm(!showConfirm);
        if (showConfirm) {
            removeLink(link);
            router.refresh();
        }
    }

    return (
        <div className={"flex items-center justify-between select-none p-2 bg-slate-300 w-full mb-2 rounded-md hover:outline hover:outline-1 hover:outline-slate-400"}>
            <p>{link.location_a} {"<-->"} {link.location_b}</p>

            {/* Contains the delete/confirm and cancel buttons for each link. */}
            <div className={"flex flex-col ml-1 sm:flex-row justify-center items-center h-16 sm:h-fit"}>
                <button className={"p-1 w-20 rounded-md text-white bg-red-600 text-center"} onClick={removeThis}>{(showConfirm?"Confirm":"Delete")}</button>
                {showConfirm && <button className={"p-1 w-20 m-0 sm:ml-1 rounded-md bg-green-500"} onClick={() => {setShowConfirm(false)}}>Cancel</button>}
            </div>
        </div>
    )
}