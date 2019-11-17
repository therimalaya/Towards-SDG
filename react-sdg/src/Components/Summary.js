import React, { Component } from 'react'

export default class Summary extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    render() {
        return (
            <div>
                <h2>This is all the summary you have got.</h2>
                <button onClick={this.continue}>Next</button>
                <button onClick={this.back}>Previous</button>
            </div>
        )
    }
}
