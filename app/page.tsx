export default async function Home() {
    const data = await fetch("http://localhost:3000/api/stations");
    const stations = await data.json();

    const elems = [];
    for (let i = 0; i < stations.length; i++) {
        const item = stations[i];
        elems.push(<p key={item.crs}>{item.crs}, {item.name}, {item.lat}, {item.long}</p>)
    }

  return (
    <main className="flex flex-col items-center justify-center min-h-dvh text-center">
        <div>
            {elems}
        </div>
    </main>
  );
}
