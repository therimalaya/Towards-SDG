import React, { Component } from "react";
import Form from "./Components/Form"
import Goals from './Data/goals.json'
import Targets from './Data/targets.json'
import MyStepper from "./Components/Stepper";
import NavButton from './Components/NavButton'
import { Paper, Container, AppBar, Typography, Toolbar, Box } from '@material-ui/core'

const numnum = (num) => num <= 9 ? "0"+num : num

Goals.forEach(Goal=>{
  Goal['isCause'] =  false
  Goal['isEffect'] =  false
  Goal['isSelected'] =  false
  Goal['image_src'] = `images/Goal-${numnum(Goal.goal)}.png`
})

Targets.forEach(Target=>{
  Target['isCause'] =  false
  Target['isEffect'] =  false
  Target['isSelected'] =  false
  Target['color'] = "primary"
})

// Configuration of Different Steps for MySteppter
const stepConfig = [
  {'label': 'Personal Details', 'key': 1}, 
  {'label': 'Goals', 'key': 2}, 
  {'label': 'Targets', 'key': 3}, 
  {'label': 'Interaction', 'key': 4}, 
  {'label': 'Summary', 'key': 5}, 
  {'label': 'Confirmation', 'key': 6}, 
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

function MyAppBar(props) {
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
      <Box textAlign="left" width={1}>
        <Typography variant="h6" color="inherit">
          NMBU towards Sustainable Development Goal
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


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      Goals: Goals,
      Targets: Targets.filter(Target => Target.id.match("\\d$"))
    }
  }

  // Update Goals and Targets -------
  setCause = (Arr) => Arr.isCause = !Arr.isCause
  setEffect = (Arr) => Arr.isEffect = !Arr.isEffect

  // Forward the form -------
  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  // Backward the form -------
  prevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  // Update Goals --------
  updateGoals = (selected_goals) => {
    var newGoal = this.state.Goals
        .map(goal=>{
          if (selected_goals.indexOf(goal.goal) > -1) {
            goal.isSelected = true 
          } else {
            goal.isSelected = false
          }
          return goal;
        })
    this.setState({Goals: newGoal})
  }

  // Update Goals --------
  updateTargets = (selected_targets) => {
    var gota = selected_targets.target.textContent.split(".")
    var newTarget = this.state.Targets
      .map(target => {
        if (target.goal===Number(gota[0])) {
          if (gota.join(".").indexOf(target.id)>-1) {
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
    this.setState({Targets: newTarget})
}

  render() {
    const minHeight = "80vh";
    return (
      <div>
        <MyAppBar title={stepConfig.filter(x=>x.key===this.state.step).flatMap(x=>x.label)}/>
        <Container xs={12} sm={6} fixed={true}>
          <Paper>
            <Box my={6} p={2} minHeight={minHeight} className="main-container">
        <Form
          FacultyConfig={FacultyConfig}
          step={this.state.step}
          goals={this.state.Goals}
          targets={this.state.Targets}
          updateGoals={this.updateGoals}
          updateTargets={this.updateTargets}
        />
        <MyStepper
          step={this.state.step}
          stepConfig={stepConfig}/>
        <NavButton
          goals={this.state.Goals}
          step={this.state.step}
          next={this.nextStep}
          prev={this.prevStep}
          maxStep={stepConfig.length}/>
          </Box>
          </Paper>
          </Container>
      </div>
    )
  }
}
