import Link from "@/app/links/link";
import NewLink from "@/app/links/newLink";
import {LinkToAdd} from "@/app/api/addItem/route";

export default async function Page() {
    const rawLinks = await fetch("http://localhost:3000/api/links", {cache: "no-cache"});
    const links = await rawLinks.json();

    // Delete link from database
    async function deleteLink(link: any) {
        'use server'
        console.log("Delete:", link.location_a, "<->", link.location_b);
        // Actually delete it...
    }

    // Add link to database and return result
    async function addLink(locationA: string, locationB: string) {
        'use server'
        const data: LinkToAdd = {type: "link", a: locationA, b: locationB};
        const received = await fetch("http://localhost:3000/api/addItem", {method: "POST", cache: "no-cache", body: JSON.stringify(data)});
        return await received.json();
    }

    let linkElems = [];
    for (const i in links) {
        const lnk = links[i];
        linkElems.push(<Link key={i} link={lnk} removeLink={deleteLink}/>)
    }

    return (
        <div className={"flex flex-col items-center m-4 font-medium"}>
            <NewLink addLink={addLink}/>
            {linkElems}
            <p className={"text-slate-400 -mb-2"}>End of list.</p>
        </div>
    )
}