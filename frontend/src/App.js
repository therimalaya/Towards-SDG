import React from 'react';
import Firebase from 'firebase';
import {FirebaseConfig} from './config/firebase-config.js'
import FrontCover from './components/FrontCover';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import {StepConfig} from './config/app-config';
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    Firebase.initializeApp(FirebaseConfig);

    this.state = {
      Step: 0,
      Goals: [],
      Targets: [],
      Name: "",
      Faculty: "",
      Research: {Title: "", URL: ""},
      Coauthors: {Faculty: []},
      Interaction: "",
      Records: []
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
      [input[0]]: newState,
    })
  }
  handleSelect = input => value => {
    this.setState({
      [input]: value
    })
  }

  writeData = (data) => {
    Firebase.database().ref('/').push(data);
    console.log("Data Saved");
  }

  Submit = (event) => {
    event.preventDefault()
    var currentDate = new Date()
    const data = {
      Name: this.state.Name,
      Faculty: this.state.Faculty,
      Research: this.state.Research,
      Coauthors: this.state.Coauthors,
      Goals: this.state.Goals,
      Targets: this.state.Targets,
      Interaction: this.state.Interaction,
      CurrentDate: currentDate
    }
    this.writeData(data)
    console.log(data)
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
      Step: 0
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
          {this.state.Step === 0
          ? <FrontCover
              nextStep={this.nextStep}
              Step={this.state.Step} />
          : <MainForm
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
          }
        </main>
      </div>
    )
  }
}
