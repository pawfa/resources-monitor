'use client'
import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Chart} from "@/app/chart";
import {PerformanceEntries} from "@/app/api/performanceEntriesApi";
import {MultiSelect} from "@/components/ui/MultiSelect";
import {isCached, isCrossOrigin} from "@/app/measuresMappers";

export const ChartCard = ({performanceEntries}: { performanceEntries: PerformanceEntries }) => {

    const [filters, setFilters] = useState<Array<'cache' | 'crossOrigin'>>(['cache' , 'crossOrigin'])
    const chartData = performanceEntries.entries
        .filter((entry) => filters.includes('crossOrigin') ? !isCrossOrigin(entry) : true)
        .filter((entry) => filters.includes('cache') ? !isCached(entry) : true)

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
