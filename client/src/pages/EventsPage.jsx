import { useState, useMemo } from "react"
import EventCard from "../componets/events/EventCard"
import EventFilters from "../componets/events/EventFilters"
import EventSearch from "../componets/events/EventSearch"
import { Link } from "react-router-dom"
import { Button } from "../componets/ui/Button"
import DashboardHeader from "../componets/dashboard/DashboardHeader"

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "React Advanced Patterns Workshop",
    description: "Learn advanced React patterns and best practices",
    category: "Technology",
    startTime: new Date("2025-12-15T10:00:00"),
    endTime: new Date("2025-12-15T14:00:00"),
    location: "San Francisco, CA",
    organizerId: "org1",
    organizer: { id: "org1", fullName: "Tech Academy", email: "tech@academy.com", role: "organizer" },
    image: "/react-workshop.jpg",
    attachments: [],
    participants: [
      { id: "1", eventId: "1", userId: "user1", status: "joined", joinedAt: new Date() },
      { id: "2", eventId: "1", userId: "user2", status: "joined", joinedAt: new Date() },
      { id: "3", eventId: "1", userId: "user3", status: "interested", joinedAt: new Date() },
    ],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    description: "Intensive 12-week bootcamp covering full-stack development",
    category: "Education",
    startTime: new Date("2025-12-20T09:00:00"),
    endTime: new Date("2025-12-20T17:00:00"),
    location: "New York, NY",
    organizerId: "org2",
    organizer: { id: "org2", fullName: "Code Masters", email: "code@masters.com", role: "organizer" },
    image: "/web-development-concept.png",
    attachments: [],
    participants: [
      { id: "4", eventId: "2", userId: "user4", status: "joined", joinedAt: new Date() },
      { id: "5", eventId: "2", userId: "user5", status: "joined", joinedAt: new Date() },
    ],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "AI & Machine Learning Summit 2025",
    description: "Explore the latest trends in AI and ML with industry experts",
    category: "Conference",
    startTime: new Date("2025-12-10T08:00:00"),
    endTime: new Date("2025-12-10T18:00:00"),
    location: "Virtual",
    organizerId: "org3",
    organizer: { id: "org3", fullName: "AI Global", email: "info@aiglobal.com", role: "organizer" },
    image: "/ai-machine-learning.jpg",
    attachments: [],
    participants: [
      { id: "6", eventId: "3", userId: "user6", status: "joined", joinedAt: new Date() },
      { id: "7", eventId: "3", userId: "user7", status: "joined", joinedAt: new Date() },
      { id: "8", eventId: "3", userId: "user8", status: "joined", joinedAt: new Date() },
      { id: "9", eventId: "3", userId: "user9", status: "interested", joinedAt: new Date() },
    ],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Community Networking Mixer",
    description: "Connect with local entrepreneurs and tech professionals",
    category: "Networking",
    startTime: new Date("2025-12-05T18:00:00"),
    endTime: new Date("2025-12-05T20:00:00"),
    location: "Austin, TX",
    organizerId: "org4",
    organizer: { id: "org4", fullName: "Austin Tech Hub", email: "hub@austin.tech", role: "organizer" },
    image: "/networking-event.jpg",
    attachments: [],
    participants: [{ id: "10", eventId: "4", userId: "user10", status: "joined", joinedAt: new Date() }],
    status: "ongoing",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Design Thinking Workshop",
    description: "Innovative problem-solving techniques with real-world projects",
    category: "Workshop",
    startTime: new Date("2025-12-18T14:00:00"),
    endTime: new Date("2025-12-18T16:00:00"),
    location: "Boston, MA",
    organizerId: "org5",
    organizer: { id: "org5", fullName: "Design Pro", email: "pro@design.com", role: "organizer" },
    image: "/design-workshop.jpg",
    attachments: [],
    participants: [
      { id: "11", eventId: "5", userId: "user11", status: "joined", joinedAt: new Date() },
      { id: "12", eventId: "5", userId: "user12", status: "joined", joinedAt: new Date() },
    ],
    status: "upcoming",
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Annual Tech Conference 2025",
    description: "The biggest tech conference of the year with 100+ speakers",
    category: "Conference",
    startTime: new Date("2025-11-25T09:00:00"),
    endTime: new Date("2025-11-25T17:00:00"),
    location: "Las Vegas, NV",
    organizerId: "org6",
    organizer: { id: "org6", fullName: "Tech Events Inc", email: "events@techconf.com", role: "organizer" },
    image: "/tech-conference.png",
    attachments: [],
    participants: [],
    status: "finished",
    createdAt: new Date(),
  },
]

export default function EventsListingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || event.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchQuery, selectedCategory, selectedStatus])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Events</h1>
              <p className="text-sm text-muted-foreground">Discover and join events</p>
            </div>
            <Link to="/dashboard">
              <Button className="bg-primary hover:bg-primary/90">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div> */}

      {/* <DashboardHeader userRole={'participant'}/> */}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <EventSearch value={searchQuery} onChange={setSearchQuery} />
          <EventFilters
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {mockEvents.length} events
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-lg font-medium">No events found</p>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters to find events</p>
          </div>
        )}
      </div>
    </div>
  )
}
