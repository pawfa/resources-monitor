import {db} from "@/app/database";
import {NextApiRequest} from "next";

export default async function handler(req:NextApiRequest, res:any) {
    await db.read();

    if (req.method === 'PUT') {
        const body = JSON.parse(req.body);
        const currentUser = db.data.find((record)=> record.userId && (record.userId === body.id));
        if (currentUser) {
            const currentSession = currentUser.sessions.find((session)=> session.id === body.sessionId);
            if (currentSession) {
                currentSession.requests.push(...body.requests)
            } else {
                const newSessionEntry = {
                    id: body.sessionId,
                    timestamp: body.sessionTimestamp,
                    requests: body.requests
                };
                currentUser.sessions.push(newSessionEntry)
            }
        } else {
            const newUserEntry = {
                id: req.query.id,
                sessions: [
                    {
                        id: body.sessionId,
                        timestamp: body.sessionTimestamp,
                        requests: body.requests
                    }
                ]
            };

            db.data.push(newUserEntry as any)
        }
        await db.write()
        res.status(200).json("OK")
    } else if (req.method === 'GET') {
        const data = db.data.find((record)=> record.userId && (record.userId === 'id'));

        res.status(200).json(data)
    }
}