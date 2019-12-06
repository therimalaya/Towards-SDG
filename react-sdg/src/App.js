import React, { Component } from "react";
import Form from "./Components/Form"
import Goals from './Data/goals.json'
import AllTargets from './Data/targets.json'
import MyStepper from "./Components/Stepper";
import NavButton from './Components/NavButton'

// Filter all Targets ending with alphabetic character
const Targets = AllTargets.filter(Target => Target.id.match("\\d$"))
const numnum = (num) => num <= 9 ? "0"+num : num

Goals.forEach(Goal=>{
  Goal['isCause'] =  false
  Goal['isEffect'] =  false
  Goal['image_src'] = `images/Goal-${numnum(Goal.goal)}.png`
})
Targets.forEach(Target=>{
  Target['isCause'] =  false
  Target['isEffect'] =  false
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

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      Goals: Goals,
      Targets: Targets
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

  
  render() {
    return (
      <div>
        <Form
          step={this.state.step}
          Goals={Goals}
          Targets={Targets}/>
        <MyStepper
          step={this.state.step}
          stepConfig={stepConfig}/>
        <NavButton
          step={this.state.step}
          next={this.nextStep}
          prev={this.prevStep}
          maxStep={stepConfig.length}/>
      </div>
    )
  }
}
