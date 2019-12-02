import React from 'react';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import {StepConfig} from './config/app-config';
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Step: 3,
      Goals: [1, 2],
      Targets: [1.2, 2.4],
      Name: "Raju Rimal",
      Faculty: "KBM",
      Research: {
        Title: "Simulation of Linear Model Data",
        URL: "https://simulatr.github.io/simrel"},
      Coauthors: {Faculty: ["KBM", "MINA", "Realtek"]},
      Interaction: ""
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.goHome = this.goHome.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  handleInput = input => event => {
    input = input.split(".")
    var newState = this.state[input[0]]
    if (input.length > 1) {
      newState[input[1]] = event.target.value;
    } else {
      newState = event.target.value;
    }
    this.setState({
      [input[0]]: newState
    })
  }
  handleSelect = input => value => {
    this.setState({
      [input]: value
    })
  }
  Submit = (event) => {
    event.preventDefault()
    console.log("Submitted")
    this.nextStep(event)
  }
  nextStep = (event) => {
    event.preventDefault()
    const { Step } = this.state
    this.setState({
      Step: Step + 1
    });
  }
  prevStep = (event) => {
    event.preventDefault()
    const { Step } = this.state
    this.setState({
      Step: Step - 1
    });
  }
  goHome = (event) => {
    event.preventDefault()
    this.setState({
      Step: 1
    });
  }

  render() {
    const {Goals, Targets, Interaction} = this.state
    const {Name, Faculty, Research, Coauthors} = this.state
    const values = {Name, Faculty, Research, Coauthors}

    return (
      <div className="App">
        <aside className="App-sidebar">
          <header className="App-header"></header>
          <div className="App-info">
            <SideInfo Step={this.state.Step} StepConfig={StepConfig}/>
          </div>
          <footer className="App-footer">
          </footer>
        </aside>
        <main className="App-main">
          <MainForm
            Step={this.state.Step}
            values={values}
            Goals={Goals}
            Targets={Targets}
            Interaction={Interaction}
            handleInput={this.handleInput}
            handleSelect={this.handleSelect }
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            goHome={this.goHome}
            Submit={this.Submit}
          />
        </main>
      </div>
    );
  }
}
