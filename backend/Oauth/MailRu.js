const express = require('express')
const querystring = require('querystring')
const jwt = require('jsonwebtoken')
const UserSchema = require('../models/UserSchema')
require('dotenv').config()
const router = express.Router()
router.get('/login/oauth/mailru', async (req, res) => {
	try {
		const urlAuth = `https://oauth.mail.ru/login?client_id=${process.env.MAIlRU_CLIENT_ID}&response_type=code&scope=userinfo&redirect_uri=${process.env.MAIlRU_REDIRECT_URI}&state=some_state`
		res.redirect(urlAuth)
	} catch (err) {
		res.status(500).send(err)
	}
})
router.get('/login/oauth/mailru/redirect', async (req, res) => {
	try {
		const { code } = req.query
		const queryString = querystring.stringify({
			client_id: process.env.MAIlRU_CLIENT_ID,
			client_secret: process.env.MAIlRU_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: 'http://localhost:1000/auth/login/oauth/mailru/redirect',
		})
		const GetToken = await fetch('https://oauth.mail.ru/token?' + queryString, {
			method: 'POST',
			headers: {
				ContentType: 'application/x-www-form-urlencoded',
			},
		}).then(res => res.json())
		const userData = await fetch(
			`https://oauth.mail.ru/userinfo?access_token=${GetToken.access_token}`,
			{
				headers: {
					ContentType: 'application/x-www-form-urlencoded',
				},
			}
		).then(res => res.json())
		let user = await UserSchema.findOne({ socialId: userData.id })
		if (!user) {
			user = await UserSchema.create({
				socialId: userData?.id,
				familyName: userData.first_name,
				givenName: userData.last_name,
				email: userData.email,
				username: 'user' + Date.now(),
				password: 'user' + userData.id,
				userPhotoLink: null,
			})
			await user.save()
			req.user = user
			const accessToken = jwt.sign(
				{
					id: user._id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '15m',
				}
			)
			const refreshToken = jwt.sign(
				{
					id: user._id,
				},
				process.env.REFRESH_TOKEN_SECRET
			)
			res.cookie('accessToken', accessToken, { httpOnly: true })
			res.cookie('refreshToken', refreshToken, { httpOnly: true })
		} else {
			req.user = user
			const accessToken = jwt.sign(
				{
					id: user._id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '15m',
				}
			)
			const refreshToken = jwt.sign(
				{
					id: user._id,
				},
				process.env.REFRESH_TOKEN_SECRET
			)
			res.cookie('accessToken', accessToken, { httpOnly: true })
			res.cookie('refreshToken', refreshToken, { httpOnly: true })
		}
		res.redirect('/')
	} catch (error) {
		console.error(error)
		res.status(500).send({ error })
	}
})

module.exports = router
