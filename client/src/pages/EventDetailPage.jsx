import { useEffect, useState } from "react"
import { MapPin, Calendar, Clock, User, Users, MessageCircle, LogOut, LoaderCircle } from "lucide-react"
import { formatDateFull, formatTime } from "../utils/formateDate"
import EventChat from "../componets/events/ChatSection"
import ParticipantsSection from "../componets/events/ParticipantsSection"
import AttachmentsSection from "../componets/events/AttachmentSection"
import { Button } from "../componets/ui/Button"
import { Card } from "../componets/ui/Card"
import { useParams } from "react-router-dom"
import Modal from "../componets/ui/Modal"
import { useEvent } from "../api/querys/useEvent"
import Badge from "../componets/ui/Badge"
import { getStatusColor } from "../utils/getStatusColor"
import { useJoin, useLeave } from "../api/querys/useJoin"
import { useSelector } from "react-redux"
import { useToast } from "../context/ToastContext"
import { useSocket } from "../context/SocketContext"


export default function EventDetailsPage() {

    const [showChat, setShowChat] = useState(false)
    const [showParticipants, setShowParticipants] = useState(false)
    const { id } = useParams()
    const { event, isLoading: isEventLoading, refetchEvent } = useEvent(id)
    const joinMutation = useJoin(id)
    const leaveMutation = useLeave(id)
    const user = useSelector((state) => state?.auth?.user)
    const { toast } = useToast()
    const socket = useSocket()

    const joinedParticipants = event?.participants?.filter((p) => p.status === "joined") || []
    const isJoined = event?.participants?.some((p) => p.user.id === user._id)


    useEffect(() => {
        if (!socket) return;
        if (!event?._id) return;

        const eventId = event._id;

        if (showChat) {
            socket.emit("join-event-room", eventId);
        }

        return () => {
            if (socket) {
                socket.emit("leave-event-room", eventId);
            }
        };
    }, [socket, showChat, event]);



    const handleJoin = () => {
        joinMutation.mutate(id, {
            onSuccess: () => {
                toast("success", "You're In!!", "Successfully joined the event.")
                refetchEvent()
                setShowChat(true)
            }
        })
    }

    const handleLeave = () => {
        leaveMutation.mutate(id, {
            onSuccess: () => {
                refetchEvent()
                toast("success", "You Left the Event", "You're no longer a participant.")

            }
        })
    }

    if (isEventLoading) return <div className="align-middle"> <LoaderCircle /> </div>

    return (

        <div className="min-h-screen bg-background">

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative h-96 w-full overflow-hidden rounded-lg">

                            <img src={event?.image?.url || "/placeholder.svg"} alt={event?.title} className="object-cover" />
                            <Badge className={`absolute top-4 right-4 ${getStatusColor(event?.status)}`}>
                                {event?.status.charAt(0).toUpperCase() + event?.status.slice(1)}
                            </Badge>

                        </div>

                        <div>
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{event?.title}</h1>
                                    <p className="text-lg text-muted-foreground">{event?.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-semibold">{formatDateFull(event?.startTime)}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Time</p>
                                        <p className="font-semibold">
                                            {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-semibold">{event?.location}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <div className="flex items-start gap-3">
                                    <User className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Organizer</p>
                                        <p className="font-semibold">{event?.organizer?.name}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <Card className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">About This Event</h2>
                            <p className="text-muted-foreground leading-relaxed">{event?.description}</p>
                        </Card>

                        {event?.attachments && event?.attachments.length > 0 && (
                            <AttachmentsSection attachments={event?.attachments} />
                        )}

                        {/* Participants */}
                        <ParticipantsSection participants={event?.participants || []} />
                    </div>

                    {/* Right section */}
                    <div className="space-y-6">
                        <Card className="p-6 sticky top-24">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Participants</p>
                                    <p className="text-2xl font-bold">{joinedParticipants.length}</p>
                                </div>

                                {!isJoined ? (
                                    <Button onClick={handleJoin} className="w-full bg-primary hover:bg-primary/90 h-12 text-base" disabled={joinMutation.isPending}>
                                        {joinMutation.isPending ? <LoaderCircle /> : "Join Event"}
                                    </Button>
                                ) : (
                                    <div className="space-y-3">

                                        <Button className="w-full bg-red-600 hover:bg-red-500 h-12" onClick={handleLeave}>
                                            <LogOut className="h-4 w-4 mr-2" />
                                            {leaveMutation.isPending ? <LoaderCircle /> : "Leave Event"}
                                        </Button>

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

                        {isJoined && showChat && <Card className="p-6 sticky top-24"> <EventChat  eventId={event?.id} user={user} /> </Card>}
                    </div>
                </div>

                <Modal isOpen={showParticipants} onClose={() => setShowParticipants(false)}>
                    <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">Event Participants</h3>
                            </div>
                            <ParticipantsSection participants={event?.participants || []} expandedView={true} />
                        </div>
                    </Card>
                </Modal>

            </div>
        </div>
    )
}