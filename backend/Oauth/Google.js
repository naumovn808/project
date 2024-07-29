const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

// Configure Passport
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/login/oauth/google/redirect',
            scope: ['profile', 'email'],
        },
        async (issuer, userinfo, cb) => {
            try {
                // Check if user already exists in the database
                let user = await UserSchema.findOne({ socialId: userinfo.id });

                if (!user) {
                    // Create a new user if not found
                    user = new UserSchema({
                        socialId: userinfo.id,
                        familyName: userinfo.name.familyName,
                        givenName: userinfo.name.givenName,
                        email: userinfo.emails[0].value,
                        username: userinfo.name.givenName + userinfo.name.familyName + '7',
                        password: 'user' + userinfo.id,
                        userPhotoLink: null,
                    });
                    await user.save();
                }

                // Pass user object to callback
                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserSchema.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Start OAuth with Google
router.get(
    '/login/oauth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle OAuth callback from Google
router.get(
    '/login/oauth/google/redirect',
    passport.authenticate('google', { session: false }), // No session needed
    (req, res) => {
        if (!req.user) {
            return res.redirect('/auth/login');
        }

        const user = req.user;
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.redirect('http://localhost:3000/');
    }
);

module.exports = router;
