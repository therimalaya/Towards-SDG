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
                {/* <h2>Select SDG Goals (At most 2)</h2> */}
                <div style={{width: '100%'}}><SDGImageGrid /></div>
            </div>
        )
    }
}
