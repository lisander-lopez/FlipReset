require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3060;

//MiddleWare for General things
app.use(bodyParser.json()); // BodyParse so we can prase json from requests

// NEEDED FOR LOCAL DEVELOPMENT

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Importing Routes
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");

// Using Routes
app.use("/posts", postsRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
	res.send("HomePage");
});
//Connect to DB
mongoose.connect(
	process.env.DB_CONNECTION,
//"mongodb://flipreset:flipreset123@ds049288.mlab.com:49288/flipreset",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Connected to the database!");
	}
);

app.listen(PORT);
