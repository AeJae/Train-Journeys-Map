'use client'

import {LocationElemParams} from "@/app/misc/interfaces";
import {useState} from "react";

export default function LocationElem({loc, nameFunc, latLongFunc, swapFunc, deleteFunc}: LocationElemParams) {
    const [showEditArea, setShowEditArea] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [inputLock, setInputLock] = useState(false);
    const [name, setName] = useState(loc.name);
    const [long, setLong] = useState(loc.long);
    const [lat, setLat] = useState(loc.lat);

    function toggleEditArea() {
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

    function handleName(e: any) {
        // Only allow name changes to be made when lat and long are unchanged and no transaction is in progress.
        if (!inputLock && String(loc.lat) === String(lat) && String(loc.long) === String(long)) setName(e.target.value);
    }

    function handleLat(e: any) {
        // Only allow lat changes to be made when name is unchanged and no transaction is in progress.
        if (!inputLock && loc.name === name) setLat(e.target.value);
    }

    function handleLong(e: any) {
        // Only allow long changes to be made when name is unchanged and no transaction is in progress.
        if (!inputLock && loc.name === name) setLong(e.target.value);
    }

    function swapType() {
        setInputLock(true);
        swapFunc(loc.name, !loc.is_station).then((response: any) => {
            if (response && response.msg) console.log(response.msg);
            setInputLock(false);
        })
    }

    function removeThis() {
        setInputLock(true);
        if (!confirmDelete) {
            setConfirmDelete(true);
            setInputLock(false);
        } else {
            deleteFunc(loc.name).then((response: any) => {
                if (response && response.msg) console.log(response.msg);
                setConfirmDelete(false);
                setInputLock(false);
            })
        }
    }

    function updateName() {
        setInputLock(true);
        if (loc.name !== name) {
            nameFunc(loc.name, name).then((response: any) => {
                if (response && response.msg) console.log(response.msg);
                setInputLock(false);
            })
        } else {
            setInputLock(false);
        }
    }

    function updateLatLong() {
        setInputLock(true);
        if (String(loc.lat) !== String(lat) || String(loc.long) !== String(long)) {
            const latFloat: number = parseFloat(String(lat)); // TS thinks lat is a number already, it's definitely not.
            const longFloat: number = parseFloat(String(long)); // Same with long.
            latLongFunc(loc.name, latFloat, longFloat).then((response: any) => {
                if (response && response.msg) console.log(response.msg);
                setInputLock(false);
            })
        } else {
            setInputLock(false);
        }
    }

    return (
        <> {loc.name &&
        <div className={"w-full p-2 mb-2 rounded-md bg-slate-300"}>
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
                    <p className={"text-center w-64 sm:w-auto text-[11px] text-slate-400"}>To ensure consistency, you can only edit either Naming or Latitude & Longitude.</p>
                </div>
            </div>}
        </div>
        }</>
    )
}