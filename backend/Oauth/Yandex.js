const express = require('express')
const passport = require('passport')
const YandexStrategy = require('passport-yandex').Strategy
const UserSchema = require('../models/UserSchema')
const router = express.Router()
require('dotenv').config()

router.get('/login/oauth/yandex', passport.authenticate('yandex'))

router.get(
	'/login/oauth/yandex/redirect',
	passport.authenticate('yandex', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
	})
)

passport.use(
	new YandexStrategy(
		{
			clientID: process.env.YANDEX_CLIENT_ID,
			clientSecret: process.env.YANDEX_CLIENT_SECRET,
			callbackURL: '/auth/login/oauth/yandex/redirect',
		},
		async function (accessToken, refreshToken, profile, done) {
			try {
				let user = await UserSchema.findOne({ socialId: profile.id })
				if (!user) {
					user = new UserSchema({
						socialId: profile.id,
						familyName: profile.name.familyName,
						givenName: profile.name.givenName,
						email: profile.emails[0].value,
						username: `${profile.name.familyName} ${profile.name.givenName}`,
						password: 'user' + profile.id,
						userPhotoLink: profile.photos[0].value,
					})
					await user.save()
				}
				return done(null, user)
			} catch (err) {
				return done(err, null)
			}
		}
	)
)

module.exports = router
