import React, { Component } from 'react';
import Firebase from 'firebase';
import Personal from './Personal';
import Goals from './Goals';
import Targets from './Targets';
import Interaction from './Interaction';
import Summary from './Summary';
import Confirmation from './Confirmation';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: 'Raju',
            Faculty: 'kbm',
            Research: {title: 'Simrel', url: 'http://simulatr.github.io'},
            Coauthors: {Faculty: ['kbm', 'mina']},
            Interaction: "neutral"
        };
    }

    handleInteraction = value => {
        this.setState({'Interaction': value});
    }

    // Change Handling -------
    updateInput = input => e => {
        // Track the form data here
        this.setState({
            [input]: e.target.value
        });
    };
    // Update Coauthor -----------
    updateCoauthor = e => {
        this.setState({
            Coauthors: {
                Faculty: e.target.value
            }
        });
    };

    /// HAVING PROBLEM ____ FIX THIS TONIGHT -----
    updateResearch = input => e => {
        this.setState({ Research: { ...this.state.Research, [input]: e.target.value} });
    }

    render() {
        const {step} = this.props;
        const { Name, Faculty, Research, Coauthors, nextStep } = this.state;
        const values = { Name, Faculty, Research, Coauthors };

        const { goals, targets, updateGoals, updateTargets, FacultyConfig } = this.props;
        const selectedGoals = goals.filter(goal => goal.isSelected);
        const summaryProps = Object.assign(
            {}, values,
            {'Goals': selectedGoals,
             'Interaction': this.state.Interaction,
             'Next': nextStep});

        switch (step) {
        case 1:
            return(
                <div>
                  <Personal
                    FacultyConfig={FacultyConfig}
                    values={values}
                    updateInput={this.updateInput}
                    updateCoauthor={this.updateCoauthor}
                    updateResearch={this.updateResearch}/>
                </div>
            );
        case 2:
            return(
                <div>
                  <Goals
                    goals={goals}
                    updateGoals={updateGoals}/>
                </div>
            );
        case 3:
            return(
                <div>
                  <Targets
                    selectedGoals={selectedGoals}
                    targets={targets}
                    updateTargets={updateTargets}/>
                </div>
            );
        case 4:
            return(
                <div>
                  <Interaction
                    interaction={this.state.Interaction}
                    goals={selectedGoals}
                    handleInteraction={this.handleInteraction}/>
                </div>
            );
        case 5:
            return(
                <div>
                  <Summary
                    states={summaryProps}
                    Faculties={FacultyConfig}
                    />
                </div>
            );
        default:
            return(
                <div>
                  <Confirmation />
                </div>
            );
        }
    }
}
