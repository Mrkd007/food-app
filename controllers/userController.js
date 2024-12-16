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
			res.status(404).send({
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
			res.status(404).send({
				success: false,
				message: "User not found",
			});
		}
		//  update user
		const { userName, address, phone } = req.body;
		if(userName){
			user.userName = userName;
		}
		if(address){
			user.address = address;
		}
		if(phone){
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

module.exports = {
	getUserController,
	updateUserController,
};
