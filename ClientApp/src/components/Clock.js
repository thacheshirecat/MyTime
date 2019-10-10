import React from 'react';

class Clock extends React.Component
{
  constructor(props) {
    super(props);
    this.state = { time: parseInt(props.currentUser.sessionstarttime, 10), currenttime: 0 };
  }

  componentDidMount() {
    this.setState({ currenttime: (Math.floor((new Date().getTime() - this.state.time)/1000)/3600).toFixed(3)});
    this.intervalID = setInterval(() =>
    this.count(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  count() {
    this.setState({ currenttime: (Math.floor((new Date().getTime() - this.state.time)/1000)/3600).toFixed(3)});
  }

  render() {
    return (
      <div>
        <h1>Session started {this.props.currentUser.sessionstartdate} at {this.props.currentUser.normalizedstarttime}</h1>
        <h1>Elapsed Time: {this.state.currenttime} hours.</h1>
      </div>
    )
  }

}

export default Clock;
