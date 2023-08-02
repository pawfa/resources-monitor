import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Chart} from "@/app/chart";
import {PerformanceEntries} from "@/app/api/performanceEntriesApi";

export const ChartCard = ({performanceEntries}: {performanceEntries: PerformanceEntries}) => {

    return (
        <Card className={'w-full'}>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Average resource fetching duration</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart performanceEntries={performanceEntries} />
            </CardContent>
        </Card>
    );
};
