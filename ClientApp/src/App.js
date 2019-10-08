import React, { Component } from 'react';
import { Route } from 'react-router';

import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Account from './components/Account';
import CreateAccount from './components/CreateAccount';

export default class App extends Component {
  displayName = App.name

  constructor(props) {
    super(props);
    this.state = { currentUser: null, MTUverification: 0, currentView: "login" };
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleSessionView = this.handleSessionView.bind(this);
  }

  handleSessionView()
  {
    this.setState({ currentView: "session" });
  }
  handleRecordsView()
  {
    this.setState({ currentView: "records" });
  }

  handleCreateUser(user)
  {
    let data = JSON.stringify({username: user.userName, password: user.password, email: user.email});
    fetch('api/Login/AddUser',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json())
        .then(newdata => {
    });
  }
  handleLoginUser(user)
  {
    let data = JSON.stringify({username: user.userName, password: user.password});
    fetch('api/Login/UserLogin',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json())
        .then(newdata => {
      this.setState({ currentUser: newdata });
      if(this.state.currentUser.userid === "0")
      {
        console.log(this.state.currentUser.userid);
        console.log("Incorrect Login Info.");
      }
      else
      {
        this.setState({currentView: "accountoptions"});
        console.log(this.state.currentUser.userid);
        console.log("Login data correct.");
      }
    });

  }

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/account'
            render={(props)=>
            <Account
              currentUser={this.state.currentUser}
              currentView={this.state.currentView}
              onLoginUser={this.handleLoginUser}
              onSessionViewClicked={this.handleSessionView}/>} />
          <Route path='/createaccount'
              render={(props)=>
                <CreateAccount
                onCreateUser={this.handleCreateUser}/>} />
      </Layout>
    );
  }
}
