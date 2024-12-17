const mongoose = require("mongoose");

// Schemas

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: [true, "Username is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: [true, "User exists"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		address: {
			type: Array,
		},
		phone: {
			type: String,
			required: [true, "Phone no. is required"],
		},
		usertype: {
			type: String,
			required: [true, "User type is required"],
			default: "client",
			enum: ["client", "admin", "vendor", "driver"],
		},
		profile: {
			type: String,
			default:
				"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg",
		},
		answer: {
			type: String,
			required: [true, "Answer is required"],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
