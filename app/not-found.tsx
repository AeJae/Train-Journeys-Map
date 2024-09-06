export default function NotFoundPage() {
    return(
        <div id={"container"} className={"flex justify-center items-center w-full h-[calc(100dvh-4rem)] bg-black"}>
            <div id={"error"} className={"flex justify-center items-center h-24 w-96 bg-blue-950 rounded-2xl drop-shadow-[0_0_200px_#0000ff]"}>
                <p className={"pr-4 border-r border-r-blue-400 text-blue-400 text-2xl"}>404</p>
                <p className={"pl-4 border-l border-l-transparent text-blue-400 text-2xl"}>Page not found.</p>
            </div>
        </div>
    )
}