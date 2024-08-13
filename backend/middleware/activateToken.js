const jwt = require('jsonwebtoken')

const activateToken = (req, res, next) => {
	const token = req.params.token
	console.log(token)
	if (!token) {
		return res.status(403).send({ message: 'Token is not valid' })
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.log('Error verifying token:', err)
			return res.sendStatus(403)
		}
		req.user = user
		next()
	})
}

module.exports = activateToken
