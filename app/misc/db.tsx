'use server'

import mysql from "mysql2";

export default async function Pool() {
    return mysql.createPool({
        host: "127.0.0.1",
        user: "root",
        password: "Joshua2101",
        database: "train-journeys",
        dateStrings: true // <--- Fix from Josh
    }).promise();
}