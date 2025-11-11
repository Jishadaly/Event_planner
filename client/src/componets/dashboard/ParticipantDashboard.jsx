import { Link } from "react-router-dom"
import { Calendar, BookMarked, CheckCircle, Clock } from "lucide-react"
import { Card } from "../ui/Card"
import CalendarSection from "./CalenderSection"
import StatsCard from "./StatsCard"

export default function ParticipantDashboard() {
  const myEvents = [
    {
      id: "1",
      title: "React Advanced Patterns Workshop",
      date: "Dec 15, 2025",
      time: "10:00 AM",
      status: "upcoming",
      category: "Technology",
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      date: "Dec 20, 2025",
      time: "09:00 AM",
      status: "upcoming",
      category: "Education",
    },
    {
      id: "3",
      title: "AI & Machine Learning Summit 2025",
      date: "Dec 10, 2025",
      time: "08:00 AM",
      status: "upcoming",
      category: "Conference",
    },
  ]

  const pastEvents = [
    {
      id: "4",
      title: "Annual Tech Conference 2025",
      date: "Nov 25, 2025",
      time: "09:00 AM",
      status: "finished",
      category: "Conference",
    },
  ]

  const interestedEvents = [
    {
      id: "5",
      title: "Design Thinking Workshop",
      date: "Dec 18, 2025",
      time: "14:00 PM",
      status: "upcoming",
      category: "Workshop",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here are your upcoming events and recommendations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Upcoming Events" count={myEvents.length} icon={<Calendar/>} />

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Past Events</p>
              <p className="text-3xl font-bold">{pastEvents.length}</p>
            </div>
            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Interested</p>
              <p className="text-3xl font-bold">{interestedEvents.length}</p>
            </div>
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
              <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </Card>
      </div>

      {/* Calendar Section */}
      <CalendarSection />

      {/* Upcoming Events */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Your Upcoming Events</h2>
        <div className="space-y-3">
          {myEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <Card className="p-4 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-lg">{event.title}</p>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
                        {event.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded dark:bg-green-900 dark:text-green-200">
                      Joined
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Interested Events */}
      {interestedEvents.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Events You're Interested In</h2>
          <div className="space-y-3">
            {interestedEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="p-4 hover:shadow-lg transition cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-lg">{event.title}</p>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-200">
                          {event.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded dark:bg-purple-900 dark:text-purple-200">
                        Interested
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Past Events</h2>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <Card key={event.id} className="p-4 opacity-75">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-lg">{event.title}</p>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded dark:bg-gray-900 dark:text-gray-200">
                        {event.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded dark:bg-gray-900 dark:text-gray-200">
                      Completed
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
