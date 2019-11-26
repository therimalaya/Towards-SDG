import React from 'react';

class Confirmation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>I am confirmation</h1>
        <button onClick={this.props.goHome} >Home</button>
      </React.Fragment>
    );
  }
};

export default Confirmation;
