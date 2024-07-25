const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc')
const UserSchema = require('../models/UserSchema')
const router = express.Router()
require('dotenv').config()

router.get(
	'/login/oauth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/login/oauth/google/redirect',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
	})
)
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/login/oauth/google/redirect',
			scope: ['profile', 'email'],
		},
		async function verify(issuer, userinfo, cb) {
			try {
				// Check if user already exists in the database
				let user = await UserSchema.findOne({ socialId: userinfo.id })

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

module.exports = router
