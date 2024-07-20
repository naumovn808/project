const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const GoogleOauth = require('../Oauth/Google')
const UserSchema = require('../models/UserSchema')
const MailRuOauth = require('../Oauth/MailRu')
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
					{ username: decodedRefresh.username },
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

// GEt REquest for login register
router.get('/register', (req, res) => {
	res.send('hi')
})
router.get('/login', (req, res) => {
	res.send('hi')
})
///   GEt REquest for login register //

// Post REquests for LOg Regist
router.post('/register', async (req, res) => {
	const { email, password } = req.body
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		await new UserSchema.create({
			socialId: null,
			familyName: null,
			userPhotoLink: null,
			username: null,
			givenName: null,
			email: email,
			password: hashedPassword,
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
		const validPassword = await bcrypt.compare(password, user.password)
		console.log('Valid password:', validPassword)
		if (!validPassword) return res.status(401).send('Invalid password')

		req.user = user

		const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
			expiresIn: '15m',
		})
		const refreshToken = jwt.sign(
			{ id: user._id, email: user.email },
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

// Google
router.use(GoogleOauth)
//   END Google //

// Mail.ru
router.use(MailRuOauth)
// End  MAil.ru //

module.exports = router
