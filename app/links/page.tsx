export default async function Page() {
    const rawLinks = await fetch("http://localhost:3000/api/links", {cache: "no-cache"});
    const links = await rawLinks.json();

    let linkElems = [];
    for (const i in links) {
        const lnk = links[i];
        linkElems.push(<p key={i}>{lnk.location_a}, {lnk.location_b}</p>)
    }

    return (
        <>
            <p className={"mt-5 font-bold"}>Links:</p>
            {linkElems}
        </>
    )
}