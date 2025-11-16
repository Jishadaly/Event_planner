import Badge from "../ui/Badge"
import { Users, MapPin, Calendar } from "lucide-react"
import { formatTime, formatDate } from "../../utils/formateDate"
import { Link, useNavigate } from "react-router-dom"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { getStatusColor } from "../../utils/getStatusColor"

export default function EventCard({ event }) {
  const participantCount = event?.participants?.length || 0
  const navigate = useNavigate()

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="overflow-hidden hover:border-primary/70 transition-shadow cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <img
            src={event?.image?.url || "/placeholder.svg"}
            alt={event?.title || "Event image"}
            className="object-cover w-full h-full hover:scale-105 transition-transform"
          />

          {event?.status && (
            <Badge className={`absolute top-3 right-3 ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          )}
        </div>


        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 font-semibold text-lg">{event.title}</h3>

          {/* Category */}
          <p className="mb-3 text-xs text-muted-foreground">{event.category}</p>

          {/* Description */}
          <p className="mb-4 text-sm text-muted-foreground flex-grow">
            {event.description.length > 100
              ? event.description.slice(0, 100) + "..."
              : event.description}
          </p>

          {/* Event Details */}
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex items-start justify-between">
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
                <p className="line-clamp-1">
                  {event.location.split(" ").slice(0, 3).join(" ") + (event.location.split(" ").length > 3 ? "..." : "")}
                </p>

              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">by</span>
              <p className="text-sm font-medium">{event.organizer?.name}</p>
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
            onClick={(e) => navigate(`/events/${event.id}`)}
          >
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  )
}
