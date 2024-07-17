const mongoose = require('mongoose');
const { body } = require('express-validator')


const ProductSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 10
    },
    description: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 20
    }
}, {
    timestamps: true
});

export const ProductValidation = [
    body('imageUrl', 'Заполнение обязательно').isURL(),
    body('title', 'Должно быть название, не менее 4 символов').isLength({ min: 4 }),
    body('description', 'Информация об этом товаре'),
];

export default mongoose.model('Product', ProductSchema);