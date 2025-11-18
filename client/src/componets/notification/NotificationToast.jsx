import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function NotificationToast({
  type = "info",
  title,
  message,
  duration = 3000,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => onClose?.(), 500) // wait for fade-out
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const styles = {
    success: {
      bg: "bg-green-50 dark:bg-green-950",
      border: "border-green-200 dark:border-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />,
    },
    warning: {
      bg: "bg-orange-50 dark:bg-orange-950",
      border: "border-orange-200 dark:border-orange-800",
      icon: <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950",
      border: "border-red-200 dark:border-red-800",
      icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950",
      border: "border-blue-200 dark:border-blue-800",
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    },
  }[type]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ type: "keyframes", stiffness: 500, damping: 15 }}
        className={`relative w-96 p-4 rounded-lg border shadow-lg z-50 ${styles.bg} ${styles.border}`}
      >
        <div className="flex gap-3 items-start">
          <div className="flex-shrink-0">{styles.icon}</div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs text-muted-foreground mt-1">{message}</p>
          </div>
          <button
            onClick={() => {
              setTimeout(() => onClose?.(), 300)
            }}
            className="text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
