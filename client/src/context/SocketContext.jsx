import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useToast } from './ToastContext'

const SocketContext = createContext(null)

export const SocketProvider = ({ children, userId }) => {
    const socketRef = useRef(null)
    const [socket, setSocket] = useState(null)
    const { toast } = useToast()

    useEffect(() => {
        if (!userId) return;

        const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
            transports: ["websocket"],
            query: { userId }
        })

        socketRef.current = newSocket
        setSocket(newSocket)  // 🔥 This triggers rerender → now socket is NOT null

        // Event created
        newSocket.on("event:created", ({ event }) => {
            toast.success(`New Event Created: ${event.title}`);
        });

        // Event updated
        newSocket.on("event:updated", (event) => {
            toast(`Event Updated: ${event.title}`, {
                icon: "🔁"
            });
        });

        // User joined event
        newSocket.on("event:participant-joined", ({ userName, eventName }) => {
            toast('success', `${userName} joined your event`, `${userName} has joined your event "${eventName}"`)
        });

        // User left event
        newSocket.on("event:participant-left", ({ userName, eventName }) => {
            toast('error', `${userName} left your event`, `${userName} has left your event "${eventName}"`)
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            newSocket.disconnect()
        }
    }, [userId])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
