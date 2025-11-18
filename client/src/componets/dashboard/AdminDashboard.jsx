import CalendarSection from "./CalenderSection"
import EventListTable from "./EventList-table"
import UserListTable from "./UserList-table"
import StatsCard from "./StatsCard"
import EventStatusChart from "./charts/EventStatus-chart"
import EventOvertimeChart from "./charts/EventOvertime-chart"
import UserGrowthChart from "./charts/UserGrowth-chart"
import DashBarChart from "./charts/DashBarChart"
import { useAdminDashboard } from "../../api/querys/useDashboard"
import { statsUIConfig } from "../../utils/statusUtil"
import PageLoader from "../common/PageLoader"

export default function AdminDashboard() {

    const { dashboardData, isLoading, error } = useAdminDashboard();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading dashboard</div>;

    const {
        statsData,
        eventChartData,
        eventsOverTimeData,
        usersOverTimeData,
        eventByCategoryData,
        recentEvents,
        recentUsers
    } = dashboardData || {};

    const mergedStats = statsData?.map(item => ({
        ...item,
        ...statsUIConfig[item.title]
    }));


    if (isLoading) return <PageLoader />
    if (error) return <div>Error loading dashboard</div>;

    return (
        <div className="space-y-10">
            {/* Stats Cards section */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {mergedStats.length > 0 && mergedStats.map((stats, index) =>
                    <StatsCard title={stats.title} count={stats.count} iconBg={stats.iconBg} iconColor={stats.iconColor} icon={stats.icon} key={index + Math.random()} />
                )}
            </section>

            {/* Charts section */}
            <section className="grid gap-6 lg:grid-cols-2">
                <EventStatusChart data={eventChartData} />
                <EventOvertimeChart data={eventsOverTimeData} />
                <UserGrowthChart data={usersOverTimeData} />
                <DashBarChart data={eventByCategoryData} title="Events by Category" />
            </section>

            <section><CalendarSection /></section>

            <section className="grid gap-6 lg:grid-cols-2">
                <EventListTable events={recentEvents} />
                <UserListTable users={recentUsers} />
            </section>
        </div>
    )
}
