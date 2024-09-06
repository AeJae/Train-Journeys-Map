import Link from "@/app/links/link";

export default async function Page() {
    const rawLinks = await fetch("http://localhost:3000/api/links", {cache: "no-cache"});
    const links = await rawLinks.json();

    async function deleteLink(link: any) {
        'use server'
        console.log("Delete:", link.location_a, "<->", link.location_b);
        // Actually delete it...
    }

    let linkElems = [];
    for (const i in links) {
        const lnk = links[i];
        linkElems.push(<Link key={i} link={lnk} removeLink={deleteLink}/>)
    }

    return (
        <div className={"flex flex-col items-center m-4 font-medium"}>
            {linkElems}
            <p className={"text-slate-400 -mb-2"}>End of list.</p>
        </div>
    )
}