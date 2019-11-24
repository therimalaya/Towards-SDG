import React, { Component } from 'react'
import TargetTabPanel from './TargetTabPanel'

export default class Targets extends Component {

    render() {
        const {selectedGoals, targets, updateTargets } = this.props
        const selectedTargets = targets.filter(target=>selectedGoals.map(x=>x.goal).includes(target.goal))
        return (
            <div>
                <TargetTabPanel
                updateTargets={updateTargets}
                targets={selectedTargets}
                goals={selectedGoals}/>
            </div>
        )
    }
}
