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
