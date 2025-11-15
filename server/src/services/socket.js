const { Server } = require("socket.io");

module.exports = function socketServer(httpServer) {
    const io = new Server(httpServer, { cors: { origin: "*" } });


    const eventRooms = new Map(); // eventId -> Set(userIds)

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        // JOIN EVENT ROOM
        socket.on("join-event-room", (eventId) => {
            socket.join(eventId);

            if (!eventRooms.has(eventId)) {
                eventRooms.set(eventId, new Set());
            }

            eventRooms.get(eventId).add(userId);

            console.log(userId, "joined event room:", eventId);

            const users = eventRooms.get(eventId);
            io.to(eventId).emit("room-users", users ? [...users] : []);
        });

        // LEAVE EVENT ROOM
        socket.on("leave-event-room", (eventId) => {
            socket.leave(eventId);

            if (eventRooms.has(eventId)) {
                eventRooms.get(eventId).delete(userId);
            }

            console.log(userId, "left event room:", eventId);

            const users = eventRooms.get(eventId);
            io.to(eventId).emit("room-users", users ? [...users] : []);
        });

        // SEND MESSAGE
        socket.on("send-message", (data) => {
            console.log("message:", data);
            io.to(data.id).emit("receive-message", data);
        });

        // DISCONNECT
        socket.on("disconnect", () => {

            for (const [eventId, users] of eventRooms.entries()) {
                if (users.has(userId)) {
                    users.delete(userId);
                    io.to(eventId).emit("room-users", [...users]);
                }
            }

            console.log(userId, "disconnected");
        });
    });

    return io;
};
