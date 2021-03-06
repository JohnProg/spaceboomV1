import React, {Component} from 'react';

import { View } from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

import { store } from './../store';
import { sendAccessTokenToServer, getAllUserDataOnLogin } from './../async/';
import { deleteAllMessages, deleteAllComments, beginLoggingInOnLaunch } from './../actions/';

class FBLogin extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login cancelled.");
              } else {
                store.dispatch(beginLoggingInOnLaunch());
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let token = data.accessToken.toString();
                    return token;
                })
                .then(
                  (token) => {
                    //console.log("TOKEN:", token);
                    return sendAccessTokenToServer(token);
                })
                .then(
                  (response) => {
                    //console.log("RESPONSE PASSED INTO GET ALL MESSAGES:", response);
                    return getAllUserDataOnLogin(response.userId);
                })
                .then(
                  (response) => {
                    //console.log("RESPONSE AFTER HTTP REQUEST (STORE):", response);
                    let username = response.currentSession.username;
                    if (username === null || username === "NULL") {
                      Actions.newUsername();
                    } else {
                      Actions.initial();
                    }
                })
                .catch(
                  (err) => {
                    //console.log(err);
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            alert("logout.");
            store.dispatch(deleteAllMessages());
            store.dispatch(deleteAllComments());
            Actions.login();
          }}/>
      </View>
    );
  }
}

export { FBLogin };