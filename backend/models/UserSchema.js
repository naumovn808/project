const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
	{
		socialId: { type: String },
		familyName: { type: String },
		givenName: { type: String },
		username: { type: String },
		email: { type: String, required: true },
		password: { type: String, require: true },
		userPhotoLink: { type: String },
	},

	{ timestamps: true }
)

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) return next()
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (error) {
		return next(error)
	}
})

userSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('users', userSchema)
