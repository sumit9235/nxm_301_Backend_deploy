const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "student",
		enum: ["instructor", "student"],
	}
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
