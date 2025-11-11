import { useState, useRef, useEffect } from "react"
import { Send, Users } from "lucide-react"
import { Card } from "../ui/Card"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

// Mock initial messages
const mockMessages = [
  {
    id: "1",
    userId: "org1",
    userName: "Tech Academy",
    message: "Welcome everyone! Excited to have you here for the React workshop.",
    timestamp: new Date(Date.now() - 3600000),
    avatar: "TA",
  },
  {
    id: "2",
    userId: "user1",
    userName: "Alex Johnson",
    message: "Thanks for organizing this! Looking forward to learning advanced patterns.",
    timestamp: new Date(Date.now() - 1800000),
    avatar: "AJ",
  },
  {
    id: "3",
    userId: "user2",
    userName: "Sarah Chen",
    message: "Is this workshop beginner-friendly or should I have advanced React knowledge?",
    timestamp: new Date(Date.now() - 900000),
    avatar: "SC",
  },
  {
    id: "4",
    userId: "org1",
    userName: "Tech Academy",
    message: "Great question Sarah! We recommend intermediate React knowledge, but we'll cover fundamentals briefly.",
    timestamp: new Date(Date.now() - 600000),
    avatar: "TA",
  },
]

export default function EventChat({ eventId }) {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsLoading(true)
    try {
      const message = {
        id: Date.now().toString(),
        userId: "current-user",
        userName: "You",
        message: newMessage,
        timestamp: new Date(),
        avatar: "YO",
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")

      await new Promise((resolve) => setTimeout(resolve, 500))
    } finally {
      setIsLoading(false)
    }
  }

  const activeParticipants = 12 // Mock number

  return (
    <div className="flex flex-col h-96 border border-border rounded-lg bg-card">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <h3 className="font-semibold">Event Chat</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          {activeParticipants} active
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-semibold">{msg.userName}</p>
                <p className="text-xs text-muted-foreground">
                  {msg.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <p className="text-sm text-foreground break-words">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 bg-muted/30">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
