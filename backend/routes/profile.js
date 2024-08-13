const express = require('express')
const router = express.Router()
const UserSchema = require('../models/UserSchema');
const authenticateToken = require('../middleware/authenticateToken');
require('dotenv').config()

router.put('/update', authenticateToken, async (req, res) => {
    const { name, surname, userAvatar, nickname, email, updatePassword } = req.body;
    try {
        const user = await UserSchema.findById(req.user.id);

        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (userAvatar) user.userAvatar = userAvatar;
        if (nickname) user.nickname = nickname;
        if (email) user.email = email;
        if (updatePassword) user.password = await bcrypt.hash(updatePassword, 10);

        await user.save();
        res.status(200).send('Profile updated successfully');
    } catch (error) {
        ``
        console.error(error);
        res.status(500).send('Error updating profile');
    }
});

const upload = multer({ dest: '/uploads/' });

router.post('/upload', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.avatar = req.file.path;

        await user.save();
        res.status(200).send('Avatar updated');
    } catch (error) {
        res.status(500).send('Error updating avatar');
    }
});

router.post('/password-reset', authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('Password reset email sent');
    } catch (error) {
        res.status(500).send('Error sending password reset email');
    }
});

router.delete('/delete-account/:id', authenticateToken, async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }

        await user.remove();
        res.status(200).send('Account deleted');
    } catch (error) {
        res.status(500).send('Error deleting account');
    }
});


module.exports = router