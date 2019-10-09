import React from 'react';

class Clock extends React.Component
{
  constructor(props) {
    super(props);
    this.state = { time: new Date().getTime(), currenttime: 0 };
  }

  componentDidMount() {
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
      <h1>It has been {this.state.currenttime} hours.</h1>
    )
  }

}

export default Clock;