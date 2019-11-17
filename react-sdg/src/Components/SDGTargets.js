import React, { Component } from 'react'

export default class SDGTargets extends Component {
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
                <h2>This is SDG Targes.</h2>
            </div>
        )
    }
}
