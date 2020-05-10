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

// Get all users from perspective of :id and add following flag
router.get("/all/:id", async (req, res) => {
	try {
		let ret = [];
		const user = await User.findOne({ userID: req.params.id });
		const allUsers = await User.find();
		const copy = JSON.parse(JSON.stringify(allUsers));
		console.log(user);
		console.log("--------All other users------");
		for (let i = 0; i < allUsers.length; i++) {
			let listUser = copy[i];
			console.log("list user", listUser);
			if (listUser.userID !== req.params.id) {
				console.log(user.following);
				if (user.following.includes(listUser.userID)) {
					console.log("ha");
					listUser["isFollowing"] = true;
				} else {
					console.log("ha");
					listUser["isFollowing"] = false;
				}
				console.log("IT IS", listUser["isFollowing"]);
				ret.push(listUser);
			}
		}
		console.log("ret", ret);
		res.status(200).json(ret);
		/*
		
		const jAllUsers = JSON.parse(allUsers);

		console.log(jUser);
		res.status(200).json(user);
		*/
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
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
	console.log("Got Display name " + req.body.displayName);
	try {
		const dbUser = await user.save();
		res.status(200).json(dbUser);
	} catch (error) {
		res.status(400).res({ message: error });
	}
});

module.exports = router;
