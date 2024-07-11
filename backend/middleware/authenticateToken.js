const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
	const token = req.cookies.accessToken
	if (!token) {
		console.log('Access token not found')
		return next() // Продолжить выполнение следующего middleware или маршрута
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.log('Error verifying token:', err)
			return res.sendStatus(403)
		}
		req.user = user
		console.log('Authenticated user:', user)
		next()
	})
}

module.exports = authenticateToken
