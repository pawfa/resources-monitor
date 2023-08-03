'use client'
import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Chart} from "@/app/chart";
import {PerformanceEntry} from "@/app/api/performanceEntriesApi";
import {MultiSelect} from "@/components/ui/MultiSelect";

export const ChartCard = ({performanceEntries}: { performanceEntries: PerformanceEntry[] }) => {
    const [filters, setFilters] = useState<Array<'cache' | 'crossOrigin'>>(['cache' , 'crossOrigin'])

    if (!performanceEntries) {
        return (
            <Card className={'w-full'}>
                <div className={'flex justify-between'}>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>Average resource fetching duration</CardDescription>
                    </CardHeader>
                    <div className={'m-0 space-x-1.5 p-5 max-w-lg'}>
                        <MultiSelect  selected={filters} setSelected={setFilters} />
                    </div>
                </div>
                <CardContent>
                    No entries
                </CardContent>
            </Card>
        );
    }


    const chartData = performanceEntries
        .filter((entry) => filters.includes('crossOrigin') ? !entry.isCrossOrigin : true)
        .filter((entry) => filters.includes('cache') ? !entry.isCached : true)

    return (
        <Card className={'w-full'}>
            <div className={'flex justify-between'}>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>Average resource fetching duration</CardDescription>
                </CardHeader>
                <div className={'m-0 space-x-1.5 p-5 max-w-lg'}>
                    <MultiSelect selected={filters} setSelected={setFilters} />
                </div>
            </div>
            <CardContent>
                <Chart data={chartData}/>
            </CardContent>
        </Card>
    );
};
