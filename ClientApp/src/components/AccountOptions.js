import React from 'react';
import PropTypes from 'prop-types';



export default function AccountOptions(props) {

function sessionViewClicked()
{
  props.onSessionViewClicked();
}

return (
  <div>
    <h1>Account Options</h1>
    <button onClick={sessionViewClicked}>Session</button>
    <button>Records</button>
  </div>
)

}

AccountOptions.propTypes = {
  onSessionViewClicked: PropTypes.func
};
