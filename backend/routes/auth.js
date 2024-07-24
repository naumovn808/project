const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const resetToken = require('../middleware/resetToken')
const GoogleOauth = require('../Oauth/Google')
const UserSchema = require('../models/UserSchema')
const MailRuOauth = require('../Oauth/MailRu')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const router = express.Router()
const updateAccessToken = async (req, res, next) => {
	const accessToken =
		req.headers.authorization?.split(' ')[1] || req.cookies.accessToken
	if (accessToken) {
		try {
			const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
			const now = Math.floor(Date.now() / 1000)
			const expiresIn = decoded.exp - now
			if (expiresIn < 300) {
				const refreshToken = req.cookies.refreshToken

				const decodedRefresh = jwt.verify(
					refreshToken,
					process.env.REFRESH_TOKEN_SECRET
				)

				const newAccessToken = jwt.sign(
					{ _id: decodedRefresh._id },
					process.env.JWT_SECRET,
					{ expiresIn: '15m' }
				)
				res.cookie('accessToken', newAccessToken, { httpOnly: true })

				res.setHeader('Authorization', `Bearer ${newAccessToken}`)
			}
		} catch (error) {
			console.error(error)
		}
	}

	next()
}
router.use(updateAccessToken)

// GEt REquest
router.get('/reset', (req, res) => {
	res.send('hi Nikita')
})
router.get('/reset/password/:token', resetToken, (req, res) => {
	res.redirect('opaopa')
})
router.get('/register', (req, res) => {
	res.send('lala')
})
router.get('/login', (req, res) => {
	res.send('hi')
})
///   GEt REquest  //

// Post REquests for LOg Regist
router.post('/register', async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await UserSchema.findOne({ email: email })
		if (user)
			return res.status(409).send({ massage: 'User has already registered' })
		await UserSchema.create({
			socialId: null,
			familyName: null,
			userPhotoLink: null,
			username: null,
			givenName: null,
			email: email,
			password: password,
		})
		res.redirect('/auth/login')
	} catch (error) {
		console.error(error)
		res.status(500).send('Error registering user')
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
			process.env.REFRESH_TOKEN_SECRET
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
		const transporter = nodemailer.createTransport(
			sendgrid({
				auth: { api_key: process.env.SENDGRID_API_KEY },
			})
		)
		transporter.sendMail({
			to: email,
			from: 'afruzmalikov65@gmail.com',
			subject: 'RESET PASSWORD',
			html: `
		<a href="http://localhost:1000/auth/reset/password/${resetToken}"
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
		res.status(303).redirect('/register')
	} catch (error) {
		res.status(500).send({ message: error })
	}
})
//

// Google
router.use(GoogleOauth)
//   END Google //

// Mail.ru
router.use(MailRuOauth)
// End  MAil.ru //

module.exports = router
