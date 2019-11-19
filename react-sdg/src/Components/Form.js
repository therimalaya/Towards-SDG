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
            Faculty: '',
            Research: {id: '', title: '', url: ''},
            Coauthors: {id: [], Faculty: []}
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
        var selected_options = e.target.options.filter(x=>x.selected)
        this.setState({
              Coauthors: {
                  id: selected_options.map(x=>x.id),
                  Faculty: selected_options.map(x=>x.value)
              }
        })
    }
    // Change Handling -------
    updateResearch = input => e => {
        // Track the form data here
        this.setState({
            Research: {
                [input]: e.target.value
            }
        })
    }

    render() {
        const {step} = this.props
        const values = this.state

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
                        <Goals />
                    </div>
                )
            case 3:
                return(
                    <div>
                        <Targets />
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
