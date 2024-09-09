import {LocationEditOverAPI} from "@/app/misc/interfaces";
import {NextResponse} from "next/server";
import Pool from "@/app/misc/db";

// RETURN FORMAT: {success: boolean, msg: string}.
export async function POST(req: Request) {
    const pool = await Pool();

    const data: LocationEditOverAPI = await req.json();
    console.log(data);

    // Name edits
    if (data.editType === "name" && data.name && data.newName) {
        try {
            await pool.query("UPDATE locations SET name = ? WHERE name = ?", [data.newName, data.name]);
            return NextResponse.json({success: true, msg: "Success."});
        } catch (error) {
            console.log(error);
            return NextResponse.json({msg: "Error."});
        }
    // Latitude and longitude edits
    } else if (data.editType === "latLong" && data.name && data.newLat && data.newLong) {
        try {
            await pool.query("UPDATE locations SET lat = ?, `long` = ? WHERE name = ?", [data.newLat, data.newLong, data.name]);
            return NextResponse.json({success: true, msg: "Success."});
        } catch (error) {
            console.log(error);
            return NextResponse.json({msg: "Error"});
        }
    }
    return NextResponse.json({msg: "Service unavailable."});

}