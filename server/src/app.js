const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.route')
const notificationRoutes = require('./routes/notification.route')
const dashboardRoutes = require('./routes/dashboard.route')

const app = express();

app.set('trust proxy', 1);
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser())

// Data sanitization NoSQL query injection, XSS
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api', limiter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

//API'S
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/dashboard', dashboardRoutes)

//undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;