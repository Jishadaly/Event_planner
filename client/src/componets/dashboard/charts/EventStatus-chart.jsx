import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from '../../ui/Card'

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"]


export default function EventStatusChart({data}) {
    return (
        <div>
            <Card className="p-6">
                <h3 className="mb-6 text-lg font-semibold">Event Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
