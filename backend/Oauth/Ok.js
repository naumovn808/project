const express = require('express')
const passport = require('passport')
const OdnoklassnikiStrategy = require('passport-odnoklassniki').Strategy
const UserSchema = require('../models/UserSchema')
const crypto = require('crypto')
const axios = require('axios')
const router = express.Router()

router.get('/odnoklassniki', passport.authenticate('odnoklassniki'))
router.get(
	'/odnoklassniki/callback',
	passport.authenticate('odnoklassniki', { failureRedirect: '/auth/login' }),
	(req, res) => {
        res.redirect('http://localhost:3000/');
	}
)
passport.use(
	new OdnoklassnikiStrategy(
		{
			clientID: process.env.OK_CLIENT_ID,
			clientPublic: process.env.OK_CLIENT_PUBLIC,
			clientSecret: process.env.OK_CLIENT_SECRET,
			callbackURL: process.env.OK_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const signature = generateSignature(
					accessToken,
					process.env.OK_CLIENT_SECRET,
					process.env.OK_CLIENT_PUBLIC
				)
				const profileResponse = await axios.get('https://api.ok.ru/fb.do', {
					params: {
						method: 'users.getCurrentUser',
						access_token: accessToken,
						application_key: process.env.OK_CLIENT_PUBLIC,
						sig: signature,
					},
				})
				const profileData = profileResponse.data
				console.log(profileData)

				const displayName =
					`${profileData.first_name || ''} ${
						profileData.last_name || ''
					}`.trim() || 'No Name'

				let user = await UserSchema.findOne({ socialId: profileData.uid })

				if (!user) {
					user = new UserSchema({
						socialId: profileData.uid,
						email: profileData.email || 'No Email', // Handle missing email
						familyName: profileData.last_name || '',
						givenName: profileData.first_name || '',
						username: displayName,
						password: 'user' + profileData.uid,
						userPhotoLink: profileData.pic_3 || '',
					})
					await user.save()
				}
				return done(null, user)
			} catch (error) {
				return done(error, null)
			}
		}
	)
)

function generateSignature(accessToken, clientSecret, publicKey) {
	const params = `application_key=${publicKey}method=users.getCurrentUser${crypto
		.createHash('md5')
		.update(`${accessToken}${clientSecret}`)
		.digest('hex')}`
	return crypto.createHash('md5').update(params).digest('hex')
}

module.exports = router
