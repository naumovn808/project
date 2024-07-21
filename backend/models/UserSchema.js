const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		socialId: { type: String, required: true, unique: true },
		familyName: { type: String },
		givenName: { type: String },
		username: { type: String, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },  
		userPhotoLink: { type: String },
	},
	{ timestamps: true }
);


userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});


userSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = mongoose.model('users', userSchema);