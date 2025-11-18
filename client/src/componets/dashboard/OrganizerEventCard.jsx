import React from 'react'
import { formatDate } from '../../utils/formateDate'
import { Button } from '../ui/Button'

export default function OrganizerEventCard({ event }) {

    return (
        <div className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition">
            <div className="min-w-0 flex-1">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                    {formatDate(event.createdAt)} • {event.participantsCount} participants
                </p>
            </div>
            {/* <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    Edit
                </Button>
                <Button variant="outline" size="sm">
                    View
                </Button>
            </div> */}
        </div>
    )
}
