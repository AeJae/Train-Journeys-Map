'use client'

export function PageNav({activePage, setPage}: {activePage: string, setPage: any}) {
    return (
        <nav className={"flex items-center justify-evenly w-full h-16 bg-slate-400 text-slate-950 text-3xl"}>
            <NavLink
                active={activePage === "stations"}
                onclick={() => setPage("stations")}
                text={"Stations"}
            />
            <NavLink
                active={activePage === "map"}
                onclick={() => {setPage("map")}}
                text={"Map"}
            />
            <NavLink
                active={activePage === "waypoints"}
                onclick={() => setPage("waypoints")}
                text={"Waypoints"}
            />
        </nav>
    )
}

export function NavLink({active, onclick, text}: { active: boolean, onclick: any, text: string }) {
    return (
        <button className={"flex flex-col items-center justify-center text-center w-40"} onClick={onclick}>
            <p className={"ease-out transition-all duration-200 " + (active?"font-bold":"font-normal")}>{text}</p>
            <div className={"ease-out transition-all duration-200 w-14 h-1 mt-1 rounded-md " + (active?"bg-slate-500":"bg-transparent")}></div>
        </button>
    )
}