import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Login(props)
{
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

  if(props.currentUser != null)
  {
    if(props.currentUser.userid === "0" || props.currentUser.userid === null)
    {
      console.log("Error");
      loginMessage = errorText();
    }
    else
    {
      console.log("Login Successful!");
      console.log(props.currentUser);
      loginMessage = <p>Login Successful!</p>;
    }
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
          type = 'password'
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
  onLoginUser: PropTypes.func,
};
