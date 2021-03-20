const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fightSchema = new Schema({
	fighter1: {
		type: String,
		required: true,
		minLength: 1,
	},
	fighter2: {
		type: String,
		required: true,
		minLength: 1,
	},
	titleFight: {
		type: Boolean,
		required: true,
	},
	fiveRounds: {
		type: Boolean,
		required: true,
	},
	winner: {
		type: String,
		required: false,
	},
	method: {
		type: String,
		required: false,
	},
	round: {
		type: String,
		required: false,
	},
});

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
		fights: [fightSchema],
	},
	{ timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
