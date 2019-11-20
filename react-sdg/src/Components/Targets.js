import React, { Component } from 'react'
import './TargetTabPanel'

export default class Targets extends Component {

    render() {
        const {selectedGoals, targets, updateTargets } = this.props
        const selectedTargets = targets.filter(target=>selectedGoals.map(x=>x.goal).includes(target.goal))
        return (
            <div>
                <h2>This is SDG Targes.</h2>
                <TargetTabPanel
                handleChange={updateTargets}
                targets={selectedTargets}
                goals={selectedGoals}/>
            </div>
        )
    }
}
