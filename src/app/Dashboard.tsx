'use client'
import React from 'react';
import {DatePicker} from "@/app/DatePicker";
import {SingleMetricCard} from "@/app/SingleMetricCard";
import {ChartCard} from "@/app/ChartCard";
import {DateRange} from "react-day-picker";
import {endOfDay, endOfToday, isWithinInterval, subDays} from "date-fns";
import {PerformanceSessions} from "@/app/api/performanceEntriesApi";

const initialDate = {
    from: subDays(endOfToday(),7),
    to: endOfToday(),
};
export const Dashboard = ({performanceSessions}: {performanceSessions: PerformanceSessions}) => {

    const [date, setDate] = React.useState<DateRange | undefined>(initialDate)

    const sessionsInRange = performanceSessions.sessions.filter((session)=> isWithinInterval(new Date(session.timeStamp),{
        start:date!.from!, end: date?.to ? endOfDay(date.to) : endOfDay(date!.from!)
    })  )

    return (
        <main className="flex flex-col items-center p-24 space-y-6 w-3/5 m-auto">
            <section className={'flex justify-between w-full'}>
                <h1>Dashboard</h1>
                <DatePicker date={date} setDate={setDate} />
            </section>
            <section className="flex flex-row items-stretch justify-center space-x-6 w-full">
                <SingleMetricCard title={'Slowest request'} description={'Resource with highest fetching duration time'}>
                    {sessionsInRange[0] ? <>
                        <p>{sessionsInRange[0].entries[0].duration.toFixed(2)}ms</p>
                        <p className={'text-xs font-normal'}>{sessionsInRange[0].entries[0].shortName}</p>
                    </> : 'no recorded session'}

                </SingleMetricCard>
                <SingleMetricCard title={'Caching'} description={'Average percentage of cached resources'}>
                    {sessionsInRange[0] ? <>
                    {sessionsInRange[0].cachedCount > 0 ? ((sessionsInRange[0].cachedCount / sessionsInRange[0].entries.length) * 100).toFixed(2) : 0}%
                    </>
                        : 'no recorded session'}
                </SingleMetricCard>
            </section>
            <section className="flex flex-row items-stretch justify-center space-x-6 w-full">
                <ChartCard performanceEntries={sessionsInRange[0]?.entries}/>
            </section>
        </main>
    );
};