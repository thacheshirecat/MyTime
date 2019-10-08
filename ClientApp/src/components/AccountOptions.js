import React from 'react';
import PropTypes from 'prop-types';

export default function AccountOptions(props)
{
  function sessionViewClicked()
  {
    props.onChangeViewClicked("session");
  }
  function recordsViewClicked()
  {
    props.onChangeViewClicked("records");
  }

  return (
    <div>
      <h1>Account Options</h1>
      <div className="container">
        <button onClick={sessionViewClicked}>Session</button>
        <button onClick={recordsViewClicked}>Records</button>
      </div>

    </div>
  )
}

AccountOptions.propTypes = {
  onChangeViewClicked: PropTypes.func
};
