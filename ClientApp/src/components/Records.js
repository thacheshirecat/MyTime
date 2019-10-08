import React from 'react';
import PropTypes from 'prop-types';

export default function Records(props)
{
  function optionsViewClicked()
  {
    props.onChangeViewClicked("accountoptions");
  }

  return(
    <div>
      <button onClick={optionsViewClicked}>Back</button>
    </div>
  )
}

Records.propTypes = {
  onChangeViewClicked: PropTypes.func
};
