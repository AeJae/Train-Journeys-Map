import {BaseItem, LinkOverAPI, LocationDeleteOverAPI} from "@/app/misc/interfaces";
import {NextResponse} from "next/server";
import Pool from "@/app/misc/db";

// Error JSON creator for link deletions.
function errorJSON(e: any) {
    if (e.code === "ER_CON_COUNT_ERROR") {
        return {msg: "Database offline due to overloading."};
    } else if (e.code === "ECONNREFUSED") {
        return {msg: "Database unavailable."};
    } else {
        console.log(e);
        return {msg: "An unknown error occurred."};
    }
}

// RETURN FORMAT: {success: boolean, msg: string}.
export async function POST(req: Request) {
    const pool = await Pool();

    const data: BaseItem = await req.json();

    if (data.type === "link") {
        const link = data as LinkOverAPI;

        // DELETE FROM TABLE
        try {
            await pool.query("DELETE FROM links WHERE location_a = ? AND location_b = ?", [link.a, link.b]);
            return NextResponse.json({success: true, msg: "Success."});
        // HANDLE ERRORS
        } catch (error: any) {
            return NextResponse.json(errorJSON(error));
        }
    } else if (data.type === "location") {
        const loc = data as LocationDeleteOverAPI;

        // DELETE FROM TABLE
        try {
            await pool.query("DELETE FROM locations WHERE name = ?", [loc.name]);
            return NextResponse.json({success: true, msg: "Success."});
        } catch (error: any) {
            return NextResponse.json(errorJSON(error));
        }
    } else {
        return NextResponse.json({msg: "Unknown data type."})
    }
}