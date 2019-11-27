import React from 'react';

class Summary extends React.Component {
    render() {
        return (
          <React.Fragment>
            <h1>I am the summary</h1>
            <div className="nav-btn">
              <button onClick={this.props.nextStep} className="App-Nav-Btn">Next</button>
              <button onClick={this.props.prevStep} className="App-Nav-Btn">Previous</button>
            </div>
          </React.Fragment>
        );
    }
};

export default Summary;
