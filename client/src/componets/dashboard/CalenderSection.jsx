import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"

export default function CalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  // Mock events
  const eventsByDate = {
    5: [{ id: "1", title: "Community Mixer", time: "18:00", status: "ongoing" }],
    10: [{ id: "2", title: "AI Summit", time: "08:00", status: "upcoming" }],
    15: [{ id: "3", title: "React Workshop", time: "10:00", status: "upcoming" }],
    18: [{ id: "4", title: "Design Workshop", time: "14:00", status: "upcoming" }],
    20: [{ id: "5", title: "Web Dev Bootcamp", time: "09:00", status: "upcoming" }],
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  const getEventColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "finished":
        return "bg-gray-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, idx) => {
          const hasEvents = day && eventsByDate[day]
          return (
            <div
              key={idx}
              className={`aspect-square rounded-lg border border-border p-1 text-xs ${
                day ? "cursor-pointer hover:bg-muted/50" : "bg-muted/20"
              }`}
            >
              {day && (
                <div className="h-full flex flex-col">
                  <span className="font-semibold">{day}</span>
                  {hasEvents && (
                    <div className="flex gap-0.5 flex-wrap mt-auto">
                      {hasEvents.slice(0, 2).map((event) => (
                        <div key={event.id} className={`h-1.5 w-1.5 rounded-full ${getEventColor(event.status)}`} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Ongoing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">Upcoming</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-500" />
          <span className="text-muted-foreground">Finished</span>
        </div>
      </div>
    </Card>
  )
}
