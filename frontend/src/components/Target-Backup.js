import React, { Fragment, useState, useEffect } from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import InteractionButtons from './InteractionButtons';
import { Card, CardContent, CardMedia, Grid, Typography, Box, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const numnum = num => num <= 9 ? "0" + num : num;
const adjustLine = (from, to, line) => {
  var fT = from.offsetTop + from.offsetHeight / 2;
  var tT = to.offsetTop + to.offsetHeight / 2;
  var fL = from.offsetLeft + from.offsetWidth;
  var tL = to.offsetLeft;
  var CA = Math.abs(tT - fT);
  var CO = Math.abs(tL - fL);
  var H = Math.sqrt(CA * CA + CO * CO);
  var ANG = 180 / Math.PI * Math.acos(CA / H);
  var top = tT > fT ? (tT - fT) / 2 + fT : (fT - tT) / 2 + tT;
  var left = tL > fL ? (tL - fL) / 2 + fL : (fL - tL) / 2 + tL;
  top -= H / 2;

  if ((fT < tT && fL < tL) ||
      (tT < fT && tL < fL) ||
      (fT > tT && fL > tL) ||
      (tT > fT && tL > fL)) {
    ANG *= -1;
  }

  line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
  line.style["-transform"] = 'rotate(' + ANG + 'deg)';
  line.style.top = top + 'px';
  line.style.left = left + 'px';
  line.style.height = H + 'px';
}

const useStyles = makeStyles(theme => ({
  targetBtns: {
    alignContent: 'flex-start',
  },
  targetBtn: {
    margin: "4px 0px",
    textTransform: 'unset',
    textAlign: 'left',
    justifyContent: 'start',
    '& p': {
      margin: 0,
      '& span': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      }
    },
    '&:hover': {
      color: theme.palette.primary.main,
      '& p': {
        '& span': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: 'inline-block',
          paddingRight: '5px',
          paddingLeft: '3px',
          borderRadius: '5px',
          marginRight: '5px'
        }
      }
    }
  },
  clickedTargetBtn: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.light,
    '&:hover': {
      backgroundColor: theme.palette.background.light,
    },
    '& p': {
      '& span': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: 'inline-block',
        paddingRight: '5px',
        paddingLeft: '3px',
        borderRadius: '5px',
        marginRight: '5px'
      }
    }
  },
  goalcover: {
    width: '100%',
    height: '175px',
    flexShrink: 0,
    backgroundPosition: "top left",
  },
  interactionbtns: {
    position: 'absolute',
    bottom: 100,
    left: 0
  }
}))

