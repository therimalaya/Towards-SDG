import React, { Fragment, useState } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { firestore, apps, initializeApp } from 'firebase';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, ButtonGroup } from '@material-ui/core';

import FrontCover from './components/FrontCover';
import MainForm from './components/MainForm';
import SideInfo from './components/SideInfo';
import AllRecords from './components/Records';

import { StepConfig } from './config/app-config';
import { FirebaseConfig } from './config/firebase-config.js';

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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    margin: '0px',
    boxSizing: 'border-box',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexShrink: 0,
    width: 'min(450px, 30%)',
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
    height: '100%',
    justifyContent: 'center',
    alignContent: 'flex-start',
    padding: '20px',
    paddingBottom: 0,
  },
  mainpanelBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  mainContent: {
    padding: '12px',
    flexGrow: 1,
    overflowY: 'auto',
  }
}));

const validateURL  = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function InnerApp(props) {
  const classes = useStyles();
  const { Step, NextStep, PrevStep, Submit, GoHome } = props;
  const { Records, CurrentRecord, FormData } = props;
  const { RemoveCurrentRecord, UpdateFormData, UpdateRecords, UpdateCurrentRecord } = props;
  const { StepConfig } = props;

  return(
    <Grid container className={classes.root}>
      <Grid item className={classes.sidebar}>
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
      <Grid item container className={classes.mainpanel}>
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
                : <Fragment>
                  <Box className={classes.mainContent}>
                    <MainForm
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
                  </Box>
                  <Box py="15px">
                    <ButtonGroup variant="contained" color="primary">
                      {Step!==1 & Step!==5 ? <Button onClick={PrevStep}>Previous</Button> : null}
                      {Step===4 ? <Button onClick={Submit}>Submit</Button> : null}
                      {Step!==5 & Step!==4 ? <Button onClick={NextStep}>Next</Button> : null}
                      {Step===5 ? <Button onClick={GoHome}>Start</Button> : null}
                    </ButtonGroup>
                  </Box>
                </Fragment>
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
  const [Step, setStep] = useState(1);
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
  const [NoError, setNoError] = useState(false);
  const [Errors, setErrors] = useState({
    Name: "",
    Faculty: "",
    Research: {
      Title: "",
      URL: "",
      Type: "",
      Outreach: ""
    },
    CoauthorFaculty: ""
  })

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
  const checkValidFields = (event) => {
    let isValid = true;
    let errors = {}

    // Update error state based on the
    // fetching values from Form state
    // All the checking goes here
    // Update the error state
    if (!FormData.Name) {
      errors.Name = "Name can not be empty";
      isValid = false;
    } else if (FormData.Name.length <= 5) {
      errors.Name = "Name must be at least 5 character long.";
      isValid = false;
    }

    if (!FormData.Faculty) {
      errors.Faculty = "Must select a faculty";
      isValid = false;
    }

    if (!FormData.Research.Title) {
      errors.Research = {...errors.Research, Title: "Research title must not be empty."};
      isValid = false;
    } else if (FormData.Research.Title.length <= 5) {
      errors.Research = {...errors.Research, Title: "Research title must be at least 5 character long."};
      isValid = false;
    }

    if (!FormData.Research.URL) {
      errors.Research = {...errors.Research, URL: "Research URL must not be empty."};
      isValid = false;
    } else if (!validateURL(FormData.Research.URL)) {
      errors.Research = {...errors.Research, URL: "Research URL is not valid."};
      isValid = false;
    }

    setNoError(isValid)
    setErrors({...Errors, ...errors})
    return isValid
  }
  const HandleFormChange = input => event => {
    let errors = {}
    errors[input] = "";
    setNoError("")
    setErrors({...Errors, ...errors})
    if (event.target) {
      UpdateFormData(input, event.target.value)
    } else if (event.value) {
      UpdateFormData(input, event.value)
    } else {
      UpdateFormData(input, event)
    }
  }
  const CheckAndProceed = (event) => {
    event.preventDefault()
    const isValid = checkValidFields(event)
    // Call checkValidFields function
    // This will update all the state
    // If noError is false, Error should automatically displayed
    // If noError is true, proceed to next step
    /* NextStep(event) */
    if (isValid) {
      NextStep(event)
    }
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
        Errors={Errors}
        setErrors={setErrors}
        NoError={NoError}
        setNoError={setNoError}
        checkValidFields={checkValidFields}
        HandleChange={HandleFormChange}
        CheckAndProceed={CheckAndProceed}
      />
    </ThemeProvider>
  )
}

