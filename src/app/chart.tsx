'use client'
import React from 'react';
import {Chart as ChartJS, registerables} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {PerformanceEntry} from "@/app/api/performanceEntriesApi";

ChartJS.register(...registerables);

export const Chart = ({data}: {data: PerformanceEntry[]}) => {

    return (
            <Bar data={
                {
                    labels: data.map((row) => row.shortName),
                    datasets: [
                        {
                            label: 'Request time in ms',
                            indexAxis: 'y',
                            data: data.map((row) => row.duration)
                        }
                    ],
                }
            }/>
    );
};