import React from 'react'
import { timeAgo } from '../../utils/formateDate'
import { getBackgroundColor } from '../../utils/getColor'
import { getIcon } from '../../utils/getIcon'
import { Trash2, Eye } from 'lucide-react'

export default function NotificationItem({ notification, onDelete, onMark }) {
    return (

        <div
            className={`p-4 border-b border-border hover:bg-muted/50 transition ${!notification.isRead ? getBackgroundColor(notification.type) : ""
                }`}
        >
            <div className="flex gap-3">
                <div className="flex-shrink-0 pt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm">{notification.title}</p>
                        {!notification.isRead && (
                            <>
                                {/* <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" /> */}
                                <Eye className="h-4 w-4 cursor-pointer" onClick={() => onMark(notification._id)} />
                            </>

                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                        {timeAgo(new Date(notification.createdAt)).toString()}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(notification._id)}
                    className="text-muted-foreground hover:text-foreground flex-shrink-0"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>

    )
}
