const emitSocketEvent = (io, targetId, eventName, payload) => {
    io.to(targetId).emit(eventName, payload);
}

module.exports = emitSocketEvent;

