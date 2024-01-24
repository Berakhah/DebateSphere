const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const passport = require('passport'); // Ensure single import of passport

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Make 'io' accessible in routes through Express's app object
app.set('io', io);

app.use(bodyParser.json());
app.use(cors());

// Passport Config - Import and configuration moved here
require('./config/passportConfig')(passport); // Ensure this is correctly pointing to your passportConfig file
app.use(passport.initialize());

const debateRoutes = require('./routes/debateRoutes');
const authRoutes = require('./routes/authRoutes');

// Rate limiting for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after an hour',
});

app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/debates', debateRoutes);

app.get('/', (req, res) => res.send('DebateSphere API Running'));

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
