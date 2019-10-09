import React from 'react';
import PropTypes from 'prop-types';

import Clock from './Clock';

export default function Session(props)
{
  let clock = startView();
  let inSession = parseInt(props.currentUser.sessionstarttime, 10);

  function optionsViewClicked()
  {
    props.onChangeViewClicked("accountoptions");
  }

  function sessionStartClicked()
  {
    let time = new Date();
    props.onSessionStart({userName: props.currentUser.username, sessionStartDate: time.toLocaleDateString(), normalizedStartTime: time.toLocaleTimeString(), sessionStartTime: time.getTime()});
  }

  function startView()
  {
    return (
      <div>
        <h1>MyTime Session</h1>
        <p>Click Button To Begin</p>
        <button onClick={sessionStartClicked}>Start</button>
        <h1>0.0</h1>
      </div>
    );
  }

  if(inSession !== 0)
  {
    clock = <Clock
              currentUser={props.currentUser}/>;
  }

  return (
    <div>
      {clock}
      <button onClick={optionsViewClicked}>Back</button>
    </div>
  )
}

Session.propTypes = {
  onChangeViewClicked: PropTypes.func,
  currentUser: PropTypes.object,
  onSessionStart: PropTypes.func
};
