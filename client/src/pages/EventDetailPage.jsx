import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, MapPin, Calendar, Clock, User, Users, MessageCircle, Badge } from "lucide-react"
import { formatDateFull, formatTime } from "../utils/formateDate"
import EventChat from "../componets/events/ChatSection"
import ParticipantsSection from "../componets/events/ParticipantsSection"
import AttachmentsSection from "../componets/events/AttachmentSection"
import { Button } from "../componets/ui/Button"
import { Card } from "../componets/ui/Card"
import { useParams } from "react-router-dom"

// Mock event data (for demo)
const mockEvent = {
    id: "1",
    title: "React Advanced Patterns Workshop",
    description:
        "Learn advanced React patterns and best practices including hooks, context, render props, and performance optimization techniques.",
    category: "Technology",
    startTime: new Date("2025-12-15T10:00:00"),
    endTime: new Date("2025-12-15T14:00:00"),
    location: "San Francisco, CA - Tech Hub Building",
    organizerId: "org1",
    organizer: { id: "org1", fullName: "Tech Academy", email: "tech@academy.com", role: "organizer" },
    image: "/placeholder.svg?key=xa4ce",
    attachments: [
        {
            id: "a1",
            eventId: "1",
            fileName: "React-Patterns-Slides.pdf",
            fileType: "pdf",
            fileUrl: "#",
            uploadedAt: new Date(),
        },
        {
            id: "a2",
            eventId: "1",
            fileName: "Workshop-Example-Code.zip",
            fileType: "document",
            fileUrl: "#",
            uploadedAt: new Date(),
        },
    ],
    participants: [
        {
            id: "1",
            eventId: "1",
            userId: "user1",
            user: { id: "user1", fullName: "Alex Johnson", email: "alex@example.com", role: "participant" },
            status: "joined",
            joinedAt: new Date(),
        },
        {
            id: "2",
            eventId: "1",
            userId: "user2",
            user: { id: "user2", fullName: "Sarah Chen", email: "sarah@example.com", role: "participant" },
            status: "joined",
            joinedAt: new Date(),
        },
        {
            id: "3",
            eventId: "1",
            userId: "user3",
            user: { id: "user3", fullName: "Mike Wilson", email: "mike@example.com", role: "participant" },
            status: "interested",
            joinedAt: new Date(),
        },
    ],
    status: "upcoming",
    createdAt: new Date(),
}

export default function EventDetailsPage() {
    const event = mockEvent
    const [isJoined, setIsJoined] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [showParticipants, setShowParticipants] = useState(false)

    const { id } = useParams()

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

    const joinedParticipants = event.participants?.filter((p) => p.status === "joined") || []

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            {/* <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/events" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Link>
                </div>
            </div> */}

            {/* Main Content */}
            
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="relative h-96 w-full overflow-hidden rounded-lg">
                            <img src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                            <Badge className={`absolute top-4 right-4 ${getStatusColor(event.status)}`}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                        </div>

                        {/* Title & Category */}
                        <div>
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                                    <p className="text-lg text-muted-foreground">{event.category}</p>
                                </div>
                            </div>
                        </div>

                        {/* Event Info Cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-semibold">{formatDateFull(event.startTime)}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Time</p>
                                        <p className="font-semibold">
                                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-semibold">{event.location}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Organizer</p>
                                        <p className="font-semibold">{event.organizer?.fullName}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Description */}
                        <Card className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">About This Event</h2>
                            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                        </Card>

                        {/* Attachments */}
                        {event.attachments && event.attachments.length > 0 && (
                            <AttachmentsSection attachments={event.attachments} />
                        )}

                        {/* Participants */}
                        <ParticipantsSection participants={event.participants || []} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <Card className="p-6 sticky top-24">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Participants</p>
                                    <p className="text-2xl font-bold">{joinedParticipants.length}</p>
                                </div>

                                {!isJoined ? (
                                    <Button
                                        onClick={() => setIsJoined(true)}
                                        className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
                                    >
                                        Join Event
                                    </Button>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="rounded-lg bg-green-100 p-3 text-center dark:bg-green-900">
                                            <p className="font-semibold text-green-800 dark:text-green-200">You've joined this event!</p>
                                        </div>
                                        <Button variant="outline" onClick={() => setShowChat(!showChat)} className="w-full">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            {showChat ? "Hide Chat" : "Open Chat"}
                                        </Button>
                                    </div>
                                )}

                                <Button variant="outline" onClick={() => setShowParticipants(!showParticipants)} className="w-full">
                                    <Users className="h-4 w-4 mr-2" />
                                    View Participants
                                </Button>
                            </div>
                        </Card>

                        {isJoined && showChat &&  <Card className="p-6 sticky top-24"> <EventChat eventId={event.id} /> </Card> }
                    </div>
                </div>

                {/* Participants Modal */}
                {showParticipants && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                        <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Event Participants</h3>
                                    <button
                                        onClick={() => setShowParticipants(false)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <ParticipantsSection participants={event.participants || []} expandedView={true} />
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
