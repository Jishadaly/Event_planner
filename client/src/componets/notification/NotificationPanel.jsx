import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "../ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useDeleteAllNotifications, useDeleteNotification, useMarkNotificationRead, useNotification } from "../../api/querys/useNotification";
import { useToast } from "../../context/ToastContext";
import NotificationItem from "./NotificationItem";

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, refetchNotifcation } = useNotification();
  const { toast } = useToast();

  const deleteNotif = useDeleteNotification();
  const clearAllNotifi = useDeleteAllNotifications();
  const markNotifi = useMarkNotificationRead();

  let unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  const markAsRead = (id) => {
    markNotifi.mutate(id, {
      onSuccess: () => refetchNotifcation(),
      onError: () => toast('error', 'Error', 'Failed to clear notifications')
    });
  };

  const deleteNotification = (id) => {
    deleteNotif.mutate(id, {
      onSuccess: () => {
        refetchNotifcation();
      },
      onError: (err) => {
        console.error("Delete failed:", err);
        toast('error', 'Failed to delete', 'Please try again later');
      },
    });
  };

  const clearAll = () => {
    clearAllNotifi.mutate(undefined, {
      onSuccess: () => {
        refetchNotifcation();
        toast('success', 'Deleted', 'All notifications cleared');
      },
      onError: () => toast('error', 'Error', 'Failed to clear notifications')
    });
  };

  return (
    <div className="relative">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-16 right-4 w-96 max-h-96 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >

            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {notifications && notifications.length > 0 ? (
              <>
                <div className="overflow-y-auto flex-1">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      onMark={markAsRead}
                      notification={notification}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>

                <div className="p-3 border-t border-border text-center">
                  <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs"> Clear All </Button>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
