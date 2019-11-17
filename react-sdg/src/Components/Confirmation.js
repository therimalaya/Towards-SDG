import React, { Component } from 'react'

export default class Confirmation extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    render() {
        return (
            <div>
                <h2>Finally, Confirmation.</h2>
                <button onClick={this.back}>Previous</button>
            </div>
        )
    }
}
