import {ChartCard} from "@/app/ChartCard";
import {getPerformanceEntries} from "@/app/api/performanceEntriesApi";
import {SingleMetricCard} from "@/app/SingleMetricCard";

export default async function Home() {
    const performanceEntries = await getPerformanceEntries()

    return (
        <main className="flex flex-col items-center p-24 space-y-6 w-3/5 m-auto">
            <section className="flex flex-row items-stretch justify-center space-x-6 w-full">
                <SingleMetricCard title={'Slowest request'} description={'Resource with highest fetching duration time'}>
                    <p>{performanceEntries.entries[0].duration.toFixed(2)}ms</p>
                    <p className={'text-xs font-normal'}>{performanceEntries.entries[0].shortName}</p>
                </SingleMetricCard>
                <SingleMetricCard title={'Caching'} description={'Average percentage of cached resources'}>
                    {performanceEntries.cachedCount > 0 ? ((performanceEntries.cachedCount / performanceEntries.entries.length) * 100).toFixed(2) : 0}%
                </SingleMetricCard>
            </section>
            <section className="flex flex-row items-stretch justify-center space-x-6 w-full">
                <ChartCard performanceEntries={performanceEntries}/>
            </section>
        </main>
    )
}
