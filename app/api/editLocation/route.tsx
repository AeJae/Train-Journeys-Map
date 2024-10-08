import {LocationEditOverAPI} from "@/app/misc/interfaces";
import {NextResponse} from "next/server";
import Pool from "@/app/misc/db";

// Error JSON creator for location edits.
function errorJSON(e: any) {
    if (e.code === "ER_CON_COUNT_ERROR") {
        return {msg: "Database offline due to overloading."};
    } else if (e.code === "ECONNREFUSED") {
        return {msg: "Database unavailable."};
    } else if (e.code === "ER_DUP_ENTRY") {
        return {msg: "A location with this name already exists."}
    } else {
        console.log(e);
        return {msg: "An unknown error occurred."};
    }
}

// RETURN FORMAT: {success: boolean, msg: string}.
export async function POST(req: Request) {
    const pool = await Pool();

    const data: LocationEditOverAPI = await req.json();

    // Name edits
    if (data.editType === "name" && data.name && data.newName) {
        try {
            await pool.query("UPDATE locations SET name = ? WHERE name = ?", [data.newName, data.name]);
            return NextResponse.json({success: true, msg: "Success."});
        } catch (error) {
            console.log(error);
            return NextResponse.json(errorJSON(error));
        }
    // Latitude and longitude edits
    } else if (data.editType === "latLong" && data.name && "newLat" in data && "newLong" in data) {
        try {
            await pool.query("UPDATE locations SET lat = ?, `long` = ? WHERE name = ?", [data.newLat, data.newLong, data.name]);
            return NextResponse.json({success: true, msg: "Success."});
        } catch (error) {
            console.log(error);
            return NextResponse.json(errorJSON(error));
        }
    // Location type edits
    } else if (data.editType === "isStation" && data.name && "newIsStation" in data) {
        try {
            await pool.query("UPDATE locations SET is_station = ? WHERE name = ?", [data.newIsStation, data.name]);
            return NextResponse.json({success: true, msg: "Success."});
        } catch (error) {
            console.log(error);
            return NextResponse.json(errorJSON(error));
        }
    } else {
        return NextResponse.json({msg: "Malformed request."});
    }
}