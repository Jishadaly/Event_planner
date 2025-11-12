import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_SERVER_URL = "http://localhost:3000";

// Initialize Socket connection
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

export default socket;
