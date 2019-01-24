const mongoose = require("mongoose");

const Purchase = new mongoose.Schema({
	ad: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Purchase", Purchase);