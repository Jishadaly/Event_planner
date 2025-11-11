"use client"

import { Card } from "../ui/Card"
import { Button } from "../ui/Button" 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { Plus, Calendar, Users, TrendingUp, Clock } from "lucide-react"
import CalendarSection from "./CalenderSection"

const mockOrganizerStats = {
  myEvents: 5,
  totalParticipants: 124,
  avgParticipantsPerEvent: 25,
  upcomingEvents: 2,
}

const participantsData = [
  { name: "Event 1", participants: 32 },
  { name: "Event 2", participants: 28 },
  { name: "Event 3", participants: 45 },
  { name: "Event 4", participants: 19 },
]

const attendanceData = [
  { week: "Week 1", registrations: 10 },
  { week: "Week 2", registrations: 15 },
  { week: "Week 3", registrations: 22 },
  { week: "Week 4", registrations: 28 },
]

export default function OrganizerDashboard() {
  return (
    <div className="space-y-8">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Events</h1>
          <p className="text-muted-foreground">Manage and monitor your events</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">My Events</p>
              <p className="text-3xl font-bold">{mockOrganizerStats.myEvents}</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Participants</p>
              <p className="text-3xl font-bold">{mockOrganizerStats.totalParticipants}</p>
            </div>
            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
              <Users className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg per Event</p>
              <p className="text-3xl font-bold">{mockOrganizerStats.avgParticipantsPerEvent}</p>
            </div>
            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
              <p className="text-3xl font-bold">{mockOrganizerStats.upcomingEvents}</p>
            </div>
            <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900">
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
        </Card>
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

      {/* My Events List */}
      <Card className="p-6">
        <h3 className="mb-6 text-lg font-semibold">Your Events</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Event {i}: Professional Development</p>
                <p className="text-sm text-muted-foreground">
                  Dec {10 + i}, 2025 • {20 + i * 5} participants
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
