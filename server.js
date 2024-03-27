const express = require('express');
const cors = require('cors');
const path = require('path');

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

// ports
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port: ${process.env.PORT || 8000}`);
  });
// app.listen(8000, () => {
//     console.log('Server is running on port: 8000');
// });