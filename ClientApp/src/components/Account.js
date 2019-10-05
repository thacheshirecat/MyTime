import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

export default function Account(props) {

let contents = <Login
  currentUser={props.currentUser}
  MTUverification={props.MTUverification}
  onUserInfoDisplay={props.onUserInfoDisplay}
  onUpdateUserInfo={props.onUpdateUserInfo}
  onAddUser={props.onAddUser}
  onLoginUser={props.onLoginUser}
  onResetData={props.onResetData}/>;

return (
  <div>
    <h1>MyTime Account</h1>
    {contents}
  </div>
)
}

Account.propTypes = {
  currentUser: PropTypes.object,
  MTUverification: PropTypes.number,
  onUserInfoDisplay: PropTypes.func,
  onAddUser: PropTypes.func,
  onLoginUser: PropTypes.func,
  onResetData: PropTypes.func
};
