import { CalendarIcon, Users, TrendingUp, Activity } from "lucide-react";

export const statsUIConfig = {
    "Total Events": {
        icon: <CalendarIcon className="h-5 w-5" />,
        iconBg: "bg-blue-100 dark:bg-blue-900",
        iconColor: "text-blue-600 dark:text-blue-300",
    },
    "Total Users": {
        icon: <Users className="h-5 w-5" />,
        iconBg: "bg-green-100 dark:bg-green-900",
        iconColor: "text-green-600 dark:text-green-300",
    },
    "Upcoming Events": {
        icon: <TrendingUp className="h-5 w-5" />,
        iconBg: "bg-purple-100 dark:bg-purple-900",
        iconColor: "text-purple-600 dark:text-purple-300",
    },
    "Ongoing Events": {
        icon: <Activity className="h-5 w-5" />,
        iconBg: "bg-orange-100 dark:bg-orange-900",
        iconColor: "text-orange-600 dark:text-orange-300",
    }
};
