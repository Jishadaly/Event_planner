import { useState, useRef, useEffect } from "react"
import { Send, Users } from "lucide-react"
import { Card } from "../ui/Card"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { useSocket } from "../../context/SocketContext"

export default function EventChat({ eventId, user }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeUsers, setActiveUsers] = useState(0);

  const messagesEndRef = useRef(null)
  const socket = useSocket()

  //   const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  //   }

  //   useEffect(() => {
  //     scrollToBottom()
  //   }, [messages])

  console.log(user)

  useEffect(() => {
    if (!socket) return;

    const listener = (data) => {
      setMessages((prev) => [...prev, { ...data, timestamp: new Date(data.timestamp) }]);
    };

    const handleRoomUsers = (users) => {
      setActiveUsers(users.length); 
    };

    socket.on("room-users", handleRoomUsers);
    socket.on("receive-message", listener);

    return () => {
      socket.emit("leave-event-room", eventId);
      socket.off("receive-message", listener);
      socket.off("room-users", handleRoomUsers);
    };
  }, [socket, eventId]);


  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsLoading(true)
    try {
      const message = {
        id: eventId,
        userId: user?._id,
        userName: user?.name,
        message: newMessage,
        timestamp: new Date(),
        avatar: user.name.split('')[0] || "YO",
      }

      socket.emit("send-message", message)
      setNewMessage("")

      // setMessages((prev) => [...prev, message])

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
          {activeUsers} active
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
                <p className="text-sm font-semibold">{msg.userId === user?._id ? "You" : msg.userName}</p>
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
    </div >
  )
}
