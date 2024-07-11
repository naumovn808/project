const express = require('express')
const bcrypt = require('bcrypt')
const userSchema = require('../models/UserSchema')
const authenticateToken = require('../middleware/authenticateToken')
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

router.get('/login', (req, res) => {
	m
})

module.exports = router
