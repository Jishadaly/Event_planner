import React from 'react'
import { Card } from '../ui/Card'

export default function StatsCard({ title, count, icon, iconBg = "bg-blue-100 dark:bg-blue-900", iconColor = "text-blue-600 dark:text-blue-300" }) {
    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <p className="text-3xl font-bold">{count}</p>
                </div>
                <div className={`rounded-lg p-3 ${iconBg}`}>
                    {icon && (
                        <div className={iconColor}>
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
