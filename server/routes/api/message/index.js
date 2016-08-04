var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');

var router = express.Router();



//get messages for user
router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.params.id;
	//should get all discovered messages and all sent messages when app starts up
	Message.findAll({where: 
		{authorId: currentUserId}
	})
	.then(function (sentMessages) {
		Discovery.findAll({where: {
			discovererId: currentUserId
		}})
		//still need to include the actual info for messages, authors and discoverers, and not just the id numbers
		.then(function (discoveredMessages) {
			res.json({sentMessages, discoveredMessages});
		})
	}).catch(next);
});

//get all messages (for admin console)
router.get('/', function (req, res, next) {
	Message.findAll()
	.then(function(messages){
		res.json(messages);
	}).catch(next);
});

//post message -- when user submits a message
router.post('/', function (req, res, next) {

});

//

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});

//edit message (user who posted a message can change its body)
router.put('/:id', function (req, res, next) {

});

module.exports = router;
