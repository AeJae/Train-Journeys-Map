import {BaseItem, LinkOverAPI, LocationCreateOverAPI} from "@/app/misc/interfaces";
import {NextResponse} from "next/server";
import Pool from "@/app/misc/db";

// Error JSON creator for link insertions.
function errorJSON(e: any) {
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
        return {msg: "At least one of the entered locations does not exist."};
    } else if (e.code === "ER_DUP_ENTRY") {
        return {msg: "This entry already exists."};
    } else if (e.code === "ER_CON_COUNT_ERROR") {
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

        // Check if location A and B are the same
        if (link.a === link.b) {
            return NextResponse.json({msg: "Location A and B cannot be the same."})
        }

        // INSERT INTO TABLE
        try {
            // Check for the same link but in reverse
            const reversedDuplicate: any = (await pool.query("SELECT 1 FROM links WHERE location_a = ? AND location_b = ?", [link.b, link.a]))[0];
            if (reversedDuplicate && reversedDuplicate.length !== 0) {
                return NextResponse.json({msg: "This entry already exists (in reverse)."})
            }

            // Otherwise attempt to add the item to the database.
            await pool.query("INSERT INTO links VALUES (?, ?);", [link.a, link.b]);
            return NextResponse.json({success: true, msg: "Success"});
        // HANDLE ERRORS
        } catch (error: any) {
            return NextResponse.json(errorJSON(error));
        }
    } else if (data.type === "location") {
        const loc = data as LocationCreateOverAPI;

        // INSERT INTO TABLE
        try {
            await pool.query("INSERT INTO locations VALUES (?, ?, ?, ?)", [loc.name, loc.isStation, loc.lat, loc.long]);
            return NextResponse.json({success: true, msg: "Success"});
        } catch (error: any) {
            return NextResponse.json(errorJSON(error));
        }
    } else {
        return NextResponse.json({msg: "Unknown data type."});
    }
}