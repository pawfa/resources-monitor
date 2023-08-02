'use client'
import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Toggle} from "@/components/ui/toggle"
import {useFilters} from "@/app/useFilters";
import {Measures} from "@/app/api/measuresApi";

ChartJS.register(...registerables);

export const Chart = (props: { data: Measures['metrics'] }) => {

    const {filter404Data, filterCachedData, chartData} = useFilters(props);

    return (
        <div>
            <Bar data={
                {
                    labels: chartData.map((row:any) => row.name),
                    datasets: [
                        {
                            label: 'Request time in ms',
                            indexAxis: 'y',
                            data: chartData.map((row:any) => row.requestTime)
                        }
                    ],
                }
            }/>
            <Toggle onClick={filter404Data}>filter out 404</Toggle>
            <Toggle onClick={filterCachedData}>filter cacheddata</Toggle>
        </div>
    );
};