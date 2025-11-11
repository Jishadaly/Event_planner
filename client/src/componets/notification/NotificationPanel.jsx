import { useState } from "react"
import { Bell, X, CheckCircle, AlertCircle, Info, Trash2 } from "lucide-react"
import { Button } from "../ui/Button"

const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "Event Joined",
    message: "You successfully joined React Advanced Patterns Workshop",
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Event Reminder",
    message: "AI & Machine Learning Summit starts in 3 hours",
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New Message",
    message: "Tech Academy sent a message to the event chat",
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: "4",
    type: "warning",
    title: "Event Status Changed",
    message: "Web Development Bootcamp is now ongoing",
    timestamp: new Date(Date.now() - 172800000),
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Registration Confirmed",
    message: "Design Thinking Workshop registration confirmed",
    timestamp: new Date(Date.now() - 259200000),
    read: true,
  },
]

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950"
      case "warning":
        return "bg-orange-50 dark:bg-orange-950"
      case "info":
        return "bg-blue-50 dark:bg-blue-950"
      default:
        return "bg-muted"
    }
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const formatTime = (date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-lg transition"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {isOpen && (
        <div className="fixed top-16 right-4 w-96 max-h-96 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Notification List */}
          {notifications.length > 0 ? (
            <>
              <div className="overflow-y-auto flex-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-border hover:bg-muted/50 transition ${
                      !notification.read ? getBackgroundColor(notification.type) : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 pt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm">{notification.title}</p>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-muted-foreground hover:text-foreground flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border text-center">
                <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
                  Clear All
                </Button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
