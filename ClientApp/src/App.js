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
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleSessionStart = this.handleSessionStart.bind(this);
  }

  handleChangeView(view)
  {
    this.setState({ currentView: view});
  }

  handleCreateUser(user)
  {
    let data = JSON.stringify({userName: user.userName, password: user.password, email: user.email});
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
    let data = JSON.stringify({userName: user.userName, password: user.password});
    console.log("data = " + data);
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
        this.setState({currentView: "login"});
      }
      else
      {
        this.setState({currentView: "accountoptions"});
      }
    });
  }
  //The number being used to accurately keep time is too large to send via API as it stands.
  handleSessionStart(user)
  {
    // let data = JSON.stringify({userName: user.userName,
    //                           password: this.state.currentUser.password,
    //                           email: this.state.currentUser.email,
    //                           sessionStartDate: user.sessionStartDate,
    //                           normalizedStartTime: user.normalizedStartTime,
    //                           sessionStartTime: user.sessionStartTime,
    //                           userId: this.state.currentUser.userid});
    //
    // console.log("data = " + data);
    // fetch('api/Login/StartSession',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json, text/plain',
    //       'Content-Type': 'application/json'
    //     },
    //     body: data
    //   }).then(response => response.json())
    //     .then(newdata => {
    //   console.log("new data = " + newdata);
    //   this.setState({currentUser: newdata});
    // });
    let stringstart = user.sessionStartTime.toString();
    console.log("int: " + user.sessionStartTime + " and string: " + stringstart);
    let data = JSON.stringify({userName: user.userName,
                              password: this.state.currentUser.password,
                              email: this.state.currentUser.email,
                              sessionStartDate: user.sessionStartDate,
                              normalizedStartTime: user.normalizedStartTime,
                              sessionStartTime: stringstart,
                              userId: this.state.currentUser.userid});
    console.log("data = " + data);
    fetch('api/Login/ApiTest',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: data
      }).then(response => response.json())
        .then(newdata => {
          console.log(newdata);
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
              onChangeViewClicked={this.handleChangeView}
              onSessionStart={this.handleSessionStart}/>} />
          <Route path='/createaccount'
              render={(props)=>
              <CreateAccount
              onCreateUser={this.handleCreateUser}/>} />
      </Layout>
    );
  }
}
