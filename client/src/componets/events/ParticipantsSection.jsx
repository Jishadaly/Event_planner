import { Users } from "lucide-react"
import Badge from "../ui/Badge"
import { Card } from "../ui/Card"

export default function ParticipantsSection({ participants, expandedView = false }) {
  const joinedParticipants = participants.filter((p) => p.status === "joined")
  const interestedParticipants = participants.filter((p) => p.status === "interested")
  const displayedParticipants = expandedView ? participants : participants.slice(0, 5)

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "joined":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "interested":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "declined":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  console.log(participants)
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Participants</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {joinedParticipants.length} joined, {interestedParticipants.length} interested
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
          <p className="text-xs text-green-800 dark:text-green-200">Joined</p>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">{joinedParticipants.length}</p>
        </div>
        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
          <p className="text-xs text-blue-800 dark:text-blue-200">Interested</p>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{interestedParticipants.length}</p>
        </div>
      </div>

      {/* Participants List */}
      <div className="space-y-3">
        {displayedParticipants.length > 0 ? (
          displayedParticipants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                  {participant.user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{participant.user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{participant.user?.email}</p>
                </div>
              </div>
              <Badge className={getStatusBadgeColor(participant.status)}>
                {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">No participants yet</p>
        )}
      </div>

      {/* Show More Button */}
      {!expandedView && participants.length > 5 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">+{participants.length - 5} more participants</p>
      )}
    </Card>
  )
}
