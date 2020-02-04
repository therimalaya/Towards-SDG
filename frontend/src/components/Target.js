import React, { Fragment, useState, useEffect } from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import InteractionModal from './TargetModal';
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
  goalcard: {
    display: 'flex',
    height: '150px',
    marginBottom: '10px',
  },
  goaldetails: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  },
  goalcontent: {
    flex: '1 0 auto',
  },
  goalcover: {
    width: '150px',
    height: '150px',
    flexShrink: 0,
  },
}))

function Target(props) {
  const classes = useStyles();
  const { PrevStep, NextStep, CurrentRecord } = props;
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
        event.currentTarget.classList.toggle("clicked-target-btn")
        event.currentTarget.classList.toggle("target-btn")
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
        {/* <Typography variant="h4" component="h2">Select Targets</Typography> */}
        <Grid container>
          <Grid item container spacing={1}>
            {
              SelectedGoals.map((goal, idx) =>
                <Grid item xs={6} key={goal.goal}>
                  <Card className={classes.goalcard}>
                    <div className={classes.goaldetails}>
                      <CardContent className={classes.goalcontent}>
                        <Typography component="h5" variant="h5">
                          {goal.short}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {goal.title}
                        </Typography>
                      </CardContent>
                    </div>
                    <CardMedia
                      className={classes.goalcover}
                      image={goal.image_src}
                      title="goal.short"
                    />
                  </Card>
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
        <InteractionModal
          SelectedGoals={SelectedGoals}
          CurrentRecord={CurrentRecord}
          showModal={showModal}
          closeModal={closeModal}
          handleInteraction={handleInteraction}
          ResetAndUpdate={ResetAndUpdate} />
      </Grid>
    </Fragment>
  )
}

export default Target;

/* class Target1 extends React.Component {
 *   constructor(props) {
 *     super(props)
 *     var newTargets = TargetList
 *       .filter(target => props.CurrentRecord.Goals.includes(target.goal))
 *       .filter(target => target.id.match("[0-9]$"))
 *     newTargets.forEach(target => {
 *       target.goal_img = "images/Goals/Goal-" + numnum(target.goal) + ".png"
 *       target.isSelected = props.CurrentRecord.Targets.map(x => x.toString()).includes(target.id)
 *     });
 *     this.state = {
 *       PossibleTargets: newTargets,
 *       showModal: false
 *     }
 *     this.handleClick = this.handleClick.bind(this)
 *     this.handleInteraction = this.handleInteraction.bind(this)
 *     this.ResetAndUpdate = this.ResetAndUpdate.bind(this)
 *     this.closeModal = this.closeModal.bind(this)
 *   }
 *   ResetAndUpdate = (event) => {
 *     event.preventDefault()
 *     let currentPossible = this.state.PossibleTargets;
 *     currentPossible.forEach(target => {
 *       target.isSelected = false;
 *       return target;
 *     })
 *     this.props.UpdateRecords(event)
 *     this.closeModal()
 *   }
 *   handleInteraction = (input) => (event) => {
 *     const parent_node = event.currentTarget.parentNode;
 *     const all_buttons = Array.from(parent_node.getElementsByTagName("Button"));
 *     const current_button_idx = all_buttons.indexOf(event.currentTarget);
 *     all_buttons.filter((elem, idx) => idx === current_button_idx)
 *       .map(elem => elem.classList.toggle('active'))
 *     all_buttons.filter((elem, idx) => idx !== current_button_idx)
 *       .map(elem => elem.classList.remove('active'))
 * 
 *     if (this.props.CurrentRecord.Interaction.value === event.currentTarget.value) {
 *       this.props.UpdateCurrentRecord(
 *         "Interaction",
 *         { ...this.props.CurrentRecord.Interaction, [input]: "" }
 *       )
 *     } else {
 *       this.props.UpdateCurrentRecord(
 *         "Interaction",
 *         {
 *           ...this.props.CurrentRecord.Interaction,
 *           [input]: event.currentTarget.value
 *         }
 *       )
 *     }
 *   }
 *   handleClick = (event) => {
 *     event.preventDefault()
 *     const newTargets = this.state.PossibleTargets;
 *     newTargets.forEach(target => {
 *       if (target.id === event.currentTarget.name) {
 *         target.isSelected = !target.isSelected
 *         event.currentTarget.classList.toggle("clicked-target-btn")
 *         event.currentTarget.classList.toggle("target-btn")
 *       }
 *     })
 *     this.props.UpdateCurrentRecord(
 *       'Targets',
 *       newTargets.filter(target => target.isSelected).map(target => target.id)
 *     )
 *     this.setState({ PossibleTargets: newTargets })
 *     if (this.state.PossibleTargets.filter(target => target.isSelected).length > 1) {
 *       this.setState({ showModal: true })
 *     }
 *   }
 *   componentDidMount() {
 *     [...document.getElementsByClassName("clicked-target-btn")]
 *       .map(btn => btn.scrollIntoView())
 *     this.drawLine(this.state)
 *   }
 *   drawLine = (state) => {
 *     if (state.PossibleTargets.filter(x => x.isSelected).length === 2) {
 *       let target_goal = state.PossibleTargets.filter(x => x.isSelected).map(x => x.goal);
 *       if (target_goal[0] !== target_goal[1]) {
 *         let selected_divs = [...document.getElementsByClassName("clicked-target-btn")];
 *         let from_div = selected_divs[0];
 *         let to_div = selected_divs[1];
 *         let line_div = document.getElementsByClassName("target-join")[0];
 *         adjustLine(from_div, to_div, line_div)
 *         document.getElementsByClassName("target-join")[0].style["display"] = "unset";
 *       }
 *     } else {
 *       document.getElementsByClassName("target-join")[0].style["display"] = "none";
 *     }
 *   }
 *   componentDidUpdate() {
 *     if (this.props.CurrentRecord.Targets.length > 1) {
 *       this.drawLine(this.state)
 *     }
 *   }
 *   closeModal = () => {
 *     this.setState({ showModal: false })
 *   }
 *   render() {
 *     const { CurrentRecord, NextStep, PrevStep } = this.props;
 *     const { PossibleTargets } = this.state
 *     const NestedTargets = [...new Set(PossibleTargets.map(target => target.goal))]
 *       .reduce((acc, curr) => {
 *         acc[curr] = PossibleTargets.filter(target => target.goal === curr)
 *         return acc;
 *       }, {});
 *     var SelectedGoals = GoalList
 *       .filter(goal => Object.keys(NestedTargets)
 *         .includes(goal.goal.toString()))
 *     SelectedGoals.forEach(goal => {
 *       goal.targets = NestedTargets[goal.goal];
 *       return (goal);
 *     });
 *     return (
 *       <React.Fragment>
 *         <h2 className="AppStepTitle">Select Targets</h2>
 *         <div id="target-panel" className="target-panel">
 *           {
 *             SelectedGoals.map((goal, idx) =>
 *               <GoalCard
 *                 key={idx}
 *                 goal={goal}
 *                 CurrentRecord={CurrentRecord}
 *                 handleClick={this.handleClick} />
 *             )
 *           }
 *         </div>
 *         <InteractionModal
 *           SelectedGoals={SelectedGoals}
 *           CurrentRecord={CurrentRecord}
 *           showModal={this.state.showModal}
 *           closeModal={this.closeModal}
 *           handleInteraction={this.handleInteraction}
 *           ResetAndUpdate={this.ResetAndUpdate} />
 *         <div className="nav-btn">
 *           <ButtonGroup variant="contained" color="primary">
 *             <Button onClick={PrevStep}>Previous</Button>
 *             <Button onClick={NextStep}>Next</Button>
 *           </ButtonGroup>
 *         </div>
 *       </React.Fragment>
 *     );
 *   }
 * }; */

