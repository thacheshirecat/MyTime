import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Login(props) {
  // let contents = this.state.loading ? <p><em>Loading...</em></p> : Login.renderUserInfo(this.state.user);
  let contents = <p>Click Button to Display User Info</p>;
  let loginMessage = null;
  let _usernameLogin = null;
  let _passwordLogin = null;
  let _username = null;
  let _password = null;
  let _email = null;
  let _username2 = null;
  let _password2 = null;
  let _email2 = null;

  function userInfoButtonClicked()
  {
    props.onUserInfoDisplay();
  }
  function updateUserClicked()
  {
    console.log(_username.value);
    props.onUpdateUserInfo({userName: _username.value, password: _password.value, email: _email.value, userId: props.currentUser.userId});
  }
  function addUserClicked()
  {
    props.onAddUser({userName: _username2.value, password: _password2.value, email: _email2.value, userId: 0});
  }
  function loginUserClicked()
  {
    props.onLoginUser({userName: _usernameLogin.value, password: _passwordLogin.value, email: "login", userId: 0});
  }
  function resetDataClicked()
  {
    props.onResetData();
  }

  function errorText()
  {
    return (
      <div>
        <p>Error: Incorrect Login</p>
      </div>
    );
  }

  function renderUserInfo()
  {
    return (
    <div>
      <button onClick={resetDataClicked}>Reset</button>
      <hr/>
      <p>User Id: {props.currentUser.userId}</p>
      <p>Username: {props.currentUser.userName}</p>
      <p>Password: {props.currentUser.password}</p>
      <p>Email: {props.currentUser.email}</p>
      <hr/>
      <h3>Change User Info</h3>
      <form>
        <label>Username</label><br/>
        <input
          placeholder = 'Username'
          type = 'text'
          id = 'newUserName'
          ref={(input) => {_username = input;}}
          required="required" /><br/>
        <label>Password</label><br/>
        <input
          placeholder = 'Password'
          type = 'text'
          id = 'newPassword'
          ref={(input) => {_password = input;}}
          required="required" /><br/>
        <label>Email</label><br/>
        <input
          placeholder = 'Email'
          type = 'text'
          id = 'newEmail'
          ref={(input) => {_email = input;}}
          required="required" /><br/>
        </form>
        <button onClick={updateUserClicked}>Submit</button>
        <hr/>
        <h3>Add New User</h3>
        <form>
          <label>Username</label><br/>
          <input
            placeholder = 'Username'
            type = 'text'
            id = 'newUserName'
            ref={(input) => {_username2 = input;}}
            required="required" /><br/>
          <label>Password</label><br/>
          <input
            placeholder = 'Password'
            type = 'text'
            id = 'newPassword'
            ref={(input) => {_password2 = input;}}
            required="required" /><br/>
          <label>Email</label><br/>
          <input
            placeholder = 'Email'
            type = 'text'
            id = 'newEmail'
            ref={(input) => {_email2 = input;}}
            required="required" /><br/>
          </form>
          <button type="submit" onClick={addUserClicked}><Link to='/'>Submit</Link></button>
      </div>
  );
  }

  if(props.currentUser != null)
  {
    contents = renderUserInfo();
  }
  if(props.MTUverification === 1 || props.MTUverification === 2)
  {
    loginMessage = errorText();
  }
  if(props.MTUverification === 3)
  {
    loginMessage = <p>Login Successful!</p>;
  }

  return (
    <div>
      <h1>Login Info</h1>
      <p>This component demonstrates fetching data from the server.</p>
      <h3>Login</h3>
      <form>
        <label>Username</label><br/>
        <input
          placeholder = 'Username'
          type = 'text'
          id = 'newUserName'
          ref={(input) => {_usernameLogin = input;}}
          required="required" /><br/>
        <label>Password</label><br/>
        <input
          placeholder = 'Password'
          type = 'text'
          id = 'newPassword'
          ref={(input) => {_passwordLogin = input;}}
          required="required" /><br/>
        </form>
        <button onClick={loginUserClicked}>Submit</button>
        {loginMessage}
        <hr/>
      <button type='click' onClick={userInfoButtonClicked}>Get User Info</button>
      {contents}
    </div>
  );
}

Login.propTypes = {
  currentUser: PropTypes.object,
  MTUverification: PropTypes.number,
  onUserInfoDisplay: PropTypes.func,
  onUpdateUserInfo: PropTypes.func,
  onAddUser: PropTypes.func,
  onLoginUser: PropTypes.func,
  onResetData: PropTypes.func
};
