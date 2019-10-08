import React from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import AccountOptions from './AccountOptions';
import Session from './Session';

export default function Account(props) {

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
                onSessionViewClicked={props.onSessionViewClicked}/>;
}
if(props.currentView === "session")
{
  contents = <Session/>
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
  onSessionViewClicked: PropTypes.func
};
