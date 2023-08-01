const express = require('express');
const path = require('path');
const connectionDatabase = require('./database/connection');
const corsMiddleware = require('./middlewares/cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

const app = express();
connectionDatabase();

app.use(corsMiddleware);
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;