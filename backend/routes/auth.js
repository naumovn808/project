const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const activateToken = require('../middleware/activateToken')
const resetToken = require('../middleware/resetToken')
const authenticateToken = require('../middleware/authenticateToken')
const GoogleOauth = require('../Oauth/Google')
const OkOauth = require('../Oauth/Ok')
const VkOauth = require('../Oauth/Vk')
const MailRuOauth = require('../Oauth/MailRu')
const YandexOauth = require('../Oauth/Yandex')
require('dotenv').config()

const router = express.Router()

// Update access token middleware
const updateAccessToken = async (req, res, next) => {
	console.log('Updating access token');
	const accessToken = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
	if (accessToken) {
		try {
			const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
			const now = Math.floor(Date.now() / 1000);
			const expiresIn = decoded.exp - now;
			if (expiresIn < 300) {
				const refreshToken = req.cookies.refreshToken;
				const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
				const newAccessToken = jwt.sign({ _id: decodedRefresh._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
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
	res.redirect('http://localhost:3000/auth/reset')
})
router.get('/reset/password/:token', resetToken, (req, res) => {
	res.redirect('http://localhost:3000/auth/reset')
})
router.get('/register', (req, res) => {
	res.redirect('http://localhost:3000/auth/register')
})
router.get('/login', (req, res) => {
	res.redirect('http://localhost:3000/auth/login')
})
router.get('/profile', (req, res) => {
	res.redirect('http://localhost:3000/profile')
})
///   GEt REquest  //

// Post REquests for LOg Regist
router.post('/register', async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await UserSchema.findOne({ email: email })
		if (user)
			return res.status(409).send({ massage: 'User has already registered' })
		const activeToken = jwt.sign(
			{ email: email, password: password },
			process.env.JWT_SECRET,
			{
				expiresIn: '30m',
			}
		)

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.EMAIL,
				pass: process.env.PASS,
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				accessToken: process.env.EMAIL_ACCSES_TOKEN,
				refreshToken: process.env.EMAIL_REFRESH_TOKEN,
			},
		})
		transport.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: 'Afruz GitGovno!',
			html: `
			<a href="http://localhost:1000/auth/register/${activeToken}">Activate email</a>
			`,
		})
		res.cookie('activeToken', activeToken, { httpOnly: true })
		res.status(200).send('email has sended')
	} catch (error) {
		console.error(error)
		res.status(500).send('Error registering user')
	}
})
router.get('/register/:token', activateToken, async (req, res) => {
	try {
		const user = await UserSchema.create({
			socialId: null,
			familyName: null,
			userPhotoLink: null,
			username: null,
			givenName: null,
			email: req.user.email,
			password: req.user.password,
		})
		const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '15m',
		})
		const refreshToken = jwt.sign(
			{ id: user._id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '30d',
			}
		)
		res.cookie('accessToken', accessToken, { httpOnly: true })
		res.cookie('refreshToken', refreshToken, { httpOnly: true })
		res.redirect('/')
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
})
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await UserSchema.findOne({ email: email })
		if (!user) return res.status(404).send('User not found')
		const validPassword = await user.comparePassword(password, user.password)
		console.log('Valid password:', validPassword)
		if (!validPassword) return res.status(401).send('Invalid password')
		req.user = { id: user._id }
		const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '15m',
		})
		const refreshToken = jwt.sign(
			{ id: user._id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '30d',
			}
		)
		res.cookie('accessToken', accessToken, { httpOnly: true })
		res.cookie('refreshToken', refreshToken, { httpOnly: true })
		res.redirect('/')
	} catch (error) {
		console.error(error)
		res.status(500).send('Error logging in')
	}
})
//   ENd Post REquests for LOg Regist   //

// Reset
router.post('/reset', async (req, res) => {
	try {
		const { email } = req.body
		const user = await UserSchema.findOne({ email: email })
		if (!user) return res.status(404).send({ message: 'user not found' })
		const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.EMAIL,
				pass: process.env.PASS,
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				accessToken: process.env.EMAIL_ACCSES_TOKEN,
				refreshToken: process.env.EMAIL_REFRESH_TOKEN,
			},
		})
		transport.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: 'reset a password',
			html: `
			<a href="http://localhost:1000/auth/register/${resetToken}">Activate email</a>
			`,
		})
		res.cookie('resetToken', resetToken, { httpOnly: true })
		res.sendStatus(200)
	} catch (err) {
		res.status(500).send({ err })
	}
})
router.post('/reset/password/:token', resetToken, async (req, res) => {
	try {
		const { NewPassword } = req.body
		const { email } = req.user
		const user = await UserSchema.findOne({ email: email })
		user.updateOne({ password: NewPassword })
		await user.save()
		res.redirect('/login')
	} catch (error) {
		res.status(500).send({ message: error })
	}
})
router.put('/profile', authenticateToken, async (req, res) => {
	const { name, surname, userAvatar, nickname, email, updatePassword } = req.body;
	try {
		const user = await UserSchema.findById(req.user.id);

		if (name) user.name = name;
		if (surname) user.surname = surname;
		if (userAvatar) user.userAvatar = userAvatar;
		if (nickname) user.nickname = nickname;
		if (email) user.email = email;
		if (updatePassword) user.password = await bcrypt.hash(updatePassword, 10);

		await user.save();
		res.status(200).send('Profile updated successfully');
	} catch (error) {``
		console.error(error);
		res.status(500).send('Error updating profile');
	}
});
//

// Oauth
router.use(GoogleOauth)
router.use(MailRuOauth)
router.use(OkOauth)
router.use(VkOauth)
router.use(YandexOauth)
// End  Oauth //

module.exports = router