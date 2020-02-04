import React, { Fragment, useState, useEffect } from 'react';
import GoalList from '../data/goals.json';
import { Button, ButtonGroup } from '@material-ui/core';
import { Box, Grid, GridList, GridListTile, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const numnum = num => num <=9 ? "0"+num : num;

const useStyles = makeStyles(theme => ({
  selected: {

  }
}));

GoalList.forEach(goal=>{
  goal.image_src = "images/Goals/Goal-"+numnum(goal.goal)+".png"
  goal.isSelected = false
});

const Goal = (props) => {
  const classes = useStyles();
  const [AllGoals, setAllGoals] = useState(GoalList);
  const { NextStep, PrevStep } = props;
  const { Goals } = props.CurrentRecord
  const { UpdateCurrentRecord } = props;

  useEffect(() => {
    if (props.CurrentRecord.Targets.length) {
      props.UpdateCurrentRecord("Targets", [])
    }
  });

  GoalList.forEach(goal=>goal.isSelected = props.CurrentRecord.Goals.includes(goal.goal))

  const handleClick = (event) => {
    const newGoals = AllGoals
    newGoals.forEach(goal=>{
      if(goal.goal === Number(event.target.name)) {
        goal.isSelected = !goal.isSelected
      }
    })
    event.target.classList.toggle("selected")
    UpdateCurrentRecord(
      "Goals",
      newGoals.filter(goal=>goal.isSelected).map(goal=>goal.goal)
    )
    setAllGoals(newGoals)
  }

  return(
    <Fragment>
      <Grid container direction="column">
        {/* <Typography variant="h4" component="h2">Select Goals</Typography> */}
        <Box className={classes.root}>
          <GridList cols={6} component="div" cellHeight="auto">
            {AllGoals.map(goal => (
              <GridListTile key={goal.goal}>
                <ImageLink
                  goal={goal}
                  handleClick={handleClick}
                  key={goal.goal}
                  disabled={Goals.length >= 2 & !goal.isSelected}
                />
              </GridListTile>
            ))}
          </GridList>
          <Box className={classes.selected}>
            {
              AllGoals.filter(goal=>Goals.includes(goal.goal)).map((goal, idx) =>
                <Fragment key={idx}>
                  <Grid container>
                    <Typography color={goal.colorInfo.hex}>Goal {goal.goal}</Typography>
                    <Typography color={goal.colorInfo.hex}>{goal.title}</Typography>
                  </Grid>
                </Fragment>
              )
            }
          </Box>
        </Box>
      </Grid>
    </Fragment>
  )
}

export default Goal;

const ImageLink = (props) => {
  const {goal, handleClick, disabled} = props
	return(
    <input
      width="100%"
      id={"Goal-"+numnum(goal.goal)}
      type="image"
      src={goal.image_src}
      name={goal.goal}
      alt={goal.short}
      onClick={handleClick}
      className={goal.isSelected ? "selected" : ""}
      disabled={disabled}
    />
  )
};

class Goal1 extends React.Component {
  constructor(props){
    super(props);
    GoalList.forEach(goal=>goal.isSelected = props.CurrentRecord.Goals.includes(goal.goal))
    this.state = {
      AllGoals: GoalList
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    const newGoals = this.state.AllGoals
    newGoals.forEach(goal=>{
      if(goal.goal === Number(event.target.name)) {
        goal.isSelected = !goal.isSelected
      }
    })
    event.target.classList.toggle("selected")
    this.props.UpdateCurrentRecord(
      "Goals",
      newGoals.filter(goal=>goal.isSelected).map(goal=>goal.goal)
    )
    this.setState({AllGoals: newGoals})
  }

  componentDidUpdate(props){
    if (props.CurrentRecord.Targets.length) {
      props.UpdateCurrentRecord("Targets", [])
    }
  }

  render() {
    const {NextStep, PrevStep} = this.props;
    const {AllGoals} = this.state
    const {Goals} = this.props.CurrentRecord
    return (
      <React.Fragment>
        <h2 className="AppStepTitle">Select Goals</h2>
        <div id="goal-image-grid" className="image-grid">
          {
            AllGoals.map(goal =>
              <ImageLink
                AllGoals={AllGoals}
                goal={goal}
                handleClick={this.handleClick.bind(this)}
                key={goal.goal}
                disabled={Goals.length >= 2 & !goal.isSelected}
              />
            )
          }
        </div>
        <div className="goal-details">
          {
            AllGoals.filter(goal=>Goals.includes(goal.goal)).map((goal, idx) =>
              <React.Fragment key={idx}>
                <p className="goal-label" style={{background: goal.colorInfo.hex}}>Goal {goal.goal}</p>
                <p className="goal-title">{goal.title}</p>
              </React.Fragment>
            )
          }
        </div>
        <div className="nav-btn">
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={PrevStep}>Previous</Button>
            <Button onClick={NextStep}>Next</Button>
          </ButtonGroup>
        </div>
      </React.Fragment>
    );
  }
};
