var Sequelize = require('sequelize');
var db = require('./_db');

var Message = db.define('message', {
	text: {
		type: Sequelize.STRING(1200)
	},
	locationName: {
		type: Sequelize.STRING,
	},
	latitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	longitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	city: {
		type: Sequelize.STRING
	}
});

module.exports = Message;