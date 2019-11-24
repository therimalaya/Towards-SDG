import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

export default function NavButton(props) {
  var navBtn = {};
  if (props.step !== 1 && props.step !== props.maxStep) {
    navBtn.prev = (
      <Button variant="contained" color="primary" onClick={props.prev}>
        {" "}
        Previous{" "}
      </Button>
    );
  }
  const selectedGoals = props.goals.filter(x => x.isSelected)
  if (props.step !== props.maxStep && props.step !== props.maxStep-1) {
    navBtn.next = (
      <Button
        variant="contained"
        color="primary"
        onClick={props.next}
        disabled={(selectedGoals.length < 1) && (props.step === 2)}>
        {" "}
        Next{" "}
      </Button>
    );
  }
  if (props.step === props.maxStep-1) {
    navBtn.submit = (
      <Button
        variant="contained"
        color="primary"
        onClick={props.submit}>
        {" "}
        Submit{" "}
      </Button>
    );
  }
  if (props.step === props.maxStep) {
    navBtn.home = (
      <Button
        variant="contained"
        color="primary"
        onClick={props.home}>
        {" "}
        Home{" "}
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
        {navBtn.submit}
        {navBtn.home}
      </ButtonGroup>
    </React.Fragment>
  );
}