import React from "react";
import Form from "./Components/Form"
import Goals from './Data/goals.json'
import Targets from './Data/targets.json'
import MyStepper from "./Components/Stepper";
import NavButton from './Components/NavButton'
import { Fab, CssBaseline, Link, AppBar, Typography, Toolbar, Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Send } from '@material-ui/icons'

const numnum = (num) => num <= 9 ? "0" + num : num

Goals.forEach(Goal => {
  Goal['isCause'] = false
  Goal['isEffect'] = false
  Goal['isSelected'] = false
  Goal['image_src'] = `images/Goal-${numnum(Goal.goal)}.png`
})

Targets.forEach(Target => {
  Target['isCause'] = false
  Target['isEffect'] = false
  Target['isSelected'] = false
  Target['color'] = "primary"
})

// Configuration of Different Steps for MySteppter
const stepConfig = [
  { 'label': 'Personal Details', 'key': 1 },
  { 'label': 'Goals', 'key': 2 },
  { 'label': 'Targets', 'key': 3 },
  { 'label': 'Interaction', 'key': 4 },
  { 'label': 'Summary', 'key': 5 },
  { 'label': 'Confirmation', 'key': 6 },
]

const FacultyConfig = {
  "biosciences": "Biosciences",
  "kbm": "Chemistry, Biotechnology and Food Science",
  "mina": "Environmental Sciences and Natural Resource Management",
  "landsam": "Landscape and Society",
  "economics": "School of Economics and Business",
  "realtek": "Science and Technology",
  "vet": "Veterinary Medicine"
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '600',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
  },

}));

function MyAppBar(props) {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="regular">
        <Box textAlign="left" width={1}>
          <Typography variant="h6" color="inherit">
            NMBU Towards SDG
        </Typography>
        </Box>
        <Box textAlign="right" width={1}>
          <Typography variant="h6" color="inherit">
            {props.title}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://nmbu.no/">
        NMBU Towards SDG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function App() {
  const [Step, setStep] = React.useState(1)
  const [goals, setGoals] = React.useState(Goals)
  const [targets, setTargets] = React.useState(Targets.filter(Target => Target.id.match("\\d$")))
  const classes = useStyles()

  // Update Goals and Targets -------
  /*   const setCause = (Arr) => Arr.isCause = !Arr.isCause
    const setEffect = (Arr) => Arr.isEffect = !Arr.isEffect */

  // Change Steps -------
  const nextStep = () => setStep(Step + 1)
  const prevStep = () => setStep(Step - 1)

  // Update Goals --------
  const updateGoals = (selected_goals) => {
    var newGoal = Goals
      .map(goal => {
        if (selected_goals.indexOf(goal.goal) > -1) {
          goal.isSelected = true
        } else {
          goal.isSelected = false
        }
        return goal;
      })
    setGoals(newGoal)
  }

  // Update Goals --------
  const updateTargets = (selected_targets) => {
    var gota = selected_targets.target.textContent.split(".")
    var newTarget = targets
      .map(target => {
        if (target.goal === Number(gota[0])) {
          if (gota.join(".").indexOf(target.id) > -1) {
            if (target.isSelected) {
              target.isSelected = false
              target.color = "primary"
            } else {
              target.isSelected = true
              target.color = "secondary"
            }
          } else {
            target.isSelected = false
            target.color = "primary"
          }
        }
        return target
      })
    setTargets(newTarget)
  }

  const GoHome = () => {
    setStep(1)
    goals.forEach(goal=>goal.isSelected = false)
    targets.forEach(target=>target.isSelected = false)
  }

  const Submit = event => {
    alert('A name was submitted: ' + event);
    event.preventDefault();
    setStep(6)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <MyAppBar title={stepConfig.filter(x => x.key === Step).flatMap(x => x.label)} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Form
            FacultyConfig={FacultyConfig}
            step={Step}
            goals={goals}
            targets={targets}
            updateGoals={updateGoals}
            updateTargets={updateTargets}
          />
          <MyStepper
            step={Step}
            stepConfig={stepConfig}
             />
          <NavButton
            goals={goals}
            step={Step}
            next={nextStep}
            prev={prevStep}
            home={GoHome}
            submit={Submit}
            maxStep={stepConfig.length} />
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}
