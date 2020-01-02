import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore, apps, initializeApp } from 'firebase';
import { FirebaseConfig } from './config/firebase-config.js'
import FrontCover from './components/FrontCover';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import AllRecords from './components/Records';
import { StepConfig } from './config/app-config';
import './App.scss';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    if (!apps.length) {
      initializeApp(FirebaseConfig);
    }
    this.state = {
      Step: 0,
      FormData: {
        Name: "",
        Faculty: "",
        Research: {
          Title: "",
          URL: "",
          Type: "",
          Outreach: ""
        },
        Coauthors: { Faculty: [""] }
      },
      CurrentRecord: {
        Goals: [],
        Targets: [],
        Interaction: {
          value: "",
          type: "",
          direction: ""
        }
      },
      Records: []
    }

    this.UpdateRecords = this.UpdateRecords.bind(this);
    this.RemoveCurrentRecord = this.RemoveCurrentRecord.bind(this)
    this.UpdateFormData = this.UpdateFormData.bind(this);
    this.UpdateCurrentRecord = this.UpdateCurrentRecord.bind(this);
    this.NextStep = this.NextStep.bind(this);
    this.PrevStep = this.PrevStep.bind(this);
    this.GoHome = this.GoHome.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  UpdateRecords = (event) => {
    event.preventDefault()
    const clicked_targets = [...document.getElementsByClassName("clicked-target-btn")]
    clicked_targets.map(btn => btn.classList.toggle("clicked-target-btn"))
    clicked_targets.map(btn => btn.classList.toggle("target-btn"))
    var CurrentRecord = this.state.CurrentRecord
    CurrentRecord = {
      ...CurrentRecord,
      Goals: CurrentRecord.Targets.map(x => parseInt(x.split(".")[0]))
    }
    this.setState({
      Records: [...this.state.Records, CurrentRecord],
      CurrentRecord: {
        ...this.state.CurrentRecord,
        Targets: [],
        Interaction: { value: "", type: "", direction: "" }
      }
    })
  }

  RemoveCurrentRecord = (event) => {
    this.setState({
      Records: this.state.Records.filter((value, idx) => idx !== Number(event.target.value))
    })
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
    var db = firestore();
    db.collection("records")
      .add({ ...data, created: firestore.Timestamp.fromDate(new Date()) })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      }).catch(function (error) {
        console.error("Error adding document: ", error);
      });
    /* Firebase.database().ref('/').push(data); */
    /* console.log("Data Saved"); */
  }
  Submit = (event) => {
    event.preventDefault()
    const data = {
      Name: this.state.FormData.Name,
      Faculty: this.state.FormData.Faculty,
      Research: this.state.FormData.Research,
      Coauthors: this.state.FormData.Coauthors,
      SDGRecords: this.state.Records
    }
    this.WriteData(data)
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
      Step: 0,
      Records: []
    });
  }

  render() {
    const { Step, CurrentRecord, FormData, Records } = this.state

    return (
      <div className="App">
        <aside className="App-sidebar">
          <header className="App-header"></header>
          <div className="App-info">
            <SideInfo
              Records={Records}
              RemoveCurrentRecord={this.RemoveCurrentRecord}
              Step={this.state.Step}
              StepConfig={StepConfig} />
          </div>
          <footer className="App-footer">
          </footer>
        </aside>
        <Router basename="/">
          <Switch>
            <Route path='/records'>
              <AllRecords />
            </Route>
            <Route path='/'>
              <main className="App-main">
                {Step === 0
                  ? <FrontCover
                    NextStep={this.NextStep} />
                  : <MainForm
                    Step={Step}
                    FormData={FormData}
                    CurrentRecord={CurrentRecord}
                    Records={Records}
                    UpdateFormData={this.UpdateFormData}
                    UpdateCurrentRecord={this.UpdateCurrentRecord}
                    UpdateRecords={this.UpdateRecords}
                    NextStep={this.NextStep}
                    PrevStep={this.PrevStep}
                    GoHome={this.GoHome}
                    Submit={this.Submit}
                  />
                }
              </main>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
