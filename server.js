const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Make 'io' accessible in routes through Express's app object
app.set('io', io);

app.use(bodyParser.json());
app.use(cors());

const debateRoutes = require('./routes/debateRoutes');
const authRoutes = require('./routes/authRoutes');

// Passport Config
const passport = require('passport');
require('./config/passportConfig')(passport);

app.use(passport.initialize());
// app.use(passport.session()); // Consider removing if you're using JWTs, as sessions are not typically used with JWT.

app.use('/api/auth', authRoutes);
app.use('/api/debates', debateRoutes);

app.get('/', (req, res) => res.send('DebateSphere API Running'));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
// Use 'server.listen' instead of 'app.listen'
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
