const jwt = require("jsonwebtoken");
require("dotenv").config();
const verify = async (req, res, next) => {
	try {
		const tkn = req.headers.authorization
		const decoded = jwt.verify(tkn,process.env.JWT);
		if (decoded) {
			req.body.UserID = decoded.UserID;
			next();
		} else {
			res.status(400).send({ msg: "Something Went Wrong" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};

module.exports = { verify };
