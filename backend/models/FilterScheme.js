const mongoose = require('mongoose')

const FilterScheme = new mongoose.Schema(
	{
		user_id: {	type: String, required: true },
		taste: [{ type: String, required: true }],
		format: [{ type: String, required: true }],
		difficult: [{ type: String, required: true }],
		strength: [{ type: String, require: true }],
	},
	{ timestamps: true }
)


module.exports = mongoose.model('filters', FilterScheme)
