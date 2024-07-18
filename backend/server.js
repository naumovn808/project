
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
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)
app.get('/', authenticateToken, (req, res) => {
	res.send(req.user)
})
mongoose.connect(
	'mongodb+srv://afruz:afruz123@patyshaker.xkimpcs.mongodb.net/Patyshaker'
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
=======
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

let drinks = [];

app.get('/drinks', (req, res) => {
    res.json(drinks);
});

app.post('/drinks', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const { name, description, rating } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const newDrink = { id: drinks.length + 1, name, description, rating, imageUrl };
    drinks.push(newDrink);
    res.status(201).json(newDrink);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
