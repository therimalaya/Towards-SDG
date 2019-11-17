import React, { Component } from 'react'
import SDGImageGrid from './SDGImageGrid'


export default class SDGGoalsSelect extends Component {
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
                <h2>Hi!, I am Goals Select</h2>
                <p>I have a child too.</p>
                <SDGImageGrid />
            </div>
        )
    }
}
