import React from 'react';

class Summary extends React.Component {
    render() {
        return (
          <React.Fragment>
            <h1>I am the summary</h1>
            <div className="nav-btn">
              <button onClick={this.props.prevStep} className="App-Nav-Btn">Previous</button>
              <button onClick={this.props.Submit} className="App-Nav-Btn">Submit</button>
            </div>
          </React.Fragment>
        );
    }
};

export default Summary;
