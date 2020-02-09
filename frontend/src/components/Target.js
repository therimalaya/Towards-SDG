import React, { Fragment, useState, useEffect } from 'react';
import className from 'classname';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import { IconButton , Grid, Typography } from '@material-ui/core';
import { Button, Paper } from '@material-ui/core';
import { TableContainer, Table, TableRow, TableCell, TableBody, TableHead } from '@material-ui/core';
import { Box, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const numnum = num => num <= 9 ? "0" + num : num;

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
    margin: "4px 0px",
    textTransform: 'unset',
    textAlign: 'left',
    justifyContent: 'start',
    backgroundColor: theme.palette.background.light,
    color: theme.palette.primary.main,
    '& p': {
      margin: 0,
      '& span': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: 'inline-block',
        paddingRight: '5px',
        paddingLeft: '3px',
        borderRadius: '5px',
        marginRight: '5px'
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.background.light,
    },
  },
  goalcover: {
    width: '100%',
    height: '175px',
    flexShrink: 0,
    backgroundPosition: "top left",
  },
  tableWrapper: {
    width: '100%',
  },
  table: {
    width: '100%',
    maxHeight: '150px',
    overflowY: 'scroll',
    marginBottom: "15px",
    "& tbody": {
      "& *": {
        fontSize: 'inherit',
        padding: "2px 5px",
      }
    }
  },
  goalheader: {
    display: 'flex',
    alignItems: 'center',
    "& p": {
      color: theme.palette.primary.contrastText,
      fontSize: 'larger',
    },
    "& h3": {
      color: theme.palette.primary.contrastText,
      paddingRight: "10px",
      paddingLeft: "5px",
    }
  }
}))

function Target(props) {
  const classes = useStyles();
  const { CurrentRecord, Records } = props;
  const { UpdateCurrentRecord, RemoveCurrentRecord } = props;
  const { UpdateCurrent } = props;

  let newTargets = TargetList
    .filter(target => props.CurrentRecord.Goals.includes(target.goal))
    .filter(target => target.id.match("[0-9]$"))
  newTargets.forEach(target => {
    target.goal_img = "images/Goals/Goal-" + numnum(target.goal) + ".png"
    target.isSelected = props.CurrentRecord.Targets.map(x => x.toString()).includes(target.id)
  });

  const [PossibleTargets, setPossibleTargets] = useState(newTargets);

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

  const handleClick = (event) => {
    event.preventDefault()
    const newTargets = PossibleTargets;
    newTargets.forEach(target => {
      if (target.id === event.currentTarget.name) {
        target.isSelected = !target.isSelected
        event.currentTarget.classList.toggle(classes.clickedTargetBtn)
      }
    })
    UpdateCurrentRecord(
      'Targets',
      newTargets.filter(target => target.isSelected).map(target => target.id)
    )
    setPossibleTargets(newTargets)
  }

  return(
    <Fragment>
      <Grid container direction="column">
        <Grid container>
          <Grid item className={classes.tableWrapper}>
            {
              Records.length > 0 &&
              <React.Fragment>
                <Typography m={0} variant="overline">Selected Records</Typography>
                <SideTable
                  Records={Records}
                  removeCurrent={RemoveCurrentRecord}
                  UpdateCurrent={UpdateCurrent}
                />
              </React.Fragment>
            }
          </Grid>
          <Grid item container spacing={1}>
            {
              SelectedGoals.map((goal, idx) =>
                <Grid item xs={6} key={goal.goal}>
                  <Box
                    width="100%"
                    height="50px"
                    className={classes.goalheader}
                    style={{backgroundColor: goal.colorInfo.hex}}>
                    <Typography variant="h3" component="h3">{goal.goal}</Typography>
                    <Typography variant="subtitle1" component="p">{goal.short}</Typography>
                  </Box>
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
                          disabled={CurrentRecord.Targets.length>=2 && !CurrentRecord.Targets.includes(String(target.id))}
                          className={
                          className(classes.targetBtn, CurrentRecord.Targets.includes(target.id)
                                  ? classes.clickedTargetBtn
                                  : null)
                          }>
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
      </Grid>
    </Fragment>
  )
}

export default Target;

const SideTable = props => {
  const classes = useStyles();
  const { Records, removeCurrent, UpdateCurrent } = props;
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table stickyHeader size="small" aria-label="Selected Records Table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Target1</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Target2</TableCell>
            <TableCell>Interaction</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Records.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                <IconButton aria-label="delete" onClick={removeCurrent} name={String(key)} size="small">
                <DeleteIcon fontSize="small"/>
                </IconButton>
              </TableCell>
              <TableCell>
                {row.Targets[0] ? row.Targets[0] : row.Goals[0]}
              </TableCell>
              <TableCell>
                <TextField
                  name={String(key)}
                  id="select-interaction-direction"
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  onChange={UpdateCurrent("direction")}
                  value={Records[key].Interaction.direction}
                >
                  {direction.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                {row.Targets[1] ? row.Targets[1] : row.Goals[1]}
              </TableCell>
              <TableCell>
                <TextField
            name={String(key)}
            id="select-interaction"
            variant="outlined"
            size="small"
            select
            fullWidth
            value={Records[key].Interaction.value}
            onChange={UpdateCurrent("value")}
            >
                {interaction.map(option => (
  <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  id="select-interaction-type"
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  name={String(key)}
                  onChange={UpdateCurrent("type")}
                  value={Records[key].Interaction.type}
                >
                  {type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export const InteractionArrow = props => {
  const {direction} = props;
  if (direction === 'rtl') {
    return <DoubleArrowIcon style={{fontSize: 'inherit', transform: 'rotate(180deg)'}}/>;
  } else {
    return <DoubleArrowIcon style={{fontSize: 'inherit'}}/>;
  }
}

const direction = [
  {value: 'ltr', label: <InteractionArrow direction="ltr" />},
  {value: 'rtl', label: <InteractionArrow direction="rtl" />},
]

const interaction = [
  {value: 'Positive', label: "Positive"},
  {value: 'Negative', label: "Negative"},
]

const type = [
  {value: 'Direct', label: "Direct"},
  {value: 'Indirect', label: "Indirect"},
]

