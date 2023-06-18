const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const {instRouter}= require('./routes/course.routes')
const {verify}=require('./middleware/jwtAuth.middleware')
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use(verify)
app.use("/courses",instRouter)

app.listen(PORT, async () => {
	try {
		await connection();
		console.log(`Listening at port - ${PORT}`);
	} catch (error) {
		console.error(error.message);
	}
});
