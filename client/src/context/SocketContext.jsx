import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const SocketProvider = ({ children, userId }) => {
    const socketRef = useRef(null)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (!userId) return;

        const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
            transports: ["websocket"],
            query: { userId }
        })

        socketRef.current = newSocket
        setSocket(newSocket)  // 🔥 This triggers rerender → now socket is NOT null

        return () => newSocket.disconnect()
    }, [userId])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
