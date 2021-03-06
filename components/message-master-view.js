import React, { Component } from 'react';
import { ListView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; 

import { addDiscoveredMessage } from './../actions/';
import { MessageInList } from './message-in-list';
import { MessageList } from './message-list';
import { MessageCounter } from './message-counter';

import { store } from './../store.js';
import { MessageDetailView } from './message-detail-view';
import { MenuButton } from './menu-button';
import { setVisibility, VisibilityFilters } from './../actions/';

class MessageMaster extends Component {

	render() {

		return (
	  	<View style={{flex: 1}}>
	  		<MessageCounter 
	  			messageCount={this.props.messages.length}
	  			filter={this.props.filter} />
	    	<MessageList messages={this.props.messages} />
	    	<View style={{flex: 1, flexDirection: 'row'}}>
	    		<MenuButton 
	    			buttonText={"Discovered"} 
	        		buttonColor={"#FFD700"}
	        		buttonAction={() => {store.dispatch(setVisibility(VisibilityFilters.DISCOVERED))}} />
	    		<MenuButton 
	    			buttonText={"Posted"} 
	        		buttonColor={"orange"}
	        		buttonAction={() => {store.dispatch(setVisibility(VisibilityFilters.SENT))}} />
	    	</View>
	    </View>
		);
	}
}

const getVisibleMessages = (messages, filter) => {
	let currentFilter;
	filter === "SENT" ? currentFilter = true : currentFilter = false; 
	let messageList = messages.filter(m => m.currentUser === currentFilter);
	console.log("MESSAGE LIST", messageList);
	if (!currentFilter) {
		return messageList.sort((a, b) => b.discoveryId - a.discoveryId);
	} else {
		return messageList.sort((a, b) => b.id - a.id);
	} 
}

const mapStateToProps = (state) => {
	return {
		messages: getVisibleMessages(state.messages, state.visibilityFilter),
		filter: state.visibilityFilter
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		buttonAction: (filter) => {dispatch(setVisibility(filter))}
	}
}

const MessageMasterView = connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageMaster);

export { MessageMasterView };

