import {PerformanceEntry} from "@/app/api/performanceEntriesApi";

export function isCrossOrigin(entry: PerformanceEntry) {
    return entry.requestStart === 0
}
export function isCached(entry: PerformanceEntry) {
    return !isCrossOrigin(entry) && entry.transferSize === 0
}