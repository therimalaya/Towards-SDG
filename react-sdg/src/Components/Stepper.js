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
  return (
      <div>
      <Stepper alternativeLabel activeStep={props.step-1} className={classes.root}>
        {props.stepConfig.map(s => (
          <Step key={s.key}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
