const express = require('express');
const connectionDatabase = require('./database/connection');
const corsMiddleware = require('./middlewares/cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

const app = express();
connectionDatabase();

app.use(corsMiddleware);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;