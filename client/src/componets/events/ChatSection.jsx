import { useState, useRef, useEffect } from "react"
import { Send, Users } from "lucide-react"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { useSocket } from "../../context/SocketContext"
import MessageCard from "./MessageCard"
import { AnimatePresence, motion } from 'framer-motion'

export default function EventChat({ eventId, user }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeUsers, setActiveUsers] = useState(0);

  const socket = useSocket()

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

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        // transition={{ type: "keyframes", stiffness: 500, damping: 15 }}
        className="flex flex-col h-96 border border-border rounded-lg bg-card">
        <div className="border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-semibold">Event Chat</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {activeUsers} active
          </div>
        </div>


        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <MessageCard key={msg.timestamp + Math.random()} message={msg} currUserId={user?._id} />
          ))}
          <div />
        </div>


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
      </motion.div >
    </AnimatePresence>
  )
}
