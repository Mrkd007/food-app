const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const JWT = require("jsonwebtoken");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    res.status(200).send("User Data")
  } catch (error) {
    console.log("User error --> ".bgBlue, error);
		res.status(500).send({
			success: false,
			message: "Error in fetching user details",
			error,
		});
  }
};

module.exports = {
	getUserController,
};
