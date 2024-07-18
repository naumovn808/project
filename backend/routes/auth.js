const express = require('express')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middleware/authenticateToken')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc')
const UserSchema = require('../models/UserSchema')
require('dotenv').config()
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
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/login/oauth/google/redirect',
			scope: ['profile', 'email'],
		},
		async function verify(issue, userinfo, cb) {
			try {
				let user = await UserSchema.findOne({ socialId: userinfo.id })
				if (!user) {
					user = new UserSchema({
						socialId: userinfo.id,
						familyName: userinfo.name.familyName,
						givenName: userinfo.name.givenName,
						email: userinfo.emails[0].value,
						username: null,
						password: 'user' + userinfo.id,
						userPhotoLink: null,
					})
					const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
						expiresIn: '15m',
					})
					const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
					res.cookie('accessToken', accessToken, { httpOnly: true })
					res.cookie('refreshToken', refreshToken, { httpOnly: true })
					await user.save()
				}
				return cb(null, user)
			} catch (err) {
				return cb(err, null)
			}
		}
	)
)
// router.get('/home', authenticateToken, async (req, res) => {
// 	try {
// 		const { email, id } = req.user || {}
// 		if (!id) {
// 			return res.status(400).send('User id not provided')
// 		}
// 		const user = await UserSchema.findOne({ email: email })
// 		if (!user) {
// 			return res.status(404).send('User not found')
// 		}
// 		res.send(req.user)
// 		res.redirect('http://localhost:3000')
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).send('Error rendering home page')
// 	}
// })
router.get('/register', (req, res) => {
	res.redirect('http://localhost:3000/register.jsx')
})
router.get('/login/oauth/google', passport.authenticate('google'))
router.get(
	'/login/oauth/google/redirect',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
	})
)

router.get('/login', (req, res) => {
	res.redirect('http://localhost:3000/Login.jsx')
})
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

		const accessToken = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '15m' }
		)
		const refreshToken = jwt.sign(
			{ id: user.id, username: user.username },
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

module.exports = router
