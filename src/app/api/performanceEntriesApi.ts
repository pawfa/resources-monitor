import {isCached} from "@/app/measuresMappers";

export interface RequestsDto {
    id: string
    requests: Array<{
        name: string
        duration: number
        responseStart: number
        requestStart: number
        transferSize: number
    }>
}

export interface PerformanceEntry {
    name: string
    shortName: string
    duration: number
    requestStart: number
    transferSize: number
}

export interface PerformanceEntries {
    id: string
    entries: PerformanceEntry[]
    cachedCount: number
}

export async function getPerformanceEntries(): Promise<PerformanceEntries> {
    const res = await fetch('http://localhost:3000/api/requests', {method: "GET", cache: "no-cache"}, )

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return mapRequestsDTO(JSON.parse(await res.json()))
}

export function mapRequestsDTO(requestsDto: RequestsDto):PerformanceEntries {

    const entries = [];

    let cachedCount = 0;
    for (const request of requestsDto.requests) {
        const nameSplitted = request.name.split("/");
        const entry = {
            ...request,
            shortName: nameSplitted[nameSplitted.length -1]
        }
        entries.push(entry);

        if (isCached(entry)) {
            cachedCount++
        }
    }

    return {
        id: requestsDto.id,
        entries: entries.sort((entry1,entry2)=> entry2.duration - entry1.duration),
        cachedCount
    }
}