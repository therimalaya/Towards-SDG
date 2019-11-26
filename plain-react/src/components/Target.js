import React from 'react';

class Target extends React.Component {
    render() {
        return (
          <React.Fragment>
            <h1>I am the Target</h1>
            <button onClick={this.props.nextStep} className="App-Nav-Btn">Next</button>
            <button onClick={this.props.prevStep} className="App-Nav-Btn">Previous</button>
          </React.Fragment>
        );
    }
};

export default Target;
