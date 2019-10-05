import React from 'react';
import PropTypes from 'prop-types';

export default function CreateAccount(props) {

let _username = null;
let _password = null;
let _email = null;

function createUserClicked()
{
  props.onCreateUser({userName: _username.value, password: _password.value, email: _email.value});
}

  return(
      <div>
      <h1>Create Account</h1>
      <form>
        <label>Username</label><br/>
        <input
          placeholder = 'Username'
          type = 'text'
          id = 'UserName'
          ref={(input) => {_username = input;}}
          required="required" /><br/>
        <label>Password</label><br/>
        <input
          placeholder = 'Password'
          type = 'text'
          id = 'Password'
          ref={(input) => {_password = input;}}
          required="required" /><br/>
          <label>Email</label><br/>
          <input
            placeholder = 'Password'
            type = 'text'
            id = 'Email'
            ref={(input) => {_email = input;}}
            required="required" /><br/>
        </form>
        <br/>
        <button onClick={createUserClicked}>Submit</button>
      </div>
  )
}

CreateAccount.propTypes = {
  onCreateUser: PropTypes.func
};
