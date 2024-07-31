const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		user_id: {	type: String, required: true },
		name: {	type: String, required: true },
		taste: [{ type: String, required: true }],
		format: { type: String, required: true },
		difficult: { type: Number, required: true },
		strength: { type: String, require: true },
	},

	{ timestamps: true }
)


module.exports = mongoose.model('users', userSchema)
