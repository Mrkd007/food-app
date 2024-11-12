const userModel = require("../models/userModel");

// REGISTER
const registerController = async (req, res) => {
	try {
		const { userName, email, password, phone, address } = req.body;
		// validation
		if (!userName || !email || !password || !phone) {
			return res.send(500).send({
				success: false,
				message: "Please provide all field data",
			});
		}
		// check user
		const existing = await userModel.findOne({ email });
		if (existing) {
			return res.send(500).send({
				success: false,
				message: "User already exists",
			});
		}

		// create user
		const user = await userModel.create({
			userName,
			email,
			password,
			phone,
			address,
		});
		res.status(201).send({
			success: true,
			message: "Successfully registered",
		});
	} catch (error) {
		console.log("Auth error --> ".bgBlue, error);
		res.send(500).send({
			success: false,
			message: "Error in register api",
			error,
		});
	}
};

// LOGIN
const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		// validation
		if (!email || !password) {
			return res.status(500).send({
				success: false,
				message: "Please provide email or password",
			});
		}

		// check user
		const user = await userModel.findOne({ email: email, password: password });
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not found or password mismatch",
			});
		}

		return res.status(200).send({
			success: true,
			message: "Login Successfully",
			user,
		});
	} catch (error) {
		console.log("Auth error --> ".bgBlue, error);
		return res.send(500).send({
			success: false,
			message: "Error in login api",
			error,
		});
	}
};

module.exports = {
	registerController,
	loginController,
};