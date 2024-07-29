const express = require('express');
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

router.get('/login/oauth/vk', passport.authenticate('vkontakte'));

router.get(
    '/login/oauth/vk/redirect',
    passport.authenticate('vkontakte', {
        failureRedirect: '/auth/login',
        session: false,
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        const user = req.user;
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET
        );

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.redirect('http://localhost:3000/');
    }
);

passport.use(
    new VKontakteStrategy(
        {
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
            callbackURL: '/auth/login/oauth/vk/redirect',
            scope: ['email'],
            profileFields: ['id', 'displayName', 'photos', 'email'],
        },
        async (accessToken, refreshToken, params, profile, done) => {
            try {
                // Log the profile information
                console.log(profile);

                let user = await UserSchema.findOne({ socialId: profile.id });

                if (!user) {
                    // Create a new user if not found
                    user = new UserSchema({
                        socialId: profile.id,
                        familyName: profile.name?.familyName || '',
                        givenName: profile.name?.givenName || '',
                        email: profile.emails?.[0]?.value || `${profile.username || profile.name?.givenName}${profile.name?.familyName}@gmail.com`,
                        username: `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`,
                        password: 'user' + profile.id,
                        userPhotoLink: profile.photos?.[0]?.value || '',
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

module.exports = router;
