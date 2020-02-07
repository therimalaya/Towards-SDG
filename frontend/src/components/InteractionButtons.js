import React, { Fragment, useState, useEffect } from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import InteractionModal from './TargetModal';
import { Card, CardContent, CardMedia, Grid, Typography, Box, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: theme.palette.primary.dark,
  },
}))


export default function InteractionButtons(props) {
  const classes = useStyles();
  const { SelectedGoals, CurrentRecord } = props;
  const { handleInteraction, ResetAndUpdate } = props;
  const activeInteraction = CurrentRecord.Interaction.value;
  const selectedTargets = SelectedGoals
    .flatMap(goal => goal.targets.filter(target => target.isSelected))
  const IntDirStr = str => {
    if (selectedTargets.length <= 1) {
      return null;
    } else {
      return selectedTargets[0].id+str+selectedTargets[1].id;
    }
  }

  return(
    <Grid container>
      <Grid item xs={6}>
        <ButtonGroup color="primary" variant="contained">
          <Button
            onClick={handleInteraction("value")}
            value="Positive"
            classes={{root: activeInteraction==="Positive" ? classes.active : null}}>
            Positive
          </Button>
          <Button
            onClick={handleInteraction("value")}
            value="Negative"
            classes={{root: activeInteraction==="Negative" ? classes.active : null}}>
            Negative
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <ButtonGroup color="primary" variant="contained">
          <Button
            onClick={handleInteraction("type")}
            value="Direct"
            classes={{root: activeInteraction==="Direct" ? classes.active : null}}>
            Direct
          </Button>
          <Button
            onClick={handleInteraction("type")}
            value="Indirect"
            classes={{root: activeInteraction==="Indirect" ? classes.active : null}}>
            InDirect
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <ButtonGroup color="primary" variant="contained">
            <Button
              onClick={handleInteraction("direction")}
              value="ltr"
              classes={{root: activeInteraction === "ltr" ? classes.active : null}}>
              {IntDirStr(" → ")}
            </Button>
            <Button
              onClick={handleInteraction("direction")}
              value="rtl"
              classes={{root: activeInteraction === "rtl" ? classes.active : null}}>
              {IntDirStr(" ← ")}
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="primary"
            variant="contained"
            disabled={CurrentRecord.Targets.length <= 0}
            onClick={ResetAndUpdate}>
            Add More Records
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
