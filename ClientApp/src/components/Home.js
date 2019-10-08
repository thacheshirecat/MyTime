import React, { Component } from 'react';

export class Home extends Component
{
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to MyTime!</h1>
        <p>App created using React and C#</p>
        <p>MyTime is a Personal Time Clock. Create an account to get started recording sessions.</p>
      </div>
    );
  }
}
