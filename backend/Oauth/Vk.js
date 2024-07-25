const express = require('express')
const passport = require('passport')
const VKontakteStrategy = require('passport-vkontakte').Strategy
const UserSchema = require('../models/UserSchema')
const router = express.Router()
require('dotenv').config()

router.get('/login/oauth/vk', passport.authenticate('vkontakte'))
router.get(
	'/login/oauth/vk/redirect',
	passport.authenticate('vkontakte', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
	})
)
passport.use(
	new VKontakteStrategy(
		{
			clientID: process.env.VK_CLIENT_ID,
			clientSecret: process.env.VK_CLIENT_SECRET,
			callbackURL:
				'https://e451-92-253-199-248.ngrok-free.app/auth/login/oauth/vk/redirect',
			scope: ['email'],
			profileFields: ['id', 'displayName', 'photos', 'email'],
		},
		async (accessToken, refreshToken, params, profile, done) => {
			try {
				console.log(profile) // Log the profile information
				let user = await UserSchema.findOne({ socialId: profile.id })
				if (!user) {
					user = new UserSchema({
						socialId: profile.id,
						familyName: profile.name?.familyName || '',
						givenName: profile.name?.givenName || '',
						email:
							profile.emails[0].value ||
							`${profile.name?.givenName}${
								profile.name?.familyName
							}${profile.username.slice(2, 7)}@gmail.com`, // Ensure email is handled
						username: `${profile.name?.givenName || ''}${
							profile.name?.familyName || ''
						}`,
						password: 'user' + profile.id,
						userPhotoLink: profile.photos?.[0]?.value || '',
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
