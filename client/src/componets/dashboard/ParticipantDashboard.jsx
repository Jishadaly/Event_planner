import { Calendar, BookMarked, CheckCircle } from "lucide-react"
import CalendarSection from "./CalenderSection"
import StatsCard from "./StatsCard"
import { useParticipantDashboard } from "../../api/querys/useDashboard"
import PageLoader from "../common/PageLoader"
import ParticipantEventCard from "./ParticipantEventCard"

export default function ParticipantDashboard() {
  const { dashboardData, isLoading, error } = useParticipantDashboard()

  if (isLoading) return <PageLoader />
  if (error) return <div>Error loading dashboard</div>;

  const { stats, myEvents, pastEvents } = dashboardData || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here are your upcoming events and recommendations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Upcoming Events" count={stats.upcomingCount} icon={<Calendar />} />
        <StatsCard title="Past Events" count={stats.completedCount} icon={<CheckCircle />} iconBg="bg-green-100 p-3 dark:bg-green-900" iconColor="text-green-600 dark:text-green-300" />
        <StatsCard title="Total Joined" count={stats.totalJoined} icon={<BookMarked />} iconBg="bg-purple-100 p-3 dark:bg-purple-900" iconColor="text-purple-600 dark:text-purple-300" />
      </div>

      <CalendarSection />

      <div>
        <h2 className="mb-4 text-2xl font-bold">Your Upcoming Events</h2>
        <div className="space-y-3 ">
          {myEvents.map((event) => (
            <ParticipantEventCard key={event._id} event={event} />
          ))}
        </div>
      </div>

      {pastEvents.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Past Events</h2>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <ParticipantEventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
