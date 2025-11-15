import React from 'react'

export default function MessageCard({ message, currUserId }) {
    return (
        <div className="flex gap-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
                {message.avatar}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <p className="text-sm font-semibold">{message.userId === currUserId ? "You" : message.userName}</p>
                    <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                </div>
                <p className="text-sm text-foreground break-words">{message.message}</p>
            </div>
        </div>
    )
}
