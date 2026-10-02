const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const taskRouters = require('./routes/task.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://task-manager-exex.vercel.app',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRouters);

// Error middleware must be last
app.use(errorMiddleware);

module.exports = app;