import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore, apps, initializeApp } from 'firebase';
import { FirebaseConfig } from './config/firebase-config.js'
import FrontCover from './components/FrontCover';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import AllRecords from './components/Records';
import { StepConfig } from './config/app-config';
import { ThemeProvider, createMuiTheme, styled } from '@material-ui/core/styles';
import { Drawer, Card, Container } from '@material-ui/core';
import './App1.scss';

const scratch = () => (
  <Container className="App" disableGutters={true} maxWidth={false}>
  <Drawer
    className="App-sidebar"
    variant="permanent"
    anchor="left">
    {/* <aside className="App-sidebar"> */}
    <Card className="App-header"></Card>
    {/* <header className="App-header"></header> */}
    <div className="App-info">
      <SideInfo
        Records={Records}
        RemoveCurrentRecord={this.RemoveCurrentRecord}
        Step={this.state.Step}
        StepConfig={StepConfig} />
    </div>
    <footer className="App-footer">
    </footer>
    {/* </aside> */}
  </Drawer>
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
</Container>
)

export default Scratch
