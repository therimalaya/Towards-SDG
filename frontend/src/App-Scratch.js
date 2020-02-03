import React, { useState } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore, apps, initializeApp } from 'firebase';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Card, Container } from '@material-ui/core';

import FrontCover from './components/FrontCover';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import AllRecords from './components/Records';

import { StepConfig } from './config/app-config';
import { FirebaseConfig } from './config/firebase-config.js';

import { LOGO } from './images/NMBUwhite.svg';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ae99',
      main: '#009a80',
      dark: '#006b59',
      contrastText: "#fff",
    },
    secondary: {
      main: '#556680',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    }
  }
})

// May be create responseive font sizes

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexWrap: 'wrap',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'url("./images/header.jpg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '150px',
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
  sideinfo: {
    backgroundColor: "#efefef",
    padding: '1rem',
  },
  sidefooter: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(./images/NMBUwhite.svg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "50px",
  },
  mainpanel: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  mainpanelBox: {
    height: "90%",
    width: "90%",
  }

}));

function InnerApp(props) {
  const classes = useStyles();
  const { Step, NextStep, PrevStep, Submit, GoHome } = props;
  const { Records, CurrentRecord, FormData } = props;
  const { RemoveCurrentRecord, UpdateFormData, UpdateRecords, UpdateCurrentRecord } = props;
  const { StepConfig } = props;

  return(
    <Grid container className={classes.root}>
      <Grid item className={classes.sidebar} xs={4}>
        <Box className={classes.header}></Box>
        <Box className={classes.sideinfo} flexGrow={1}>
          <SideInfo
            Records={Records}
            RemoveCurrentRecord={RemoveCurrentRecord}
            Step={Step}
            StepConfig={StepConfig} />
        </Box>
        <Box className={classes.sidefooter}></Box>
      </Grid>
      <Grid item container className={classes.mainpanel} xs={8}>
        <Router basename="/">
          <Switch>
            <Route path='/records'>
              <AllRecords />
            </Route>
            <Route path='/'>
              <Box className={classes.mainpanelBox}>
                {Step === 0
                ? <FrontCover
                    NextStep={NextStep} />
                : <MainForm
                    Step={Step}
                    FormData={FormData}
                    CurrentRecord={CurrentRecord}
                    Records={Records}
                    UpdateFormData={UpdateFormData}
                    UpdateCurrentRecord={UpdateCurrentRecord}
                    UpdateRecords={UpdateRecords}
                    NextStep={NextStep}
                    PrevStep={PrevStep}
                    GoHome={GoHome}
                    Submit={Submit}
                />
                }
              </Box>
            </Route>
          </Switch>
        </Router>
      </Grid>
    </Grid>
  )
}

export default function App() {
  if (!apps.length) {
    initializeApp(FirebaseConfig);
  }

  // STATES
  const [Step, setStep] = useState(3);
  const [FormData, setFormData] = useState({
    Name: "",
    Faculty: "",
    Research: {
      Title: "",
      URL: "",
      Type: "",
      Outreach: ""
    },
    Coauthors: { Faculty: [""] }
  });
  const [CurrentRecord, setCurrentRecord] = useState({
    Goals: [3, 13],
    Targets: [3.1, 13.1],
    Interaction: {
      value: "Positive",
      type: "Direct",
      direction: "rtl"
    }
  });
  const [Records, setRecords] = useState([]);

  // METHODS -> FUNCTIONS
  const UpdateRecords = (event) => {
    event.preventDefault()
    const clicked_targets = [...document.getElementsByClassName("clicked-target-btn")]
    clicked_targets.map(btn => btn.classList.toggle("clicked-target-btn"))
    clicked_targets.map(btn => btn.classList.toggle("target-btn"))
    var _CurrentRecord = CurrentRecord
    _CurrentRecord = {
      ..._CurrentRecord,
      Goals: _CurrentRecord.Targets.map(x => parseInt(x.split(".")[0]))
    }
    setRecords([...Records, _CurrentRecord])
    setCurrentRecord({
      ...CurrentRecord,
      Targets: [],
      Interaction: { value: "", type: "", direction: "" }
    })
  }
  const RemoveCurrentRecord = (event) => {
    this.setState({
      Records: this.state.Records.filter((value, idx) => idx !== Number(event.target.value))
    })
  }
  const UpdateFormData = (field, data) => {
    field = field.split(".")
    var newState = FormData
    if (field.length > 1) {
      newState[field[0]][field[1]] = data;
    } else {
      newState[field[0]] = data;
    }

    setFormData(newState)
  }
  const UpdateCurrentRecord = (input, value) => {
    setCurrentRecord({
      ...CurrentRecord,
      [input]: value
    })
  }
  const WriteData = (data) => {
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
  const Submit = (event) => {
    event.preventDefault()
    const data = {
      Name: FormData.Name,
      Faculty: FormData.Faculty,
      Research: FormData.Research,
      Coauthors: FormData.Coauthors,
      SDGRecords: Records
    }
    WriteData(data)
    NextStep(event)
  }
  const NextStep = (event) => {
    event.preventDefault()
    setStep(Step + 1)
  }
  const PrevStep = (event) => {
    event.preventDefault()
    setStep(Step - 1)
  }
  const GoHome = (event) => {
    event.preventDefault()
    setStep(0)
  }


  return(
    <ThemeProvider theme={theme}>
      <InnerApp
        Records={Records}
        RemoveCurrentRecord={RemoveCurrentRecord}
        Step={Step}
        StepConfig={StepConfig}
        NextStep={NextStep}
        FormData={FormData}
        CurrentRecord={CurrentRecord}
        UpdateFormData={UpdateFormData}
        UpdateCurrentRecord={UpdateCurrentRecord}
        UpdateRecords={UpdateRecords}
        PrevStep={PrevStep}
        GoHome={GoHome}
        Submit={Submit}
      />
    </ThemeProvider>
  )
}

