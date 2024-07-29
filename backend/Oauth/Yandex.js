const express = require('express');
const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const UserSchema = require('../models/UserSchema');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/login/oauth/yandex', passport.authenticate('yandex'));

router.get(
    '/login/oauth/yandex/redirect',
    passport.authenticate('yandex', {
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
    new YandexStrategy(
        {
            clientID: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
            callbackURL: '/auth/login/oauth/yandex/redirect',
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await UserSchema.findOne({ socialId: profile.id });
                if (!user) {
                    user = new UserSchema({
                        socialId: profile.id,
                        familyName: profile.name.familyName,
                        givenName: profile.name.givenName,
                        email: profile.emails[0].value,
                        username: `${profile.name.familyName} ${profile.name.givenName}`,
                        password: 'user' + profile.id,
                        userPhotoLink: profile.photos[0].value,
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