function Target(props) {
  const classes = useStyles();
  const { CurrentRecord } = props;
  const { UpdateCurrentRecord, UpdateRecords } = props;
  let newTargets = TargetList
    .filter(target => props.CurrentRecord.Goals.includes(target.goal))
    .filter(target => target.id.match("[0-9]$"))
  newTargets.forEach(target => {
    target.goal_img = "images/Goals/Goal-" + numnum(target.goal) + ".png"
    target.isSelected = props.CurrentRecord.Targets.map(x => x.toString()).includes(target.id)
  });

  const [PossibleTargets, setPossibleTargets] = useState(newTargets);
  const [showModal, setshowModal] = useState(false);

  const NestedTargets = [...new Set(PossibleTargets.map(target => target.goal))]
    .reduce((acc, curr) => {
      acc[curr] = PossibleTargets.filter(target => target.goal === curr)
      return acc;
    }, {});
  var SelectedGoals = GoalList
    .filter(goal => Object.keys(NestedTargets)
      .includes(goal.goal.toString()))
  SelectedGoals.forEach(goal => {
    goal.targets = NestedTargets[goal.goal];
    return (goal);
  });

  useEffect(() => {
    [...document.getElementsByClassName("clicked-target-btn")]
      .map(btn => btn.scrollIntoView())
  })

  const ResetAndUpdate = (event) => {
    event.preventDefault()
    let currentPossible = PossibleTargets;
    currentPossible.forEach(target => {
      target.isSelected = false;
      return target;
    })
    UpdateRecords(event)
    closeModal()
  }
  const handleInteraction = (input) => (event) => {
    const parent_node = event.currentTarget.parentNode;
    const all_buttons = Array.from(parent_node.getElementsByTagName("Button"));
    const current_button_idx = all_buttons.indexOf(event.currentTarget);
    all_buttons.filter((elem, idx) => idx === current_button_idx)
      .map(elem => elem.classList.toggle('active'))
    all_buttons.filter((elem, idx) => idx !== current_button_idx)
      .map(elem => elem.classList.remove('active'))

    if (props.CurrentRecord.Interaction.value === event.currentTarget.value) {
      UpdateCurrentRecord(
        "Interaction",
        { ...props.CurrentRecord.Interaction, [input]: "" }
      )
    } else {
      UpdateCurrentRecord(
        "Interaction",
        {
          ...props.CurrentRecord.Interaction,
          [input]: event.currentTarget.value
        }
      )
    }
  }
  const handleClick = (event) => {
    event.preventDefault()
    const newTargets = PossibleTargets;
    newTargets.forEach(target => {
      if (target.id === event.currentTarget.name) {
        target.isSelected = !target.isSelected
        event.currentTarget.classList.toggle(classes.clickedTargetBtn)
        /* event.currentTarget.classList.toggle(classes.targetBtn) */
      }
    })
    UpdateCurrentRecord(
      'Targets',
      newTargets.filter(target => target.isSelected).map(target => target.id)
    )
    setPossibleTargets(newTargets)
    if (PossibleTargets.filter(target => target.isSelected).length > 1) {
      setshowModal(true)
    }
  }
  const drawLine = (PossibleTargets) => {
    if (PossibleTargets.filter(x => x.isSelected).length === 2) {
      let target_goal = PossibleTargets.filter(x => x.isSelected).map(x => x.goal);
      if (target_goal[0] !== target_goal[1]) {
        let selected_divs = [...document.getElementsByClassName("clicked-target-btn")];
        let from_div = selected_divs[0];
        let to_div = selected_divs[1];
        let line_div = document.getElementsByClassName("target-join")[0];
        adjustLine(from_div, to_div, line_div)
        document.getElementsByClassName("target-join")[0].style["display"] = "unset";
      }
    } else {
      document.getElementsByClassName("target-join")[0].style["display"] = "none";
    }
  }
  const closeModal = () => {
    setshowModal(false)
  }
  return(
    <Fragment>
      <Grid container direction="column">
        <Grid container>
          <Grid item container spacing={1}>
            {
              SelectedGoals.map((goal, idx) =>
                <Grid item xs={6} key={goal.goal}>
                  <CardMedia
                    className={classes.goalcover}
                    image={goal.image_src}
                    title="goal.short"
                  />
                </Grid>
              )
            }
          </Grid>
          <Grid item container spacing={1}>
            {
              SelectedGoals.map((goal, idx) =>
                <Grid item xs={6} container className={classes.targetBtns} key={goal.goal}>
                  {
                    goal.targets.map((target, idx) => {
                      return (
                        <Button
                          fullWidth={true}
                          key={target.id}
                          variant="outlined"
                          size="small"
                          color="secondary"
                          id={"Target-" + target.id}
                          value={target.id}
                          name={target.id}
                          onClick={handleClick}
                          className={classes.targetBtn}>
                          <p className="target-text">
                            <span className="target-id">{target.id} </span>
                            {target.title}
                          </p>
                        </Button>
                      )
                    })
                  }
                </Grid>
              )
            }
          </Grid>
        </Grid>
        {/* <Box className={classes.interactionbtns}>
            <InteractionButtons
            SelectedGoals={SelectedGoals}
            CurrentRecord={CurrentRecord}
            showModal={showModal}
            closeModal={closeModal}
            handleInteraction={handleInteraction}
            ResetAndUpdate={ResetAndUpdate} 
            />
            </Box> */}
      </Grid>
    </Fragment>
  )
}

export default Target;

