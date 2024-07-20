const express = require('express')
const GoogleStrategy = require('passport-google-oidc')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const UserSchema = require('../models/UserSchema')
const router = express.Router()
require('dotenv').config()
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/login/oauth/google/redirect',
			scope: ['profile', 'email'],
		},
		async function verify(issuer, profile, cb) {
			try {
				let user = await UserSchema.findOne({ socialId: profile.id })
				if (!user) {
					user = new UserSchema({
						socialId: profile.id,
						familyName: profile.name.familyName,
						givenName: profile.name.givenName,
						email: profile.emails[0].value,
						username: 'user' + Date.now(),
						password: 'user' + profile.id,
						userPhotoLink: null,
					})
					await user.save()
				}
				return cb(null, user)
			} catch (err) {
				return cb(err, null)
			}
		}
	)
)

router.get('/login/oauth/google', passport.authenticate('google'))

router.get(
	'/login/oauth/google/redirect',
	passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		const user = req.user
		const accessToken = jwt.sign(
			{
				_id: user._id,
				img: user.userPhotoLink,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '15m',
			}
		)
		const refreshToken = jwt.sign(
			{
				_id: user._id,
				img: user.userPhotoLink,
			},
			process.env.REFRESH_TOKEN_SECRET
		)
		res.cookie('accessToken', accessToken, { httpOnly: true })
		res.cookie('refreshToken', refreshToken, { httpOnly: true })
		res.redirect('/')
	}
)

module.exports = router
