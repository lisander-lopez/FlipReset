const mongoose = require("mongoose");

const DMSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	convos: [
		{
			recipientID: {
				type: String,
				required: true,
			},
			messages: [
				{
					from: {
						type: String,
						required: true,
					},
					content:{
						type: String,
						required: true,
					},
				}
			],
		},
	],
});

module.exports = mongoose.model("DirMsg", DMSchema);
