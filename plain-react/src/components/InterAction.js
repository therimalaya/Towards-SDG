import React from 'react';

class InterAction extends React.Component {

    render() {
        return (
          <React.Fragment>
            <h1>I am Interaction</h1>
            <div className="nav-btn">
              <button onClick={this.props.prevStep} className="App-Nav-Btn">Previous</button>
              <button onClick={this.props.nextStep} className="App-Nav-Btn">Next</button>
            </div>
          </React.Fragment>
        );
    }
};

export default InterAction;
