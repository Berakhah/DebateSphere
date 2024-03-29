const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const passport = require('passport');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST", "PATCH", "DELETE"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
});

app.set('io', io);

app.use(express.json());
app.use(cors());

require('./config/passportConfig')(passport);
app.use(passport.initialize());

const debateRoutes = require('./routes/debateRoutes');
const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');
const commentRoutes = require('./routes/commentRoutes');
const moderationRoutes = require('./routes/moderationRoutes');
const argumentRoutes = require('./routes/argumentsRoutes'); 
const reportRoutes = require('./routes/reportRoutes');


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
});


app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRoutes);
app.use('/api', debateRoutes);
app.use('/api', voteRoutes);
app.use('/api/debates', commentRoutes); 
app.use('/api/moderation', moderationRoutes);
app.use('/api', argumentRoutes); 
app.use('/api', reportRoutes); 


app.get('/', (req, res) => res.send('Welcome to DebateSphere API!'));


app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
});


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
