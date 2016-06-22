import React, { Component } from 'react';
import DevTools from './DevTools';
import '../../index.styl';

export default class App extends Component {

  render() {
    return (
      <div>
        { this.props.children }
        {
          process.env.NODE_ENV !== 'production' ?
            <DevTools /> :
            <div></div>
        }
      </div>
    );
  }
}
