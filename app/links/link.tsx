'use client'

import {useRouter} from "next/navigation";
import {useState} from "react";

interface Link {
    location_a: string,
    location_b: string
}

export default function Link({link, removeLink}: {link: Link, removeLink: Function}) {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorMsg, setErrorMsg] = useState("An unknown error occurred.");

    function removeThis() {
        setShowConfirm(!showConfirm);
        if (showConfirm) {
            removeLink(link).then((result: any) => {
                if (result.success) {
                    router.refresh();
                } else {
                    setErrorMsg(result.msg);
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 2500)
                }
            })
        }
    }

    return (
        <>
        {link.location_a && link.location_b &&
        <div className={"flex items-center justify-between select-none p-2 bg-slate-300 w-full mb-2 rounded-md hover:outline hover:outline-1 hover:outline-slate-400"}>
            <p>{link.location_a} {"<-->"} {link.location_b}</p>

            {/* Contains the delete/confirm and cancel buttons for each link. */}
            <div className={"flex flex-col ml-1 sm:flex-row justify-center items-center h-16 sm:h-fit"}>
                <button className={"p-1 w-20 rounded-md text-white bg-red-600 text-center"} onClick={removeThis}>{(showConfirm?"Confirm":"Delete")}</button>
                {showConfirm && <button className={"p-1 w-20 m-0 sm:ml-1 rounded-md bg-green-700 text-white"} onClick={() => {setShowConfirm(false)}}>Cancel</button>}
            </div>
        </div>
        }
        {showError && <p className={"mb-2 text-red-600"}>{errorMsg}</p>}
        </>
    )
}