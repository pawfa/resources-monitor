import {PerformanceSessions, PerformanceSessionsDto} from "@/app/api/performanceEntriesApi";

export function mapPerformanceSessionsDto(performanceSessionsDto: PerformanceSessionsDto): PerformanceSessions {

    const sessions = performanceSessionsDto.sessions.map((session) => {
        const entries = [];

        let cachedCount = 0;
        for (const request of session.requests) {
            const nameSplitted = request.name.split("/");
            const isRequestCached = isCached(request);

            const entry = {
                ...request,
                shortName: nameSplitted[nameSplitted.length - 1],
                isCrossOrigin: isCrossOrigin(request),
                isCached: isRequestCached
            }
            entries.push(entry);

            if (isRequestCached) {
                cachedCount++
            }
        }
        entries.sort((entry1, entry2) => entry2.duration - entry1.duration)

        return {
            id: session.id,
            timeStamp: session.timestamp,
            entries,
            cachedCount
        }
    })


    return {
        userId: performanceSessionsDto.userId,
        sessions: sessions,
    }
}

export function isCrossOrigin<T extends { requestStart: number }>(entry: T) {
    return entry.requestStart === 0
}

export function isCached<T extends { requestStart: number, transferSize: number }>(entry: T) {
    return !isCrossOrigin(entry) && entry.transferSize === 0
}