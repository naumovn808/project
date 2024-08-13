const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
	const token =
		req.cookies.accessToken || req.headers['authorization'].split(' ')[1]
	console.log(token)
	if (!token) {
		return res.status(401).send({ message: 'Unauthorized User!!!' })
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
