const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const JWT = require("jsonwebtoken");

// GET USER INFO
const getUserController = async (req, res) => {
	try {
		// find user
		const user = await userModel.findById({ _id: req.body.id });
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not found",
			});
		}
		//  hiden password
		user.password = undefined;
		// resp
		res.status(200).send({
			success: true,
			message: "User data fetched successfully",
			user,
		});
	} catch (error) {
		console.log("User error --> ".bgBlue, error);
		res.status(500).send({
			success: false,
			message: "Error in fetching user details",
			error,
		});
	}
};
// GET USER INFO
const updateUserController = async (req, res) => {
	try {
		// find user
		const user = await userModel.findById({ _id: req.body.id });
		// validate user
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not found",
			});
		}
		//  update user
		const { userName, address, phone } = req.body;
		if (userName) {
			user.userName = userName;
		}
		if (address) {
			user.address = address;
		}
		if (phone) {
			user.phone = phone;
		}
		// save user
		await user.save();
		// resp
		res.status(200).send({
			success: true,
			message: "User updated successfully",
		});
	} catch (error) {
		console.log("User error --> ".bgBlue, error);
		res.status(500).send({
			success: false,
			message: "Error in updating user details",
			error,
		});
	}
};

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
	try {
		// find user
		const user = await userModel.findById({ _id: req.body.id });
		// validate user
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not found",
			});
		}
		// get data from user
		const { oldPassword, newPassword } = req.body;
		// validation
		if (!oldPassword || !newPassword) {
			return res.status(500).send({
				success: false,
				message: "Please provide old password and new password",
			});
		}
		// check user password and compare password
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.status(404).send({
				success: false,
				message: "Invalid old password",
			});
		}

		//  update password
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		user.password = hashedPassword;
		// save user
		await user.save();
		// resp
		res.status(200).send({
			success: true,
			message: "Password updated successfully",
		});
	} catch (error) {
		console.log("User error --> ".bgBlue, error);
		res.status(500).send({
			success: false,
			message: "Error in update password api",
			error,
		});
	}
};

// RESET USER PASSWORD
const resetPasswordController = async (req, res) => {
	try {
		const { email, newPassword, answer } = req.body;
		// validation
		if (!email || !newPassword || !answer) {
			return res.status(500).send({
				success: false,
				message: "Please provide email, new password and answer",
			});
		}
		// find user
		const user = await userModel.findOne({ email, answer });
		// validate user
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not found or invalid answer",
			});
		}
		//  update password
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		user.password = hashedPassword;
		// save user
		await user.save();
		// resp
		res.status(200).send({
			success: true,
			message: "Password reset successfully",
		});
	} catch (error) {
		console.log("User error --> ".bgBlue, error);
		res.status(500).send({
			success: false,
			message: "Error in reset password api",
			error,
		});
	}
};

const deleteProfileController = async (req, res) => {
	try {
		// find user
		const user = await userModel.findById({ _id: req.params.id });
		// validate user
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not found",
			});
		}
		// delete user
		await userModel.findByIdAndDelete({ _id: req.params.id });
		// resp
		res.status(200).send({
			success: true,
			message: "Your accocount has been deleted successfully",
		});
	} catch (error) {
		console.log("User error --> ".bgBlue, error);
		res.status(500).send({
			success: false,
			message: "Error in delete profile api",
			error,
		});
	}
};

module.exports = {
	getUserController,
	updateUserController,
	resetPasswordController,
	updatePasswordController,
	deleteProfileController,
};
