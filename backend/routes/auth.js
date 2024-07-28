const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resetToken = require('../middleware/resetToken');
const passport = require('passport');
const UserSchema = require('../models/UserSchema');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const MailRuOauth = require('../Oauth/MailRu')
const GoogleOauth = require('../Oauth/Google')
const OkOauth = require('../Oauth/Ok')
const VkOauth = require('../Oauth/Vk')
const YandexOauth = require('../Oauth/Yandex')
require('dotenv').config();

const router = express.Router();

// Update access token middleware
const updateAccessToken = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = decoded.exp - now;
            if (expiresIn < 300) {
                const refreshToken = req.cookies.refreshToken;
                const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                const newAccessToken = jwt.sign(
                    { _id: decodedRefresh._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '15m' }
                );
                res.cookie('accessToken', newAccessToken, { httpOnly: true });
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    next();
};

router.use(updateAccessToken);

// GET Requests
router.get('/reset', (req, res) => {
    res.send('hi Nikita');
});

router.get('/reset/password/:token', resetToken, (req, res) => {
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.send('lala');
});

router.get('/login', (req, res) => {
    res.send('hi');
});

// POST Requests for Login and Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (user) return res.status(409).send({ message: 'User has already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserSchema.create({
            socialId: null,
            familyName: null,
            userPhotoLink: null,
            username: null,
            givenName: null,
            email,
            password: hashedPassword,
        });

        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send('Invalid password');

        req.user = { id: user._id };

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

// Reset Password
router.post('/reset', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserSchema.findOne({ email });
        if (!user) return res.status(404).send({ message: 'User not found' });

        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport(sendgrid({
            auth: { api_key: process.env.SENDGRID_API_KEY },
        }));

        await transporter.sendMail({
            to: email,
            from: 'afruzmalikov65@gmail.com',
            subject: 'RESET PASSWORD',
            html: `<a href="http://localhost:1000/auth/reset/password/${resetToken}">Reset Password</a>`,
        });

        res.cookie('resetToken', resetToken, { httpOnly: true });
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error resetting password' });
    }
});

router.post('/reset/password/:token', resetToken, async (req, res) => {
    const { newPassword } = req.body;
    const { email } = req.user;
    try {
        const user = await UserSchema.findOne({ email });
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.updateOne({ password: hashedPassword });
        await user.save();

        res.status(303).redirect('/register');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating password' });
    }
});

// OAuth
router.use(GoogleOauth)
router.use(MailRuOauth)
router.use(OkOauth)
router.use(VkOauth)
router.use(YandexOauth)



module.exports = router;
