import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  btnText: {
    padding: "0 8px",
    fontSize: "larger",
  }
}));

export default function NavButton(props) {
    const classes = useStyles();
  var navBtn = {};
  if (props.step !== 1 && props.step !== props.maxStep) {
    navBtn.prev = (
      <Button variant="contained" color="primary" onClick={props.prev}>
        <Typography variant="button" className={classes.btnText}>Previous</Typography>
      </Button>
    );
  }
    const selectedGoals = props.goals.filter(x => x.isSelected);
  if (props.step !== props.maxStep && props.step !== props.maxStep - 1) {
    navBtn.next = (
      <Button
        variant="contained"
        color="primary"
        onClick={props.next}
        disabled={(selectedGoals.length < 1) && (props.step === 2)}>
        <Typography variant="button" className={classes.btnText}>Next</Typography>
      </Button>
    );
  }
  if (props.step === props.maxStep) {
    navBtn.home = (
      <Button
        variant="contained"
        color="primary"
        onClick={props.home}>
        <Typography variant="button" className={classes.btnText}>Home</Typography>
      </Button>
    );
  }
  return (
    <React.Fragment>
      <ButtonGroup
        color="secondary"
        size="large"
        aria-label="large outlined secondary button group">
        {navBtn.prev}
        {navBtn.next}
        {navBtn.home}
      </ButtonGroup>
    </React.Fragment>
  );
}
