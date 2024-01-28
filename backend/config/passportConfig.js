const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models/user'); // Adjust the path as necessary based on your project structure

module.exports = function(passport) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            const user = await User.findByPk(jwtPayload.id);
            if (user) {
                return done(null, user); // User found
            }
            return done(null, false); // User not found
        } catch (error) {
            console.error('Error in JWT Strategy:', error);
            return done(error, false);
        }
    }));
};
