'use client'
import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Toggle} from "@/components/ui/toggle"
import {useFilters} from "@/app/useFilters";
import {PerformanceEntries} from "@/app/api/performanceEntriesApi";

ChartJS.register(...registerables);

export const Chart = ({performanceEntries}: {performanceEntries: PerformanceEntries}) => {

    const {filterData, chartData,filters} = useFilters(performanceEntries.entries);

    return (
        <div>
            <Bar data={
                {
                    labels: chartData.map((row) => row.shortName),
                    datasets: [
                        {
                            label: 'Request time in ms',
                            indexAxis: 'y',
                            data: chartData.map((row) => row.duration)
                        }
                    ],
                }
            }/>
            <Toggle pressed={filters.cache} onPressedChange={(event)=>filterData(event, 'cache')}>Cached</Toggle>
            <Toggle pressed={filters.crossOrigin} onPressedChange={(event)=>filterData(event, 'crossOrigin')}>Cross origin</Toggle>
        </div>
    );
};