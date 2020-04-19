const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	UID: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	video: {
		type: String,
		required: true,
	},
	comments: [
		{
			from: {
				type: String,
				required: true,
			},
			content: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model("Posts", PostSchema);
