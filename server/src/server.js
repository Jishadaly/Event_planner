require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/database');
const socketServer = require('./services/socket/socket')

//uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

connectDB();

const server = http.createServer(app);
const io = socketServer(server)
app.set('io',io)

//crone
require('./utils/cronJobs');


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`
   Server running in ${process.env.NODE_ENV} mode
   Port: ${PORT}
   API: http://localhost:${PORT}/api
   Health: http://localhost:${PORT}/health
  `);
});
