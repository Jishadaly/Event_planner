import { Users, CalendarIcon, TrendingUp, Activity } from "lucide-react"
import CalendarSection from "./CalenderSection"
import EventListTable from "./EventList-table"
import UserListTable from "./UserList-table"
import StatsCard from "./StatsCard"
import EventStatusChart from "./charts/EventStatus-chart"
import EventOvertimeChart from "./charts/EventOvertime-chart"
import UserGrowthChart from "./charts/UserGrowth-chart"
import EventByCatogoryChart from "./charts/EventByCatogory-chart"

const statsData = [
    {
        title: "Total Events",
        count: 42,
        icon: <CalendarIcon className="h-5 w-5" />,
        iconBg: "bg-blue-100 dark:bg-blue-900",
        iconColor: "text-blue-600 dark:text-blue-300",
    },
    {
        title: "Total Users",
        count: 156,
        icon: <Users className="h-5 w-5" />,
        iconBg: "bg-green-100 dark:bg-green-900",
        iconColor: "text-green-600 dark:text-green-300",
    },
    {
        title: "Upcoming Events",
        count: 18,
        icon: <TrendingUp className="h-5 w-5" />,
        iconBg: "bg-purple-100 dark:bg-purple-900",
        iconColor: "text-purple-600 dark:text-purple-300",
    },
    {
        title: "Ongoing Events",
        count: 2,
        icon: <Activity className="h-5 w-5" />,
        iconBg: "bg-orange-100 dark:bg-orange-900",
        iconColor: "text-orange-600 dark:text-orange-300",
    },
]
const eventChartData = [
    { name: "Upcoming", value: 18 },
    { name: "Ongoing", value: 2 },
    { name: "Finished", value: 12 },
]
const eventsOverTimeData = [
    { month: "Jan", events: 5 },
    { month: "Feb", events: 8 },
    { month: "Mar", events: 6 },
    { month: "Apr", events: 9 },
    { month: "May", events: 12 },
    { month: "Jun", events: 10 },
]
const usersOverTimeData = [
    { month: "Jan", users: 20 },
    { month: "Feb", users: 35 },
    { month: "Mar", users: 50 },
    { month: "Apr", users: 75 },
    { month: "May", users: 120 },
    { month: "Jun", users: 156 },
]
const eventByCatogoryData = [
    { category: "Technology", count: 12 },
    { category: "Education", count: 8 },
    { category: "Conference", count: 10 },
    { category: "Networking", count: 7 },
    { category: "Workshop", count: 5 },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* Stats Cards section */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsData.length > 0 && statsData.map((stats) =>
                    <StatsCard title='Totel Events' count={stats.count} iconBg={stats.iconBg} iconColor={stats.iconColor} icon={stats.icon} key={stats.count} />
                )}
            </section>

            {/* Charts section */}
            <section className="grid gap-6 lg:grid-cols-2">
                <EventStatusChart data={eventChartData} />
                <EventOvertimeChart data={eventsOverTimeData} />
                <UserGrowthChart data={usersOverTimeData} />
                <EventByCatogoryChart data={eventByCatogoryData} />
            </section>

            <section><CalendarSection /></section>

            <section className="grid gap-6 lg:grid-cols-2">
                <EventListTable />
                <UserListTable />
            </section>
        </div>
    )
}
