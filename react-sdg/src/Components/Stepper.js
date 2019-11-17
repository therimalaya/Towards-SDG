import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default class MyStepper extends Component {
  render() {
    const steps = [
      {'label': 'Personal Details', 'key': 1}, 
      {'label': 'SDG Goals', 'key': 2}, 
      {'label': 'SDG Targets', 'key': 3}, 
      {'label': 'Summary', 'key': 4}, 
      {'label': 'Confirmation', 'key': 5}  
    ]
    return (
        <div>
        <Stepper alternativeLabel activeStep={this.props.Step-1}>
          {steps.map(s => (
            <Step key={s.key}>
              <StepLabel>{s.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}
