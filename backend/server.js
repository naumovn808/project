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
const router = express()
router.use(cors())
router.use(express.json())
router.use(CookieParser())
router.use(express.urlencoded({ extended: true }))
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
)
router.use(passport.initialize())
router.use(passport.session())
router.use('/auth', AuthRouter)
router.use('/products', ProductRouter)
router.get('/', authenticateToken, (req, res) => {
    res.redirect('http://localhost:3000/')
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

router.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
