import { Calendar, Clock } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate, formatTime } from '../../utils/formateDate'
import { Card } from '../ui/Card'

export default function ParticipantEventCard({ event }) {
    return (
        <Link to={`/events/${event.id}`}>
            <Card className="p-4 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-lg">{event.title}</p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                                {event.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {formatDate(event.startTime)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatTime(event.startTime)}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded dark:bg-green-900 dark:text-green-200">
                            Joined
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
