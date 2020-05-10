const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

router.get("/:followerUid/:followingUid", addFollower);
// MIGHT HAVE TO CHANGE PUSHALL to PUSH
router.delete("/:followerUid/:followingUid", deleteFollower);

async function addFollower(req, res) {
	try {
		const follower = await User.findOne({ userID: req.params.followerUid });
		const following = await User.findOne({ userID: req.params.followingUid });
		if (
			follower.following.includes(req.params.followingUid) ||
			following.followers.includes(req.params.followerUid)
		) {
			return deleteFollower(req, res);
		}
		const user = await User.updateOne(
			{ userID: req.params.followerUid },
			{ $push: { following: req.params.followingUid } }
		);
		const user2 = await User.updateOne(
			{ userID: req.params.followingUid },
			{ $push: { followers: req.params.followerUid } }
		);
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).res({ message: error });
	}
}

async function deleteFollower(req, res) {
	try {
		const user = await User.updateOne(
			{ userID: req.params.followerUid },
			{ $pull: { following: req.params.followingUid } }
		);
		const user2 = await User.updateOne(
			{ userID: req.params.followingUid },
			{ $pull: { followers: req.params.followerUid } }
		);
		res.status(200).json(user);
	} catch (error) {
		res.status(400).res({ message: error });
	}
}
module.exports = router;
