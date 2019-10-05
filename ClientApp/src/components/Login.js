import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Login(props) {

  let loginMessage = null;
  let _usernameLogin = null;
  let _passwordLogin = null;

  function loginUserClicked()
  {
    props.onLoginUser({userName: _usernameLogin.value, password: _passwordLogin.value});
  }

  function errorText()
  {
    return (
      <div>
        <p>Error: Incorrect Login</p>
      </div>
    );
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
      <h3>Account Login</h3>
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
        <br/>
        <button onClick={loginUserClicked}>Submit</button>
        {loginMessage}
        <hr/>
        <p>Don't have an account? Create one <Link to="/createaccount">here</Link>.</p>
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
