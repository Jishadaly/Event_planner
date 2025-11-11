import { Badge } from "lucide-react"
import { Users, MapPin, Calendar } from "lucide-react"
import { formatTime , formatDate } from "../../utils/formateDate"
import { Link } from "react-router-dom"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"

export default function EventCard({ event }) {
  const participantCount = event?.participants?.length || 0

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "finished":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform"
          />
          <Badge className={`absolute top-3 right-3 ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 font-semibold text-lg">{event.title}</h3>

          {/* Category */}
          <p className="mb-3 text-xs text-muted-foreground">{event.category}</p>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-grow">{event.description}</p>

          {/* Event Details */}
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                <p>{formatDate(event.startTime)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <p className="line-clamp-1">{event.location}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">by</span>
              <p className="text-sm font-medium">{event.organizer?.fullName}</p>
            </div>
          </div>

          {/* Participants */}
          <div className="mb-4 flex items-center gap-2 border-t border-border pt-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {participantCount} participant{participantCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* CTA Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={(e) => e.preventDefault()}
          >
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  )
}
