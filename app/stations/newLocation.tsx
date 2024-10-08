'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function NewLocation({station, createFunc}: {station: boolean, createFunc: Function}) {
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState("An unknown error occurred.");
    const [showCreate, setShowCreate] = useState(false);
    const [showError, setShowError] = useState(false);
    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    function handleName(e: any) {
        setName(e.target.value);
    }

    function handleLat(e: any) {
        setLat(e.target.value);
    }

    function handleLong(e: any) {
        setLong(e.target.value);
    }

    function createStation() {
        const latFloat = parseFloat(lat);
        const longFloat = parseFloat(long);
        if (name && !Number.isNaN(latFloat) && !Number.isNaN(longFloat)) {
            createFunc((station?"stn":"wpt"), name, latFloat, longFloat).then((response: any) => {
                if (response && response.msg && !response.success) {
                    setErrorMsg(response.msg);
                    setShowError(true);
                }
                if (response && response.success) {
                    setName("");
                    setLat("");
                    setLong("");
                    setShowCreate(false);
                    setShowError(false);
                    router.refresh();
                }
            })
        } else {
            setErrorMsg("You have entered an invalid value.");
            setShowError(true);
        }
    }

    return (
        <div className={"flex flex-col items-center justify-between w-full p-2 mb-2 bg-slate-300 rounded-md select-none"}>
            {/* Initial pane, edit area dropdown toggle button */}
            <button onClick={() => {setShowCreate(!showCreate);setShowError(false)}} className={"flex items-center justify-between w-full rounded-md"}>
                <p className={"font-bold"}>Create a new {station?"station":"waypoint"}</p>
                <div className={"flex justify-center items-center 1"}>
                    <p className={"py-1 px-2 w-20 rounded-md " + (showCreate?"bg-slate-400":"bg-green-700 text-white")}>
                        {!showCreate?"Create":"Cancel"}
                    </p>
                </div>
            </button>

            {/* Actual detail editing area */}
            {showCreate && <div className={"w-full"}>
                <hr className={"mt-2 border-slate-200"}/>
                {/* Set Name */}
                <p className={"mt-2 -mb-1 text-center font-bold"}>Naming</p>
                <div className={"flex flex-col w-full items-center justify-center mt-2"}>
                    <input
                        className={"rounded-sm px-2 py-1 outline-none text-center w-full sm:w-auto"}
                        onChange={handleName}
                        placeholder={"Name"}
                        type={"text"}
                        value={name}
                    />
                </div>

                {/* Set Latitude and Longitude */}
                <p className={"mt-5 -mb-1 text-center font-bold"}>Latitude & Longitude</p>
                <div className={"flex flex-col sm:flex-row mt-2 justify-center"}>
                    <input
                        className={"m-0 sm:mr-1 rounded-sm px-2 py-1 outline-none text-center"}
                        onChange={handleLat}
                        placeholder={"1.2"}
                        type={"text"}
                        value={lat}
                    />
                    <input
                        className={"mt-1 sm:ml-1 sm:mt-0 rounded-sm px-2 py-1 outline-none text-center"}
                        onChange={handleLong}
                        placeholder={"-1.1"}
                        type={"text"}
                        value={long}
                    />
                </div>

                {/* Submit */}
                <p className={"mt-5 text-center font-bold -mb-1"}>Actions</p>
                <div className={"flex mt-2 justify-center items-center w-full"}>
                    <button onClick={createStation} className={"w-36 bg-green-700 rounded-md py-1 px-2 text-white"}>
                        Create {station?"Station":"Waypoint"}
                    </button>
                </div>

                {/* Error messages */}
                {showError && <div className={"bg-red-600 text-white mt-2 p-1 rounded-md w-full text-center"}>
                    <p>{errorMsg}</p>
                </div>}
            </div>}
        </div>
    )
}