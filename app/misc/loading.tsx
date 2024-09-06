// Uses React Spinners (https://mhnpd.github.io/react-loader-spinner)
'use client'

import {Triangle} from "react-loader-spinner";

export function TriangleLoader({text}: {text: string}) {
    return (
        <div className={"flex flex-col mt-20 w-full justify-center items-center"}>
            <Triangle
                visible={true}
                height={80}
                width={80}
                color={"#63738a"}
                ariaLabel={"triangle-loading"}
                wrapperStyle={{}}
                wrapperClass=""
            />
            <p className={"mt-2 text-xl text-slate-700"}>{text}</p>
        </div>
    )
}