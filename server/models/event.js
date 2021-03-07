const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		datetime: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
