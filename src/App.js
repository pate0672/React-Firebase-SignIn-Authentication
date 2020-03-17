import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyCrNwnJvdOXrc5-vGeibjOqqjwqeNvucMA",
  authDomain: "fir-auth-f8ea7.firebaseapp.com"
});

class App extends Component {
  state = {
    isUserLoggedIn: false
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      successfulLogin: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isUserLoggedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isUserLoggedIn ? (
          <span>
            
              <div className="header">
              <div className="container">
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <h2> You're Signed In!</h2>
                <button
                  className="SignOutBtn"
                  onClick={() => firebase.auth().signOut()}
                >
                  Sign Out
                </button>
              </div>
              <div className="body">
                <img
                  className="profilePic"
                  alt="display picture"
                  src={firebase.auth().currentUser.photoURL}
                ></img>
              </div>
            </div>
          </span>
        ) : (
          <div className="bodyHomePage">
            <h1> Welcome to React Firebase Authentication</h1>

            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
