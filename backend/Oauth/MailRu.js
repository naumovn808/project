const express = require('express');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const UserSchema = require('../models/UserSchema');
require('dotenv').config();
const router = express.Router();

// Endpoint to initiate OAuth login with MailRu
router.get('/login/oauth/mailru', async (req, res) => {
    try {
        const urlAuth = `https://oauth.mail.ru/login?client_id=${process.env.MAILRU_CLIENT_ID}&response_type=code&scope=userinfo&redirect_uri=${process.env.MAILRU_REDIRECT_URI}&state=some_state`;
        res.redirect(urlAuth);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Endpoint to handle the redirect from MailRu after authentication
router.get('/login/oauth/mailru/redirect', async (req, res) => {
    try {
        const { code } = req.query;

        const queryString = querystring.stringify({
            client_id: process.env.MAILRU_CLIENT_ID,
            client_secret: process.env.MAILRU_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.MAILRU_REDIRECT_URI,
        });

        // Exchange the authorization code for an access token
        const tokenResponse = await fetch('https://oauth.mail.ru/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryString,
        });
        const { access_token } = await tokenResponse.json();

        // Fetch user information using the access token
        const userResponse = await fetch(`https://oauth.mail.ru/userinfo?access_token=${access_token}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const userData = await userResponse.json();

        // Check if user already exists in the database
        let user = await UserSchema.findOne({ socialId: userData.id });
        if (!user) {
            user = await UserSchema.create({
                socialId: userData.id,
                familyName: userData.first_name,
                givenName: userData.last_name,
                email: userData.email,
                username: 'user' + Date.now(),
                password: 'user' + userData.id, // You might want to use a better default password or handle it differently
                userPhotoLink: userData.photo, // Assuming the `userData` contains a photo field
            });
            await user.save();
        }
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
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;