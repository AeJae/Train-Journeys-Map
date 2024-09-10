'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function NewLink({addLink}: {addLink: Function}) {
    const router = useRouter();
    const [showCreateArea, setShowCreateArea] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [success, setSuccess] = useState(false);
    const [locAText, setLocAText] = useState("");
    const [locBText, setLocBText] = useState("");
    const [msg, setMsg] = useState("");

    function createClicked() {
        setShowResult(false);
        setSuccess(false);
        setShowCreateArea(true);
    }

    function loc_a_handler(e: any) {
        setLocAText(e.target.value);
    }

    function loc_b_handler(e: any) {
        setLocBText(e.target.value);
    }

    function handleCancel(e: any) {
        e.preventDefault();
        setShowCreateArea(false);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        // Convert to title case...
        const locA = locAText.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
        const locB = locBText.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
        // Process on server, then...
        addLink(locA, locB).then((result: any) => {
            if (result.success) {
                setLocAText("");
                setLocBText("");
                setShowCreateArea(false);
                setMsg("Success.")
                setSuccess(true);
                setShowResult(true);
                router.refresh();
                setTimeout(() => {
                    setShowResult(false);
                    setSuccess(false);
                }, 2500)
            } else {
                setMsg(result.msg);
                setSuccess(false);
                setShowResult(true);
            }
        });
    }

    return (
        <>
        {/* Normal tab shown with no interaction */}
        {!showCreateArea &&
            <button onClick={createClicked} className={"flex items-center justify-between p-2 " +
                "bg-slate-300 w-full mb-2 rounded-md hover:outline hover:outline-1 hover:outline-slate-400"}>
                <p className={"font-bold"}>Create a new link</p>
                <div className={"flex justify-center items-center h-16 sm:h-fit"}>
                    <p className={"py-1 px-2 w-20 bg-green-700 rounded-md text-white"}>Create</p>
                </div>
            </button>
        }

        {/* Tab shown after user has decided to add a new link */}
        {showCreateArea && (
            <div className={"p-2 bg-slate-300 w-full mb-2 rounded-md hover:outline hover:outline-1 hover:outline-slate-400"}>
                <form className={"flex justify-between items-center"}>
                    <div className={"flex flex-col sm:flex-row items-center"}>
                        <input type={"text"} placeholder={"Location A"} className={"py-1 px-2 rounded-sm outline-none"} onChange={loc_a_handler} value={locAText} />
                        <p className={"m-0 sm:mx-1.5 h-0 sm:h-fit select-none"}>{"<-->"}</p>
                        <input type={"text"} placeholder={"Location B"} className={"py-1 px-2 rounded-sm outline-none"} onChange={loc_b_handler} value={locBText} />
                    </div>
                    <div className={"flex flex-col ml-1 sm:flex-row justify-center items-center h-16 sm:h-fit"}>
                        <button className={"p-1 w-20 bg-red-600 rounded-md text-white"} onClick={handleSubmit}>Confirm</button>
                        <button className={"p-1 w-20 bg-green-700 rounded-md m-0 sm:ml-1 text-white"} onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )}

        {showResult && <p className={"mb-2 " + (success?"text-green-500":"text-red-600")}>{msg}</p>}
        </>
    )
}