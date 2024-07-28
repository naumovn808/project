const express = require('express')
const CookieParser = require('cookie-parser')
const AuthRouter = require('./routes/auth')
const session = require('express-session')
const authenticateToken = require('./middleware/authenticateToken')
const ProductRouter = require('./routes/products')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const passport = require('passport')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(CookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)
app.get('/receiver.html', (req, res) => {
	res.redirect('http://localhost:5500/_receiver.html')
})
app.get('/', authenticateToken, (req, res) => {
	console.log(req.user)
	res.send(req.user)
})
mongoose.connect(
	'mongodb+srv://azamat2007pro:Partyshaker@partyshaker.6mr1hyx.mongodb.net/'
)
passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, user)
	})
})

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user)
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})
