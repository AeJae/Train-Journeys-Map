'use client'

import {usePathname, useRouter} from "next/navigation";

export function PageNav() {
    const router = useRouter();
    const page = usePathname().split("/")[1];

    return (
        <nav className={"flex items-center justify-evenly w-full h-16 bg-slate-400 text-slate-950 text-3xl"}>
            <NavLink active={page === "stations"} onclick={() => {router.push("/stations");router.refresh()}} text={"Stations"} />
            <NavLink active={page === ""} onclick={() => {router.push("/");router.refresh()}} text={"Map"} />
            <NavLink active={page === "links"} onclick={() => {router.push("/links");router.refresh()}} text={"Links"} />
        </nav>
    )
}

export function NavLink({active, onclick, text}: { active: boolean, onclick: any, text: string }) {
    return (
        <button className={"flex flex-col items-center justify-center text-center w-28"} onClick={onclick}>
            <p className={"ease-out transition-all duration-200 " + (active?"font-bold":"font-normal")}>{text}</p>
            <div className={"ease-out transition-all duration-200 w-14 h-1 mt-1 rounded-md " + (active?"bg-slate-500":"bg-transparent")}></div>
        </button>
    )
}