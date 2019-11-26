import React from 'react';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import {StepConfig, FacultyConfig} from './config/app-config.js'
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Step: 1,
      Goals: [1, 2],
      Targets: [1.1, 2.5],
      Name: "Raju Rimal",
      Faculty: "KBM",
      Research: {Title: "Simrel", URL: "https://simulatr.github.io"},
      Coauthors: {Faculty: ["KBM", "Realtek"]},
      Interaction: "Positive"
    }
  }

  render() {
    const {Step} = this.state
    const {Goals, Targets, Interaction} = this.state
    const {Name, Faculty, Research, Coauthors} = this.state
    const values = {Name, Faculty, Research, Coauthors}

    const handleInput = input => event => this.setState({[input]: event.target.value});
    const handleSelect = input => value => this.setState({[input]: value});
    const nextStep = () => this.setState({Step: Step+1})
    const prevStep = () => this.setState({Step: Step-1})
    const goHome = () => this.setState({Step: 1})

    return (
      <div className="App">
        <aside className="App-sidebar">
          <header className="App-header"></header>
          <div className="App-info">
            <SideInfo Step={Step} StepConfig={StepConfig}/>
          </div>
          <footer className="App-footer">
          </footer>
        </aside>
        <main className="App-main">
          <MainForm
            Step={Step}
            values={values}
            Goals={Goals}
            Targets={Targets}
            Interaction={Interaction}
            handleInput={handleInput}
            handleSelect={handleSelect }
            nextStep={nextStep}
            prevStep={prevStep}
            goHome={goHome}
          />
        </main>
      </div>
    );
  }
}
