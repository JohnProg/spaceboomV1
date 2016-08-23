var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var User = require('./../../../models/user');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');

router.get('/login/:id', function (req, res, next) {
	console.log("THE LOGIN ROUTE IS HIT");

	var currentUserId = req.params.id;

	var allPostedMessages = Message.findAll({where: 
		{
			authorId: currentUserId,
			deletedByUser: false
		}, 
		include: {model: User, as: "author"}
	})
	var allDiscoveredMessages = Discovery.findAll({where: 
		{
			discovererId: currentUserId,
			hidden: false
		},
		include: {model: Message, 
					as: "message", 
					include: {
						model: User, 
						as: "author"}
					}
	})
	var userInfo = User.findOne({where:
		{
			id: currentUserId
		}
	})

	Promise.all([
		allPostedMessages, 
		allDiscoveredMessages, 
		userInfo
	])
	.spread(function (sentMessages, discoveredMessages, userInfo) {
		res.json({
			sentMessages, 
			discoveredMessages,
			userInfo
		});
	}).catch(next);
})

//get all users - admin panel
router.get('/', function (req, res, next) {
	User.findAll()
	.then(function (users) {
		res.json(users);
	}).catch(next);
})
//ban user
router.put('/ban/:id', function (req, res, next) {
	var id = req.params.id;
	User.findOne({where:
		{id: id}
	}).then(function (user) {
		return user.update({banned: true});
	}).then(function (user) {
		res.send(user);
	}).catch(next);

})

//delete user -- for admin console
router.delete('/:id', function (req, res, next){
	res.send("UNDER CONSTRUCTION");
})

//add user when a new user joins
router.post('/', function (req, res, next) {
	var email = req.body.email;
	var name = req.body.name;
	var authorPic = req.body.authorPic;

	User.create({
		email, 
		name, 
		authorPic})
	.then(function (success){
		res.json(success);
	}).catch(next);
})

module.exports = router;
