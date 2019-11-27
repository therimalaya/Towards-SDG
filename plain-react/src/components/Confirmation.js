import React from 'react';

class Confirmation extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>I am confirmation</h1>
        <div className="nav-btn">
          <button onClick={this.props.goHome} className="App-Nav-Btn">Home</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Confirmation;
