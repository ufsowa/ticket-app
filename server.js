const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');

// apps
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

// ports
const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port: ${process.env.PORT || 8000}`);
  });

// configure websockets
const io = socket(server);
io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    //  socket.emit('seatsUpdated', db.seats)

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
  });

// endpoints
app.use('/api/testimonials', testimonialsRoutes); // add testimonials routes to server
app.use('/api/concerts', concertsRoutes); // add concerts routes to server
app.use('/api/seats', seatsRoutes); // add seats routes to server

// host client UI
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
})