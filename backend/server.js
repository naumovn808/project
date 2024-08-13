const express = require('express')
const CookieParser = require('cookie-parser')
const AuthRouter = require('./routes/auth')
const ProfileRouter = require('./routes/profile')
const session = require('express-session')
const authenticateToken = require('./middleware/authenticateToken')
const ProductRouter = require('./routes/products')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const passport = require('passport')
const UserSchema = require('./models/UserSchema')
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
router.use('/profile', ProfileRouter)
router.get('/', authenticateToken, (req, res) => {
    res.redirect('http://localhost:3000/')
})

router.get('/profile', async (req, res) => {
    try {
        const id = req.user.id
        const user = await UserSchema.findOne({ _id: id })
        res.send({ message: user })
    } catch (error) {

    }

})


mongoose.connect(
    `mongodb+srv://azamat2007pro:Partyshaker@partyshaker.qdklfng.mongodb.net/`
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
