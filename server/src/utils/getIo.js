module.exports = function getIo(req) {
    return req.app.get("io");
};
