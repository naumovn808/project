const multer = require('multer')
const express = require('express')


let cocktails = [];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/cocktails', (req, res) => {
    res.json(cocktails);
});

app.post('/cocktails', upload.single('image'), (req, res) => {
    const { name, description, rating } = req.body;
    const newCocktail = { id: cocktails.length + 1, name, description, rating, image: req.file.filename };
    cocktails.push(newCocktail);
    res.status(201).json(newCocktail);
});

app.put('/cocktails/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, description, rating } = req.body;
    const cocktailIndex = cocktails.findIndex(c => c.id === parseInt(id));
    if (cocktailIndex === -1) {
        return res.status(404).json({ error: 'Cocktail not found' });
    }
    const updatedCocktail = { id: parseInt(id), name, description, rating, image: req.file.filename };
    cocktails[cocktailIndex] = updatedCocktail;
    res.json(updatedCocktail);
});

app.delete('/cocktails/:id', (req, res) => {
    const { id } = req.params;
    const cocktailIndex = cocktails.findIndex(c => c.id === parseInt(id));
    if (cocktailIndex === -1) {
        return res.status(404).json({ error: 'Cocktail not found' });
    }
    const deletedCocktail = cocktails.splice(cocktailIndex, 1)[0];
    res.json(deletedCocktail);
});