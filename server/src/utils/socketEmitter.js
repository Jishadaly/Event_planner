
module.exports = function emitSocketEvent(io, targetId, eventName, payload) {
    io.to(targetId).emit(eventName, payload);
}

