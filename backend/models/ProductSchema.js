const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		stars: { type: String, required: true },
		taste: [{ type: String, required: true }],
		format: { type: String, required: true },
		difficult: { type: Number, required: true },
		strength: { type: String, require: true },
		image: { type: String, require: true },
		chosen: { type: Boolean, default: false, required: true },
	},

	{ timestamps: true }
)

module.exports = mongoose.model('products', ProductSchema)
