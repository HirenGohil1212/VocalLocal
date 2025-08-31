'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { earningsData } from '@/lib/data';
import { DollarSign, Wallet, Calendar } from 'lucide-react';

export function EarningsDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <DollarSign/>
            Earnings
        </CardTitle>
        <CardDescription>Your financial performance at a glance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
            <Card className="p-4">
                <Wallet className="h-6 w-6 mx-auto text-primary mb-2"/>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">${earningsData.thisWeek.toFixed(2)}</p>
            </Card>
            <Card className="p-4">
                <Calendar className="h-6 w-6 mx-auto text-primary mb-2"/>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">${earningsData.thisMonth.toFixed(2)}</p>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Daily Earnings</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                <BarChart data={earningsData.dailyEarnings}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                        contentStyle={{ 
                            background: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))', 
                            borderRadius: 'var(--radius)' 
                        }} 
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                    <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card className="p-4 text-center">
            <p className="text-lg text-muted-foreground">Total Earnings</p>
            <p className="text-4xl font-headline font-bold text-primary">${earningsData.total.toFixed(2)}</p>
        </Card>
      </CardContent>
    </Card>
  );
}
