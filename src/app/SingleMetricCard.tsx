'use client'
import React, {ReactNode} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

interface SingleCardProps {
    title: string
    description?: string
    children: ReactNode
}
export const SingleMetricCard = ({title, description,children}:SingleCardProps ) => {
    return (
        <Card className={'w-full'}>
            <CardHeader>
                <CardTitle className={'text-base'}>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className={'text-xl font-bold'}>
                {children}
            </CardContent>
        </Card>
    );
};
