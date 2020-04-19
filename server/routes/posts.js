const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
// Gets all posts
router.get("/", async (req, res) => {
	try {
		const allPosts = await Post.find();
		res.status(200).json(allPosts);
	} catch (error) {
		res.status(400).res({ message: error });
	}
});

// Inserts a post
router.post("/", async (req, res) => {
	// FIRST CHECK IF UID IS IN DATABASE
	const UID = req.body.UID;
	const post = new Post({
		author: req.body.author,
		UID: req.body.UID,
		video: req.body.video,
	});
	try {
		const dbPost = await post.save();
		// Add Post to associated Author in User Collection
		const user = await User.findOneAndUpdate(
			{ userID: UID },
			{ $push: { posts: post.id } },
			{ new: true }
		);
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json(JSON.stringify(error));
	}
});

// Get post from postID
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Delete Post to associated Author in User Collection
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

// Delete post from postID
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findOneAndRemove({ _id: req.params.id });
		const user = post.UID; // THE author iof the pst just deleted
		const userDB = await User.findOneAndUpdate(
			{ userID: user },
			{ $pullAll: { posts: [post._id] } },
			{ new: true }
		);
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

// Increase postID Like by one
router.get("/addLike/:id", async (req, res) => {
	try {
		const post = await Post.updateOne(
			{ _id: req.params.id },
			{ $inc: { likes: 1 } }
		);
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

router.get("/getLikes/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const likes = post.likes;

		res.status(200).json(likes);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

// Add comment to postID
router.post("/comment/:id", async (req, res) => {
	try {
		const comment = {
			from: req.body.UID,
			content: req.body.text,
		};
		const post = await Post.updateOne(
			{ _id: req.params.id },
			{ $push: { comments: comment } }
		);
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

// Get comments from postID
router.get("/comment/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const comments = post.comments;

		res.status(200).json(comments);
	} catch (error) {
		res.status(400).json({ message: error });
	}
});

module.exports = router;
