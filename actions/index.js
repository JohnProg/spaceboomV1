export const beginLoggingInOnLaunch = function () {
	return {
		type: "BEGIN_LOGGING_IN_ON_LAUNCH"
	}
}

export const addUsername = function (username) {
	return {
		type: 'ADD_USERNAME',
		username
	};
}

export const changeAuthorNameOfSentMessages = function (author) {
	return {
		type: 'CHANGE_AUTHOR_NAME_OF_SENT_MESSAGES',
		author
	}
}

export const markAsUnread = function (id) {
	return {
		type: 'MARK_AS_UNREAD', 
		id
	};
}

export const updateNewMessageText = function (newMessageText) {
	return {
		type: 'UPDATE_NEW_MESSAGE_TEXT',
		newMessageText
	}
}

export const downloadingOn = function () {
	return {
		type: 'DOWNLOADING_ON'
	}
}

export const downloadingOff = function () {
	return {
		type: 'DOWNLOADING_OFF'
	}
}

export const addCurrentSessionOnLogin = function (userId, email, name, facebookName, authorPic, username) {
	return {
		type: 'ADD_CURRENT_SESSION_ON_LOGIN',
		userId,
		email,
		name,
		facebookName,
		authorPic,
		username
	};
}

export const updateLocationName = function (locationName) {
	return {
		type: 'UPDATE_LOCATION_NAME',
		locationName
	}
}

export const deleteAllMessages = function () {
	return {
		type: 'DELETE_ALL_MESSAGES'
	};
}

export const deleteMessage = function (id) {
	return {
		type: 'DELETE_MESSAGE', 
		id
	};
}

export const markMessageAsLiked = function (id, numberOfLikes) {
	return {
		type: 'MARK_MESSAGE_AS_LIKED',
		id,
		numberOfLikes
	}
}

export const markMessageAsUnliked = function (id, numberOfLikes) {
	return {
		type: 'MARK_MESSAGE_AS_UNLIKED',
		id,
		numberOfLikes
	}
}

export const addSentMessage = function (id, body, author, authorPic, authorId, latitude, longitude, locationName, city, timesDiscovered, numberOfLikes, isLikedByCurrentUser, createdAt) {
	return {
		type: 'ADD_SENT_MESSAGE', 
		id,
		body, 
		author, 
		authorPic,
		authorId, 
		latitude,
		longitude, 
		locationName, 
		city,
		timesDiscovered,
		numberOfLikes,
		isLikedByCurrentUser,
		createdAt
	};
}

export const addDiscoveredMessage = function (id, body, author, authorPic, authorId, latitude, longitude, locationName, city, unread, timesDiscovered, numberOfLikes, isLikedByCurrentUser, createdAt, discoveryId) {
	return {
		type: 'ADD_DISCOVERED_MESSAGE', 
		id,
		body, 
		author, 
		authorPic,
		authorId, 
		latitude,
		longitude, 
		locationName, 
		city,
		unread,
		timesDiscovered,
		numberOfLikes,
		isLikedByCurrentUser,
		createdAt,
		discoveryId
	};
}

export const deleteComment = function (id) {
	return {
		type: 'DELETE_COMMENT',
		id
	};
}

export const addComment = function (id, messageId, body, author, authorPic, authorId, currentUser, isLikedByCurrentUser, numberOfLikes, createdAt) {
	return {
		type: 'ADD_COMMENT',
		id,
		messageId,
		body,
		author,
		authorPic,
		authorId,
		currentUser,
		isLikedByCurrentUser,
		numberOfLikes,
		createdAt
	};
}

export const markCommentAsLiked = function (commentId, numberOfLikes) {
	console.log("gets to action");
	return {
		type: 'MARK_AS_LIKED',
		id: commentId,
		numberOfLikes
	}
}

export const markCommentAsUnliked = function (commentId, numberOfLikes) {
	console.log("gets to action");
	return {
		type: 'MARK_AS_UNLIKED',
		id: commentId,
		numberOfLikes
	}
}

export const deleteAllComments = function () {
	return {
		type: 'DELETE_ALL_COMMENTS'
	}
}

export const setVisibility = function (filter) {
	return {
		type: 'SET_VISIBILITY', 
		filter
	};
}

export const VisibilityFilters = {
	DISCOVERED: "DISCOVERED",
	SENT: "SENT"
}