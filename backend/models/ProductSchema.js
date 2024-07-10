const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: { type: String, required: true },
		taste: [{ type: String, required: true }],
		format: { type: String, required: true },
		difficult: { type: Number, required: true },
		strength: { type: String, require: true },
		image: { type: String, require: true },
	},

	{ timestamps: true }
)

module.exports = mongoose.model('product', userSchema)
