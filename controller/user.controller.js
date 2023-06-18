const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userRegistration = async (req, res) => {
	try {
		const { email, name, password, role } = req.body;
		bcrypt.hash(password, 5, async (err, hash) => {
			const newUser = UserModel({ email, name, password: hash, role });
			await newUser.save();
			res.status(200).send({ msg: "Registration Successful" });
		});
	} catch (error) {
		res.status(400).send({ msg: "Error Ocurred" });
	}
};

const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					res.status(200).send({
						msg: "Login Successful",
						name: user.name,
						role: user.role,
						token: jwt.sign({ UserID: user._id }, process.env.JWT),
					});
				} else {
					res.status(400).send({ msg: "Wrong Credentials" });
				}
			});
		} else {
			res.status(400).send({ msg: "User Not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};

const userDetails = async (req, res) => {
	try {
		let id = req.body.userId;
		let data = await UserModel.findOne({ _id: id });
		localStorage.setItem("name", JSON.stringify(data.name));
		res.status(200).json(data);
	} catch (error) {
		res.status(501).send(error.message);
	}
};

module.exports = { userRegistration, userLogin, userDetails };
