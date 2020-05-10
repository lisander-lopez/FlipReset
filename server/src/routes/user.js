const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

// Get all Users
router.get("/", async (req, res) => {
	try {
		const allUsers = await User.find();
		res.status(200).json(allUsers);
	} catch (error) {
		res.status(400).res({ message: error });
	}
});
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findOne({ userID: req.params.id });
		res.status(200).json(user);
	} catch (error) {
		res.status(400).res({ message: error });
	}
});

// Insert User
router.post("/", async (req, res) => {
	// Future References PLEASE ADD DISPLAY NAME
	// Future CHECK FOR DUPLICATES IN DATABSE!
	const user = new User({
		userID: req.body.UID,
		displayName: req.body.displayName,
	});
	try {
		const dbUser = await user.save();
		res.status(200).json(dbUser);
	} catch (error) {
		res.status(400).res({ message: error });
	}
});

module.exports = router;
