import {NextResponse} from "next/server";
import Pool from "@/app/misc/db";

export async function GET() {
    const pool = await Pool();

    const sql_query = "SELECT a.lat a_lat, a.long a_lng, b.lat b_lat, b.long b_lng FROM links JOIN locations AS a " +
        "ON a.name = links.location_a JOIN locations AS b ON b.name = links.location_b;"

    try {
        const [data] = await pool.query(sql_query);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return NextResponse.json({msg: "Error"})
    }
}