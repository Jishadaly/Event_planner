import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from '../../ui/Card'

export default function EventByCatogoryChart({data}) {
    return (
        <Card className="p-6">
            <h3 className="mb-6 text-lg font-semibold">Events by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={[
                        { category: "Technology", count: 12 },
                        { category: "Education", count: 8 },
                        { category: "Conference", count: 10 },
                        { category: "Networking", count: 7 },
                        { category: "Workshop", count: 5 },
                    ]}
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
