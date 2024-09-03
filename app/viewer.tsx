'use client'

import {PageNav} from "@/app/nav";
import {useState} from "react";

export default function Viewer() {
    const [activePage, setActivePage] = useState("map");

    return (
        <main>
            <PageNav activePage={activePage} setPage={setActivePage} />
            <p>{activePage}</p>
        </main>
    )
}