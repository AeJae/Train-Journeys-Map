import {NextResponse} from "next/server";
import Pool from "@/app/misc/db";

export async function GET() {
    const pool = await Pool();

    try {
        const [data] = await pool.query("SELECT * FROM links ORDER BY location_a;");
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return NextResponse.json({msg: "Error"})
    }
}