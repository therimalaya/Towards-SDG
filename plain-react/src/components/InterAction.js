import React from 'react';

class InterAction extends React.Component {

    render() {
        return (
          <React.Fragment>
            <h1>I am Interaction</h1>
            <button onClick={this.props.nextStep} >Next</button>
            <button onClick={this.props.prevStep} >Previous</button>
          </React.Fragment>
        );
    }
};

export default InterAction;
