const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
	{
		socialId: { type: String, required: true, unique: true },
		familyName: { type: String },
		givenName: { type: String },
		username: {
			type: String,
			unique: true,
		},
		email: { type: String, required: true, unique: true },
		password: { type: String, unique: true },
		userPhotoLink: { type: String },
	},

	{ timestamps: true }
)

module.exports = mongoose.model('users', userSchema)
