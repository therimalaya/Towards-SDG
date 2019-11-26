import React from 'react';

class Confirmation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>I am confirmation</h1>
        <button onClick={this.props.goHome} className="App-Nav-Btn">Home</button>
      </React.Fragment>
    );
  }
};

export default Confirmation;
