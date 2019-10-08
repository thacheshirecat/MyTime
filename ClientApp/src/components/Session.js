import React from 'react';
import PropTypes from 'prop-types';

import Clock from './Clock';

export default function Session(props)
{

  function optionsViewClicked()
  {
    props.onChangeViewClicked("accountoptions");
  }

  return (
    <div>
      <Clock/>
      <button onClick={optionsViewClicked}>Back</button>
    </div>
  )
}

Session.propTypes = {
  onChangeViewClicked: PropTypes.func
};
