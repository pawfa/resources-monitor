import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

interface Data {
    userId: string
    sessions: [
        {
            id: string
            timestamp: string
            requests: any[]
        }
    ]
}

const adapter = new JSONFile<Data[]>(file)
const defaultData: Data[] = []
export const db = new Low<Data[]>(adapter, defaultData)