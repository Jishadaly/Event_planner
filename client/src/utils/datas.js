
// Mock event data (for demo)
export const mockEvent = {
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