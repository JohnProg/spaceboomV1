import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux'; 

import { MessageInList } from './message-in-list';
import { MessageDetailView } from './message-detail-view';

import { store } from './../store';
import { markAsUnread } from './../actions/';
import { updateMessageAsUnreadOnServer } from './../async/';

class MessageList extends Component {

	_getMessages(messages) {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return ds.cloneWithRows(messages);
	}

	_seeDetailView(message, messages){
		let currentMessage = messages.find((m) => m.id === message.id)
		if (currentMessage.unread === true) {
			store.dispatch(markAsUnread(currentMessage.id));
			updateMessageAsUnreadOnServer(currentMessage.id);
		}
		let state = store.getState();
		let comments = state.comments;
		let messageWithComments = Object.assign({}, currentMessage, {
			comments: comments.filter( comment => comment.messageId === currentMessage.id)
		})
		Actions.messageDetail({message: messageWithComments});
	}

	render () {
		return (
	    	<ListView 
	    	style={{flex: 12, margin: 0}}
	    	dataSource={this._getMessages(this.props.messages)}
	    	renderRow={ 
	    		(message) => <MessageInList author={message.author} 
	    		body={message.body}
	    		locationName={message.locationName}
	    		city={message.city}
	    		key={message.id}
	    		unread={message.unread} 
	    		authorPic={message.authorPic}
	    		buttonAction={() => this._seeDetailView(message, this.props.messages)} />} />
		);
	}
}

export { MessageList };