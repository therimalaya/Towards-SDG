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
    if (!Firebase.apps.length) {
      Firebase.initializeApp(FirebaseConfig);
    }

    this.state = {
      Step: 5,
      FormData: {
        Name: "",
        Faculty: "",
        Research: {Title: "", URL: ""},
        Coauthors: {Faculty: []},
      },
      CurrentRecord: {
        Goals: [],
        Targets: [],
        Interaction: ""
      },
      Records: []
    }

    this.UpdateFormData = this.UpdateFormData.bind(this);
    this.UpdateCurrentRecord = this.UpdateCurrentRecord.bind(this);
    this.NextStep = this.NextStep.bind(this);
    this.PrevStep = this.PrevStep.bind(this);
    this.GoHome = this.GoHome.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  UpdateFormData = (field, data) => {
    field = field.split(".")
    var newState = this.state.FormData
    if (field.length > 1) {
      newState[field[0]][field[1]] = data;
    } else {
      newState[field[0]] = data;
    }

    this.setState({
      FormData: newState,
    })
  }
  UpdateCurrentRecord = (input, value) => {
    this.setState({
      CurrentRecord: {
        ...this.state.CurrentRecord,
        [input]: value
      }
    })
  }
  WriteData = (data) => {
    Firebase.database().ref('/').push(data);
    console.log("Data Saved");
  }
  Submit = (event) => {
    event.preventDefault()
    var currentDate = new Date()
    const data = {
      Name: this.state.FormData.Name,
      Faculty: this.state.FormData.Faculty,
      Research: this.state.FormData.Research,
      Coauthors: this.state.FormData.Coauthors,
      SDGRecords: this.state.CurrentRecord,
      CurrentDate: currentDate
    }
    this.WriteData(data)
    console.log(data)
    this.NextStep(event)
  }
  NextStep = (event) => {
    event.preventDefault()
    const { Step } = this.state
    this.setState({
      Step: Step + 1
    });
  }
  PrevStep = (event) => {
    event.preventDefault()
    const { Step } = this.state
    this.setState({
      Step: Step - 1
    });
  }
  GoHome = (event) => {
    event.preventDefault()
    this.setState({
      Step: 0
    });
  }

  render() {
    const {Step, CurrentRecord, FormData} = this.state

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
          {Step === 0
          ? <FrontCover
              NextStep={this.NextStep}/>
          : <MainForm
              Step={Step}
              FormData={FormData}
              CurrentRecord={CurrentRecord}
              UpdateFormData={this.UpdateFormData}
              UpdateCurrentRecord ={this.UpdateCurrentRecord}
              NextStep={this.NextStep}
              PrevStep={this.PrevStep}
              GoHome={this.GoHome}
              Submit={this.Submit}
          />
          }
        </main>
      </div>
    )
  }
}
