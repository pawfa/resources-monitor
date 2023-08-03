import {db} from "@/app/database";
import {NextApiRequest} from "next";

export default async function handler(req:NextApiRequest, res:any) {
    await db.read();

    if (req.method === 'GET') {
        const data = db.data.find((record)=> record.userId && (record.userId === 'id'));
        await db.write();
        res.status(200).json(data)
    }
}