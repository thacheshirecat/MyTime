import React from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import AccountOptions from './AccountOptions';
import Session from './Session';
import Records from './Records';

export default function Account(props)
{
  let contents = null;

  if(props.currentView === "login")
  {
    contents = <Login
                  currentUser={props.currentUser}
                  onLoginUser={props.onLoginUser}/>;
  }
  if(props.currentView === "accountoptions")
  {
    contents = <AccountOptions
                  onChangeViewClicked={props.onChangeViewClicked}/>;
  }
  if(props.currentView === "session")
  {
    contents = <Session
                  onChangeViewClicked={props.onChangeViewClicked}
                  currentUser={props.currentUser}
                  onSessionStart={props.onSessionStart}/>;
  }
  if(props.currentView === "records")
  {
    contents = <Records
                  onChangeViewClicked={props.onChangeViewClicked}/>;
  }

  return (
    <div>
      <h1>MyTime Account</h1>
      {contents}
    </div>
  )
}

Account.propTypes = {
  currentUser: PropTypes.object,
  currentView: PropTypes.string,
  onLoginUser: PropTypes.func,
  onChangeViewClicked: PropTypes.func,
  onSessionStart: PropTypes.func
};
