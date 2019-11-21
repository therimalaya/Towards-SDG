import React, { Component } from 'react'
import Personal from './Personal'
import Goals from './Goals'
import Targets from './Targets'
import Interaction from './Interaction'
import Summary from './Summary'
import Confirmation from './Confirmation'

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: 'Raju',
            Faculty: 'kbm',
            Research: {title: 'Simrel', url: 'http://simulatr.github.io'},
            Coauthors: {Faculty: ['kbm', 'mina']}
        }
    }

    // Change Handling -------
    updateInput = input => e => {
        // Track the form data here
        this.setState({
            [input]: e.target.value
        })
    }
    // Update Coauthor -----------
    updateCoauthor = e => {
        this.setState({
            Coauthors: {
                Faculty: e.target.value
            }
        })
    }

    /// HAVING PROBLEM ____ FIX THIS TONIGHT -----
    updateResearch = input => e => {
      this.setState({ Research: { ...this.state.Research, [input]: e.target.value} });
    }

    render() {
        const {step} = this.props
        const { Name, Faculty, Research, Coauthors } = this.state
        const values = { Name, Faculty, Research, Coauthors }

        const { goals, targets, updateGoals, updateTargets } = this.props
        const selectedGoals = goals.filter(goal => goal.isSelected)

        switch (step) {
            case 1:
                return(
                    <div>
                        <Personal 
                            values={values}
                            updateInput={this.updateInput}
                            updateCoauthor={this.updateCoauthor}
                            updateResearch={this.updateResearch}/>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <Goals 
                            goals={goals}
                            updateGoals={updateGoals}/>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <Targets 
                            selectedGoals={selectedGoals}
                            targets={targets}
                            updateTargets={updateTargets}/>
                    </div>
                )
            case 4:
                return(
                    <div>
                        <Interaction />
                    </div>
                )
            case 5:
                return(
                    <div>
                        <Summary />
                    </div>
                )
            default:
                return(
                    <div>
                        <Confirmation />
                    </div>
                )
        }
    }
}
