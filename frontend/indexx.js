const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB ulanishi
mongoose.connect('mongodb+srv://azamat2007pro:Partyshaker@partyshaker.6mr1hyx.mongodb.net/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('DB connection error:', error));
// User modelini yaratish
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// User yaratish
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received:', { name, email, password });

    try {
        const user = new User({ name, email, password });
        await user.save();
        console.log('User saved:', user);
        res.status(201).send(user);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).send(error);
    }
});


// Barcha userlarni olish
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        console.log('Users:', users);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// User yangilash
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.status(200).send(user);
});

// User o'chirish
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
