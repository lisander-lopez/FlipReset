const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		require: false, // TODO Change true later
	},
	followers: [{ type: String }],
	following: [{ type: String }],
	posts: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Users", UserSchema);
