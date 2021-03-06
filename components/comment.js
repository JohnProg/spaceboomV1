import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, AlertIOS } from 'react-native';
let moment = require('moment');

import { store } from './../store';
import { deleteCommentOnServer, currentUserId } from './../async';

import { CommentLikeButtonAndCounter } from './comment-like-button-and-counter';
import { AuthorPic } from './author-pic'

class Comment extends Component {

	render () {

		function displayFormattedTime (comment) {
			if (comment.createdAt) {
				return moment(comment.createdAt).fromNow();
			}	
		}

		function deleteComment (comment, type) {
			if (comment) {
				AlertIOS.alert(
					"Delete Comment", 
					"Are you sure you want to delete this comment?",
					[
						{
						text: "Cancel", 
						onPress: () => console.log("user didn't delete comment"), 
						style: "cancel"
						},
						{
						text: "Delete", 
						onPress: function () {
							deleteCommentOnServer(comment.id, type)
							.then( () => {
								AlertIOS.alert("", "Comment deleted!");
							})
							}
						}
					]
				)
			}
		}

		function displayDeleteButton (comment, commentedOnId, type) {
			if (comment.currentUser || commentedOnId === currentUserId) {
				return (
				<TouchableHighlight style={{height: 10, width: 55}} onPress={() => {deleteComment(comment, type)}}>
				<Text style={{color: '#949494', fontSize: 10}}>
					- DELETE
				</Text>
				</TouchableHighlight>
				);
			}
		}

		return (
			<View style={{flexDirection: 'row', 
			marginVertical: 8,
			backgroundColor: '#F5F5F5',
			minHeight: 60
			}}>
				<View style={{flex: 2, flexDirection: 'column'}}>
					<AuthorPic message={this.props.comment} 
						style={{height: 40, 
							width: 40, 
							borderRadius: 20, 
							alignSelf: 'center'}} />
				</View>
				<View style={{flex: 8, flexDirection: 'column'}}>
					<View style={{flex: 1, margin: 1}}>
						<Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 2}}>
						{this.props.comment.author}
						</Text>
						<Text style={{fontSize: 14, margin: 1}}>
						{this.props.comment.body}
						</Text>
						<View style={{flexDirection: "row", marginVertical: 6}}>
							<Text style={{fontSize: 10, color: '#949494'}}>
							{displayFormattedTime(this.props.comment)}
							{" "}
							{displayDeleteButton(this.props.comment, this.props.userIdOfCommentedOn, this.props.commentType)}
							</Text>
						</View>
					</View>
				</View>
				<View style={{flex: 3, flexDirection: 'column'}}>
					<CommentLikeButtonAndCounter comment={this.props.comment} commentType={this.props.commentType} />
				</View>
			</View>

		);
	}
}

export { Comment };
