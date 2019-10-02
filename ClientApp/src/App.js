import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Login from './components/Login';

export default class App extends Component {
  displayName = App.name

  constructor(props) {
    super(props);
    this.state = { currentUser: null, MTUverification: 0 };
    this.handleUserInfoDisplay = this.handleUserInfoDisplay.bind(this);
    this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleResetData = this.handleResetData.bind(this);
  }

  handleUserInfoDisplay()
  {
    fetch('api/Login/UserData')
    .then(response => response.json())
    .then(data => {
    console.log(data);
    this.setState({ currentUser: data });
    console.log(this.state.currentUser);
    console.log(this.state.currentUser.userName);
    });
  }
  handleResetData()
  {
    this.setState({ currentUser: null});
  }

  handleUpdateUserInfo(user)
  {
    let data = JSON.stringify({username: user.userName, password: user.password, email: user.email, userid: user.userId});
    fetch('api/Login/UpdateUser',
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
      });
  }
  handleAddUser(user)
  {
    let data = JSON.stringify({username: user.userName, password: user.password, email: user.email, userid: user.userId});
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
      console.log(newdata);
    });
  }
  handleLoginUser(user)
  {
    let data = JSON.stringify({username: user.userName, password: user.password, email: user.email, userid: user.userId});
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
      this.setState({ MTUverification: newdata });
      if(this.state.MTUverification === 1)
      {
        console.log("No Such Username.");
      }
      else if(this.state.MTUverification === 2)
      {
        console.log("Correct User Name, Incorrect Password.");
      }
      else
      {
        console.log("Login data correct.");
      }
    });

  }

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route
          path='/login'
          render={(props)=>
            <Login
              currentUser={this.state.currentUser}
              MTUverification={this.state.MTUverification}
              onUserInfoDisplay={this.handleUserInfoDisplay}
              onUpdateUserInfo={this.handleUpdateUserInfo}
              onAddUser={this.handleAddUser}
              onLoginUser={this.handleLoginUser}
              onResetData={this.handleResetData}/>} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
      </Layout>
    );
  }
}
