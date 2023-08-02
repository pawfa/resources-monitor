import React, {useState} from "react";
import {PerformanceEntry} from "@/app/api/performanceEntriesApi";
import {isCached, isCrossOrigin} from "@/app/measuresMappers";

interface Filters {
    cache: boolean,
    crossOrigin: boolean
}

export function useFilters(entries: PerformanceEntry[]) {

    const [filters, setFilters] = useState<Filters>({
        cache: true,
        crossOrigin: true
    })

    const chartData = entries
        .filter((entry) => !filters.crossOrigin ? !isCrossOrigin(entry) : true)
        .filter((entry) => !filters.cache ? !isCached(entry) : true)

    const filterData = (isPressed: boolean,filter: keyof Filters) => {
        setFilters((filters) => ({
            ...filters,
            [filter]: isPressed
        }))
    }

    return {filterData, chartData, filters};
}