interface PerformanceEntryDTO {
    name: string
    responseStart: number
    requestStart: number
    responseStatus: number
    transferSize: number
}

export interface MeasuresDTO {
    id: string
    data: PerformanceEntryDTO[]
}

export async function getData(): Promise<Measures> {
    const res = await fetch('http://localhost:3000/api/measures', {method: "GET"})

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const measuresDto:MeasuresDTO = JSON.parse(await res.json())

    return mapMeasuresDTO(measuresDto)
}

interface Metrics {
    name: string
    requestTime: number
    responseStatus: number
    transferSize: number
}
export interface Measures {
    id:string
    metrics: Metrics[]
}
export function mapMeasuresDTO(measures: MeasuresDTO):Measures {
    return {
        id: measures.id,
        metrics: measures.data.map((entry) => {
            return {
                name: entry.name,
                requestTime: entry.responseStart - entry.requestStart,
                responseStatus: entry.responseStatus,
                transferSize: entry.transferSize
            }
        })
    }
}