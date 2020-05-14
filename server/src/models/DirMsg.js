const mongoose = require("mongoose");

const DMSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	displayname:{
		type: String,
		required: true,
	},
	convos: [
		{
			recipient:{
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
