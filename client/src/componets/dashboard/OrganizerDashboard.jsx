import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Plus, Calendar, Users, TrendingUp, Clock } from "lucide-react"
import CalendarSection from "./CalenderSection"
import { useState } from "react"
import Modal from "../ui/Modal"
import CreateEventForm from "../form/CreateEventForm"
import { useOrganzerDashboard } from "../../api/querys/useDashboard"
import PageLoader from "../common/PageLoader"
import StatsCard from "./StatsCard"
import OrganizerEventCard from "./OrganizerEventCard"

export default function OrganizerDashboard() {

  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const { dashboardData, isLoading, error } = useOrganzerDashboard()

  if (isLoading) return <PageLoader />
  if (error) return <div>Error loading dashboard</div>;

  const { statsData, participantsData, attendanceData, myEventsList } = dashboardData || {};

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Events</h1>
          <p className="text-muted-foreground">Manage and monitor your events</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowCreateEvent(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title='My Events' count={statsData.myEvents} icon={<Calendar />} />
        <StatsCard title='Total Participants' count={statsData.totalParticipants} icon={<Users />} iconBg="bg-green-100 p-3 dark:bg-green-900" iconColor="h-5 w-5 text-green-600 dark:text-green-300" />
        <StatsCard title='Avarage Participants' count={statsData.avgParticipantsPerEvent} icon={<TrendingUp />} iconBg="bg-purple-100 p-3 dark:bg-purple-900" iconColor="text-purple-600 dark:text-purple-300" />
        <StatsCard title='Upcoming Events' count={statsData.upcomingEvents} icon={<Clock />} iconBg="bg-orange-100 p-3 dark:bg-orange-900" iconColor="h-5 w-5 text-orange-600 dark:text-orange-300" />
      </div>

      <CalendarSection />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Participants by Event</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={participantsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="participants" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Registration Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-6 text-lg font-semibold">Your Events</h3>
        <div className="space-y-3">
          {myEventsList.map((event) => (
            <OrganizerEventCard key={event?._id} event={event} />
          ))}
        </div>
      </Card>


      <Modal isOpen={showCreateEvent} onClose={() => setShowCreateEvent(false)}>
        <CreateEventForm onClose={() => setShowCreateEvent(false)} />
      </Modal>
    </div>


  )
}
