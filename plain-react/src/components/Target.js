import React from 'react';

class Target extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <React.Fragment>
            <h1>I am the Target</h1>
            <button onClick={this.props.nextStep} >Next</button>
            <button onClick={this.props.prevStep} >Previous</button>
          </React.Fragment>
        );
    }
};

export default Target;
