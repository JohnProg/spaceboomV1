export const markAsUnread = function (id) {
	return {
		type: 'MARK_AS_UNREAD', 
		id
	}
}

export const addCurrentSessionOnLogin = function (userId, email, name, authorPic, username) {
	return {
		type: 'ADD_CURRENT_SESSION_ON_LOGIN',
		userId,
		email,
		name,
		authorPic,
		username
	}
}

export const deleteMessage = function(id) {
	return {
		type: 'DELETE_MESSAGE', 
		id
	}
}

export const updateNewMessageBody = function (body) {
	return {
		type: 'UPDATE_NEW_MESSAGE_BODY',
		body
	}
}

export const addSentMessage = function (id, body, author, authorPic, latitude, longitude, locationName, city) {
	return {
		type: 'ADD_SENT_MESSAGE', 
		id,
		body, 
		author, 
		authorPic, 
		latitude,
		longitude, 
		locationName, 
		city
	};
}

export const addDiscoveredMessage = function (id, body, author, authorPic, latitude, longitude, locationName, city) {
	return {
		type: 'ADD_DISCOVERED_MESSAGE', 
		id,
		body, 
		author, 
		authorPic, 
		latitude,
		longitude, 
		locationName, 
		city
	};
}

export const setVisibility = function (filter) {
	return {type: 'SET_VISIBILITY', filter}
}

export const VisibilityFilters = {
	DISCOVERED: "DISCOVERED",
	SENT: "SENT"
}