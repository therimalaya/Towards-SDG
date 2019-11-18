import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles'

const stepperStyle = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

export default function MyStepper(props) {
  const classes = stepperStyle()
  const steps = [
    {'label': 'Personal Details', 'key': 1}, 
    {'label': 'SDG Goals', 'key': 2}, 
    {'label': 'SDG Targets', 'key': 3}, 
    {'label': 'Summary', 'key': 4}, 
    {'label': 'Confirmation', 'key': 5}  
  ]
  return (
      <div>
      <Stepper alternativeLabel activeStep={props.Step-1} className={classes.root}>
        {steps.map(s => (
          <Step key={s.key}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
