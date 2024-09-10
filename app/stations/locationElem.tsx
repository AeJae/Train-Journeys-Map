'use client'

import {LocationElemParams} from "@/app/misc/interfaces";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function LocationElem({loc, nameFunc, latLongFunc, swapFunc, deleteFunc}: LocationElemParams) {
    const [errorMsg, setErrorMsg] = useState("Unknown error."); // Last received error message.
    const [confirmDelete, setConfirmDelete] = useState(false); // Whether the delete button should say "Confirm Delete".
    const [showEditArea, setShowEditArea] = useState(false); // Whether the edit area should be shown.
    const [inputLock, setInputLock] = useState(false); // Whether text inputs should be locked.
    const [showError, setShowError] = useState(false); // Whether the error area should be shown.
    const [name, setName] = useState(loc.name); // User-entered name.
    const [long, setLong] = useState(loc.long); // User-entered longitude.
    const [lat, setLat] = useState(loc.lat); // User-entered latitude.
    const router = useRouter();

    // Toggles the "dropdown" that enables a user to edit this location's information.
    function toggleEditArea() {
        setShowError(false);
        if (showEditArea) {
            setConfirmDelete(false);
            setShowEditArea(false);
            setName(loc.name);
            setLat(loc.lat);
            setLong(loc.long);
        } else {
            setShowEditArea(true);
        }
    }

    // Returns whether the stored latitude and entered latitude match for this location.
    function latsMatch() {
        return String(lat) === String(loc.lat);
    }

    // Returns whether the stored longitude and entered longitude match for this location.
    function longsMatch() {
        return String(long) === String(loc.long);
    }

    // Enables/disables editing of location name.
    function handleName(e: any) {
        // Only allow name changes to be made when lat and long are unchanged and no transaction is in progress.
        setShowError(false);
        if (!inputLock && latsMatch() && longsMatch()) setName(e.target.value);
    }

    // Enables/disables editing of latitude.
    function handleLat(e: any) {
        // Only allow lat changes to be made when name is unchanged and no transaction is in progress.
        setShowError(false);
        if (!inputLock && loc.name === name) setLat(e.target.value);
    }

    // Enables/disables editing of longitude.
    function handleLong(e: any) {
        // Only allow long changes to be made when name is unchanged and no transaction is in progress.
        setShowError(false);
        if (!inputLock && loc.name === name) setLong(e.target.value);
    }

    // Decides how to update the page based on the response from the server.
    function handleResponse(response: any) {
        if (response && response.msg && !response.success) {
            setErrorMsg(response.msg);
            setShowError(true);
        } else if (response && response.success) {
            setShowError(false);
            router.refresh();
        } else {
            setErrorMsg("No response from server.");
            setShowError(true);
        }
    }

    // Calls a server action that swaps this location's type between station and waypoint.
    function swapType() {
        setInputLock(true);
        setShowError(false);
        swapFunc(loc.name, !loc.is_station).then((response: any) => {
            setInputLock(false);
            handleResponse(response);
        })
    }

    // Calls a server action that removes this location from the database.
    function removeThis() {
        setInputLock(true);
        setShowError(false);
        if (!confirmDelete) {
            setConfirmDelete(true);
            setInputLock(false);
        } else {
            deleteFunc(loc.name).then((response: any) => {
                setInputLock(false);
                setConfirmDelete(false);
                handleResponse(response);
            })
        }
    }

    // Calls a server action that updates this location's name.
    function updateName() {
        setInputLock(true);
        if (loc.name !== name) {
            nameFunc(loc.name, name).then((response: any) => {
                setInputLock(false);
                handleResponse(response);
            });
        } else {
            setErrorMsg("Please enter a new name.");
            setShowError(true);
            setInputLock(false);
        }
    }

    // Calls a server action that updates this location's latitude and longitude.
    function updateLatLong() {
        setInputLock(true);
        if (!latsMatch() || !longsMatch()) {
            latLongFunc(loc.name, parseFloat(String(lat)), parseFloat(String(long))).then((response: any) => {
                setInputLock(false);
                handleResponse(response);
            })
        } else {
            setErrorMsg("Please enter a new latitude and/or longitude.");
            setShowError(true);
            setInputLock(false);
        }
    }

    return (
        <> {loc.name &&
        <div className={"w-full p-2 mb-2 rounded-md bg-slate-300 select-none"}>
            {/* Minimal Overview */}
            <button onClick={toggleEditArea} className={"flex w-full justify-between items-center"}>
                <p className={"whitespace-nowrap overflow-hidden"+(showEditArea?" font-bold":"")}>{loc.name}</p>
                <p className={"w-20 py-1 px-2 ml-1 bg-slate-400 rounded-md"}>
                    {showEditArea?"Cancel":"Edit"}
                </p>
            </button>
            {/* Expanded Location Editing Area */}
            {showEditArea && <div>
                <hr className={"mt-2 border-slate-200"}/>
                {/* Name Adjustments */}
                <p className={"mt-2 -mb-1 text-center font-bold"}>Naming</p>
                <div className={"flex flex-col w-full items-center justify-center mt-2"}>
                    <input type={"text"} onChange={handleName}
                           className={"rounded-sm px-2 py-1 outline-none text-center w-full sm:w-auto"} value={name}/>
                </div>
                <div className={"w-full flex items-center justify-center"}>
                    <button onClick={updateName} className={"mt-1 underline text-xs text-slate-500"}>Confirm</button>
                </div>

                {/* Latitude and Longitude Adjustments */}
                <p className={"mt-5 -mb-1 text-center font-bold"}>Latitude & Longitude</p>
                <div className={"flex flex-col sm:flex-row mt-2 justify-center"}>
                    <input type={"text"} onChange={handleLat}
                           className={"m-0 sm:mr-1 rounded-sm px-2 py-1 outline-none text-center"} value={lat}/>
                    <input type={"text"} onChange={handleLong}
                           className={"mt-1 sm:ml-1 sm:mt-0 rounded-sm px-2 py-1 outline-none text-center"}
                           value={long}/>
                </div>
                <div className={"w-full flex items-center justify-center"}>
                    <button onClick={updateLatLong} className={"mt-1 underline text-xs text-slate-500"}>Confirm</button>
                </div>

                {/* Single Action Buttons */}
                <p className={"mt-5 text-center font-bold -mb-1"}>Actions</p>
                <div className={"flex mt-2 mb-2 justify-center items-center w-full"}>
                    <button onClick={swapType}
                            className={"w-36 mr-0.5 sm:mr-1 bg-slate-800 rounded-md py-1 px-2 text-white"}>
                        Make {loc.is_station ? "Waypoint" : "Station"}
                    </button>
                    <button onClick={removeThis}
                            className={"w-36 ml-0.5 sm:ml-1 bg-red-600 rounded-md py-1 px-2 text-white"}>
                        {confirmDelete ? "Confirm Delete" : "Delete"}
                    </button>
                </div>
                <div className={"flex w-full justify-center items-center"}>
                    <p className={"text-center w-64 sm:w-auto text-[11px] " + ((loc.name !== name || !latsMatch() || !longsMatch())?"text-red-400":"text-slate-400")}>
                        To ensure consistency, you can only edit either Naming or Latitude & Longitude.
                    </p>
                </div>
                {showError && <div className={"w-full text-center mt-1 p-1 rounded-md bg-red-600 text-white"}>
                    <p>{errorMsg}</p>
                </div>}
            </div>}
        </div>
        }</>
    )
}