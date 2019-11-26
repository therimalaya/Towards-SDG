import React from 'react';

class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <React.Fragment>
            <h1>I am the summary</h1>
            <button onClick={this.props.nextStep} >Next</button>
            <button onClick={this.props.prevStep} >Previous</button>
          </React.Fragment>
        );
    }
};

export default Summary;
