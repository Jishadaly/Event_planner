import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from '../../ui/Card'

export default function DashBarChart({ data, title }) {
    return (
        <Card className="p-6">
            <h3 className="mb-6 text-lg font-semibold">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
