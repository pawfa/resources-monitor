import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Chart} from "@/app/chart";
import {getData} from "@/app/api/measuresApi";

export const Show = async () => {
    const measures = await getData()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Overview description</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart data={measures.metrics} />
            </CardContent>
        </Card>
    );
};

