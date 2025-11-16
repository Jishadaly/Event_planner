import { AlertCircle, Bell, CheckCircle, Info } from "lucide-react"

export const getIcon = (type) => {
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