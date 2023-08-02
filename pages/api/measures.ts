const fs = require('fs')
export default function handler(req:any, res:any) {
    if (req.method === 'PUT') {
        console.log('stored')
        res.status(200).json("OK")
    } else {
        res.status(200).json(fs.readFileSync('examplecalls.json').toString())
    }
}