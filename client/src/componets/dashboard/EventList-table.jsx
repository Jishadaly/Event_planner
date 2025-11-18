import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { useNavigate } from "react-router-dom"

export default function EventListTable({ events }) {
  const navigate = useNavigate()
  if (!events) return

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Recent Events</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold">Title</th>
              <th className="text-left py-2 px-3 font-semibold">Organizer</th>
              <th className="text-left py-2 px-3 font-semibold">Participants</th>
              <th className="text-left py-2 px-3 font-semibold">Status</th>
              <th className="text-left py-2 px-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-3">{event.title.split(' ').length > 2 ? event.title.split(' ').slice(0, 2).join(' ') + '...' : event.title}</td>
                <td className="py-3 px-3">{event.organizer.name}</td>
                <td className="py-3 px-3">{event.participants.length}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${event.status === "upcoming"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : event.status === "ongoing"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/events/${event._id}`)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card >
  )
}
