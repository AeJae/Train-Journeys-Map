'use client'

import {useState} from "react";

export default function NewLink({addLink}: {addLink: Function}) {
    const [showCreate, setShowCreate] = useState(false)
    const [locAText, setLocAText] = useState("");
    const [locBText, setLocBText] = useState("");

    function loc_a_handler(e: any) {
        setLocAText(e.target.value);
    }

    function loc_b_handler(e: any) {
        setLocBText(e.target.value);
    }

    function handleCancel(e: any) {
        e.preventDefault();
        setShowCreate(false);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        // Convert to title case...
        const locA = locAText.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
        const locB = locBText.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
        // Process on server...
        addLink(locA, locB);
    }

    return (
        <>
        {/* Normal tab shown with no interaction */}
        {!showCreate &&
            <button onClick={() => {setShowCreate(true)}} className={"flex items-center justify-between p-2 " +
                "bg-slate-300 w-full mb-2 rounded-md hover:outline hover:outline-1 hover:outline-slate-400"}>
                <p className={"font-bold"}>Create a new link</p>
                <div className={"flex justify-center items-center h-16 sm:h-fit"}>
                    <p className={"py-1 px-2 w-20 bg-green-500 rounded-md"}>Create</p>
                </div>
            </button>
        }

        {/* Tab shown after user has decided to add a new link */}
        {showCreate && (
            <div className={"p-2 bg-slate-300 w-full mb-2 rounded-md hover:outline hover:outline-1 hover:outline-slate-400"}>
                <form className={"flex justify-between items-center"}>
                    <div className={"flex flex-col sm:flex-row items-center"}>
                        <input type={"text"} placeholder={"Location A"} className={"py-1 px-2 rounded-sm outline-none"} onChange={loc_a_handler} value={locAText} />
                        <p className={"m-0 sm:mx-1.5 h-0 sm:h-fit"}>{"<-->"}</p>
                        <input type={"text"} placeholder={"Location B"} className={"py-1 px-2 rounded-sm outline-none"} onChange={loc_b_handler} value={locBText} />
                    </div>
                    <div className={"flex flex-col ml-1 sm:flex-row justify-center items-center h-16 sm:h-fit"}>
                        <button className={"p-1 w-20 bg-red-600 rounded-md text-white"} onClick={handleSubmit}>Confirm</button>
                        <button className={"p-1 w-20 bg-green-500 rounded-md m-0 sm:ml-1"} onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )}
        </>
    )
}