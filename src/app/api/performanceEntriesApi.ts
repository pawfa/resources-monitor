import {mapPerformanceSessionsDto} from "@/app/api/performanceEntriesMappers";

export interface PerformanceSessionsDto {
    userId: string
    sessions: Array<{
        id: string
        timestamp: number
        requests: Array<{
            name: string
            duration: number
            responseStart: number
            requestStart: number
            transferSize: number
        }>
    }>
}

export interface PerformanceSessions {
    userId: string
    sessions: Array<{
        id: string
        timeStamp: number
        entries: PerformanceEntry[]
        cachedCount: number
    }>
}

export interface PerformanceEntry {
    name: string
    shortName: string
    duration: number
    isCrossOrigin: boolean
    isCached: boolean
    requestStart: number
    transferSize: number
}

export async function getPerformanceSessions(): Promise<PerformanceSessions> {
    const res = await fetch('http://localhost:3001/api/requests/id', {method: "GET", cache: "no-cache"}, )

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()

    return mapPerformanceSessionsDto(data)
}

