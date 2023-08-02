import {useState} from "react";
import {Measures} from "@/app/api/measuresApi";

export function useFilters(props: { data: Measures['metrics'] }) {

    const [filters, setFilters] = useState<{ 404: boolean, cache: boolean }>({
        404: false,
        cache: false,
    })
    const filter404Data = (event: any) => {
        const isActive = event.target.getAttribute('aria-pressed') === 'true';
        setFilters((filters) => ({
            ...filters,
            404: !isActive
        }))
    }

    const filterCachedData = (event: any) => {
        const isActive = event.target.getAttribute('aria-pressed') === 'true';
        setFilters((filters) => ({
            ...filters,
            cache: !isActive
        }))
    }

    const chartData = props.data
        .filter((entry) => filters.cache ? !isCached(entry) : true)
        .filter((entry) => filters["404"] ? !is404(entry) : true)


    return {filter404Data, filterCachedData, chartData};
}

function isCached(entry: any) {
    return entry.transferSize === 0
}

function is404(entry: any) {
    return entry.responseStatus === 404
}