import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useToast } from './ToastContext'

const SocketContext = createContext(null)

export const SocketProvider = ({ children, userId }) => {

    const [socket, setSocket] = useState(null)
    const { toast } = useToast()


    useEffect(() => {
        if (!userId) return;

        const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
            transports: ["websocket"],
            query: { userId }
        })

        setSocket(newSocket)

        // Event created
        newSocket.on("event:created", ({ event }) => {
            toast.success(`New Event Created: ${event.title}`);
        });

        // Event updated
        newSocket.on("event:updated", (event) => {
            toast('success', `Event Updated: ${event.title}`, 'Check now Whats new!!');
        });

        // User joined event
        newSocket.on("event:participant-joined", ({ user, eventName }) => {
            if (user._id === userId) return
            toast('success', `${user.name} joined your event`, `${user.name} has joined your event "${eventName}"`)
        });

        // User left event
        newSocket.on("event:participant-left", ({ user, eventName }) => {
            if (user._id === userId) return
            toast('error', `${user.name} left your event`, `${user.name} has left your event "${eventName}"`)
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
