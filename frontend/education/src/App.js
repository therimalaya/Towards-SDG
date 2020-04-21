import React, { Fragment, useEffect, useState } from "react";
import {
  useQuery,
  gql,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { firestore, apps, initializeApp } from "firebase";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, ButtonGroup } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import FrontCover from "./components/FrontCover";
import MainForm from "./components/MainForm";
import SideInfo from "./components/SideInfo";
import AllRecords from "./components/Records";
// import NetworkSDG from "./components/Network";
import Heatmap from "./components/Heatmap";

import { StepConfig } from "./config/app-config";
import { FirebaseConfig } from "./config/firebase-config.js";

import { CSVLink } from "react-csv";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:9000/",
    fetchOptions: {
      mode: "no-cors",
    },
  }),
});

var unsubscribe;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33ae99",
      dark: "#009a80",
      main: "#006b59",
      contrastText: "#fff",
    },
    secondary: {
      main: "#556680",
      contrastText: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
      light: "#F0F8FF",
    },
  },
});
// May be create responseive font sizes

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",
    margin: "0px",
    boxSizing: "border-box",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexShrink: 0,
  },
  header: {
    background: 'url("./images/header.jpg")',
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "150px",
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
  sideinfo: {
    backgroundColor: "#efefef",
    padding: "1rem",
    overflowY: "auto",
  },
  sidefooter: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(./images/NMBUwhite.svg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "50px",
  },
  sidefooterRecords: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: theme.palette.background.default,
    borderTopWidth: "5px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.primary.main,
  },
  mainpanel: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignContent: "flex-start",
    padding: "20px",
    paddingBottom: 0,
  },
  mainpanelBox: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  mainContent: {
    padding: "12px",
    flexGrow: 1,
    overflowY: "auto",
  },
  csvDownload: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
}));

const DownloadCSV = (props) => {
  const [records, setRecords] = useState([]);
  const classes = useStyles();
  // useEffect(() => {
  //   const db = firestore();
  //   unsubscribe = db
  //     .collection("education")
  //     .orderBy("created", "desc")
  //     .onSnapshot((snapshot) => {
  //       let records = [];
  //       snapshot.forEach((doc) => {
  //         let data = doc.data();
  //         return records.push(
  //           data.SDGRecords.flatMap((item) => ({
  //             id: item.Targets.join("-"),
  //             CourseName: data.CourseName,
  //             CourseCode: data.CourseCode,
  //             Goal1: item.Goals[0],
  //             Goal2: item.Goals[1],
  //             Target1: item.Targets[0],
  //             Target2: item.Targets[1],
  //             Interaction: item.Interaction.value,
  //             Direction: item.Interaction.direction,
  //             Type: item.Interaction.type,
  //           }))
  //         );
  //       });
  //       setRecords(records.flatMap((x) => x));
  //     });
  //   return () => unsubscribe();
  // }, []);

  return (
    <Fragment>
      {records.length > 0 ? (
        <CSVLink
          data={records}
          filename={"SDG-Records.csv"}
          target="_blank"
          className={classes.csvDownload}
          onClick={(event) => {
            console.log(records);
          }}
        >
          Download CSV
        </CSVLink>
      ) : null}
    </Fragment>
  );
};

function InnerApp(props) {
  const classes = useStyles();
  const { Step, NextStep, PrevStep, Submit, GoHome } = props;
  const { Records, CurrentRecord, FormData } = props;
  const { UpdateCurrent, RemoveCurrentRecord, UpdateCurrentRecord } = props;
  const { UpdateFormData, UpdateRecords } = props;
  const { Errors, setErrors, NoError, setNoError } = props;
  const { checkValidFields, HandleChange, CheckAndProceed } = props;
  const { StepConfig } = props;

  return (
    <ApolloProvider client={client}>
      <Grid container className={classes.root}>
        <Router basename="/">
          <Switch>
            <Route path="/records">
              <Grid item className={classes.sidebar} xs={3}>
                <Box className={classes.header}></Box>
                <Box className={classes.sideinfo} flexGrow={1}>
                  <Box height="100%"></Box>
                </Box>
                <Box className={classes.sidefooterRecords}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    <DownloadCSV />
                  </Button>
                </Box>
              </Grid>
              <Grid item container className={classes.mainpanel} xs={9}>
                <Box className={classes.mainpanelBox}>
                  <AllRecords />
                </Box>
              </Grid>
            </Route>
            <Route path="/network">
              <Grid item className={classes.sidebar} xs={3}>
                <Box className={classes.header}></Box>
                <Box className={classes.sideinfo} flexGrow={1}></Box>
                <Box className={classes.sidefooter}></Box>
              </Grid>
              <Grid item container className={classes.mainpanel} xs={9}>
                <Box className={classes.mainpanelBox}>
                  <h1>We will come back soon!</h1>
                  {/* <NetworkSDG /> */}
                </Box>
              </Grid>
            </Route>
            <Route path="/heatmap">
              <Grid item className={classes.sidebar} xs={3}>
                <Box className={classes.header}></Box>
                <Box className={classes.sideinfo} flexGrow={1}></Box>
                <Box className={classes.sidefooter}></Box>
              </Grid>
              <Grid item container className={classes.mainpanel} xs={9}>
                <Box className={classes.mainpanelBox}>
                  <Heatmap />
                </Box>
              </Grid>
            </Route>
            <Route path="/">
              <Grid item className={classes.sidebar} xs={3}>
                <Box className={classes.header}></Box>
                <Box className={classes.sideinfo} flexGrow={1}>
                  <SideInfo
                    Records={Records}
                    RemoveCurrentRecord={RemoveCurrentRecord}
                    Step={Step}
                    StepConfig={StepConfig}
                  />
                </Box>
                <Box className={classes.sidefooter}></Box>
              </Grid>
              <Grid item container className={classes.mainpanel} xs={9}>
                <Box className={classes.mainpanelBox}>
                  {Step === 0 ? (
                    <Fragment>
                      <Box className={classes.mainContent}>
                        <FrontCover NextStep={NextStep} />
                      </Box>
                      <Box py="15px">
                        <ButtonGroup variant="contained" color="primary">
                          <Button onClick={NextStep}>Get Started</Button>
                        </ButtonGroup>
                      </Box>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Box className={classes.mainContent}>
                        <MainForm
                          Step={Step}
                          FormData={FormData}
                          CurrentRecord={CurrentRecord}
                          Records={Records}
                          UpdateFormData={UpdateFormData}
                          UpdateCurrentRecord={UpdateCurrentRecord}
                          UpdateRecords={UpdateRecords}
                          UpdateCurrent={UpdateCurrent}
                          RemoveCurrentRecord={RemoveCurrentRecord}
                          NextStep={NextStep}
                          PrevStep={PrevStep}
                          GoHome={GoHome}
                          Submit={Submit}
                          Errors={Errors}
                          setErrors={setErrors}
                          NoError={NoError}
                          setNoError={setNoError}
                          checkValidFields={checkValidFields}
                          HandleChange={HandleChange}
                          CheckAndProceed={CheckAndProceed}
                        />
                      </Box>
                      <Box py="15px">
                        <ButtonGroup variant="contained" color="primary">
                          {[2, 3, 4].includes(Step) ? (
                            <Button onClick={PrevStep}>Previous</Button>
                          ) : null}
                          {Step === 4 ? (
                            <Button onClick={Submit}>Submit</Button>
                          ) : null}
                          {Step === 3 ? (
                            <Button onClick={NextStep}>Next</Button>
                          ) : null}
                          {Step === 2 ? (
                            <Button
                              onClick={NextStep}
                              disabled={!CurrentRecord.Goals.length}
                            >
                              Next
                            </Button>
                          ) : null}
                          {Step === 1 ? (
                            <Button onClick={CheckAndProceed}>Next</Button>
                          ) : null}
                          {Step === 5 ? (
                            <Button onClick={GoHome}>Start</Button>
                          ) : null}
                          {Step === 3 ? (
                            <Button onClick={UpdateRecords}>
                              Add Selected Record
                            </Button>
                          ) : null}
                        </ButtonGroup>
                      </Box>
                    </Fragment>
                  )}
                </Box>
              </Grid>
            </Route>
          </Switch>
        </Router>
      </Grid>
    </ApolloProvider>
  );
}

export default function App() {
  if (!apps.length) {
    initializeApp(FirebaseConfig);
  }

  // STATES
  const [Step, setStep] = useState(0);
  const [FormData, setFormData] = useState({
    Type: "course",
    CourseCode: "",
    Year: new Date().getFullYear(),
    CourseName: "",
    CourseResponsible: "",
    Faculty: "",
    RelatedFaculties: [],
    Teaching: "",
    SustainFocus: "",
  });
  const [CurrentRecord, setCurrentRecord] = useState({
    Goals: [],
    Targets: [],
    Interaction: {
      value: "",
      type: "",
      direction: "",
    },
  });
  const [Records, setRecords] = useState([]);
  const [NoError, setNoError] = useState();
  const [Errors, setErrors] = useState({
    Type: "",
    CourseName: "",
    CourseCode: "",
    Year: "",
    CourseResponsible: "",
    Faculty: "",
    RelatedFaculties: "",
    Teaching: "",
    SustainFocus: "",
  });

  // METHODS -> FUNCTIONS
  const UpdateRecords = (event) => {
    event.preventDefault();
    /* const clicked_targets = [...document.getElementsByClassName("clicked-target-btn")]
     * clicked_targets.map(btn => btn.classList.toggle("clicked-target-btn"))
     * clicked_targets.map(btn => btn.classList.toggle("target-btn")) */
    var _CurrentRecord = CurrentRecord;
    if (CurrentRecord.Targets.length <= 2) {
      _CurrentRecord = {
        ..._CurrentRecord,
        Goals: _CurrentRecord.Goals,
      };
    } else {
      _CurrentRecord = {
        ..._CurrentRecord,
        Goals: _CurrentRecord.Targets.map((x) => parseInt(x.split(".")[0])),
      };
    }
    setRecords([_CurrentRecord, ...Records]);
    setCurrentRecord({
      ...CurrentRecord,
      Targets: [],
      Interaction: { value: "", type: "", direction: "" },
    });
  };
  const RemoveCurrentRecord = (event) => {
    setRecords(
      Records.filter((value, idx) => String(idx) !== event.currentTarget.name)
    );
  };
  const UpdateCurrent = (input) => (event) => {
    const newRecord = Records.map((record, idx) => {
      if (String(idx) === event.target.name) {
        record.Interaction[input] = event.target.value;
        return record;
      } else {
        return record;
      }
    });
    setRecords(newRecord);
  };
  const UpdateFormData = (field, data) => {
    setFormData({
      ...FormData,
      ...{ [field]: data },
    });
  };
  const UpdateCurrentRecord = (input, value) => {
    setCurrentRecord({
      ...CurrentRecord,
      [input]: value,
    });
  };
  const WriteData = (data) => {
    var db = firestore();
    db.collection("education")
      .add({ ...data, created: firestore.Timestamp.fromDate(new Date()) })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    /* Firebase.database().ref('/').push(data); */
    /* console.log("Data Saved"); */
  };
  const Submit = (event) => {
    event.preventDefault();
    const data = {
      Type: FormData.Type,
      CourseCode: FormData.CourseCode,
      Year: FormData.Year,
      CourseName: FormData.CourseName,
      CourseResponsible: FormData.CourseResponsible,
      Faculty: FormData.Faculty,
      RelatedFaculties: FormData.RelatedFaculties,
      Teaching: FormData.Teaching,
      SustainFocus: FormData.SustainFocus,
      SDGRecords: Records,
    };
    WriteData(data);
    NextStep(event);
  };
  const NextStep = (event) => {
    event.preventDefault();
    setStep(Step + 1);
  };
  const PrevStep = (event) => {
    event.preventDefault();
    setStep(Step - 1);
  };
  const GoHome = (event) => {
    event.preventDefault();
    setRecords([]);
    setCurrentRecord({
      Goals: [],
      Targets: [],
      Interaction: {
        value: "",
        type: "",
        direction: "",
      },
    });
    setFormData({
      Type: FormData.Type,
      CourseCode: "",
      Year: 2020,
      CourseName: "",
      CourseResponsible: "",
      Faculty: "",
      RelatedFaculties: [],
      Teaching: "",
      SustainFocus: "",
    });
    setStep(0);
  };
  const checkValidFields = (event) => {
    let isValid = true;
    let errors = Errors;

    if (!FormData.CourseName) {
      errors.CourseName = "This field cannot be empty.";
      isValid = false;
    }
    if (!FormData.CourseCode) {
      errors.CourseCode = "Code cannot be empty. See Studentweb for code.";
      isValid = false;
    }

    setNoError(isValid);
    setErrors({ ...Errors, ...errors });
    return isValid;
  };
  const HandleFormChange = (input) => (event) => {
    var errors = Errors;
    const fields = input.split(".");
    if (fields.length < 2) {
      errors[fields[0]] = "";
    } else {
      errors[fields[0]] = { ...errors[fields[0]], [fields[1]]: "" };
    }

    /* errors[input] = ""; */
    setNoError("");
    setErrors({ ...Errors, ...errors });
    var newValue;
    if (event.target) {
      newValue = event.target.value;
    } else if (event.value) {
      newValue = event.value;
    } else {
      newValue = event;
    }
    if (input === "CourseCode") {
      newValue = newValue.toUpperCase();
    }
    UpdateFormData(input, newValue);
  };
  const CheckAndProceed = (event) => {
    event.preventDefault();
    const isValid = checkValidFields(event);
    // Call checkValidFields function
    // This will update all the state
    // If noError is false, Error should automatically displayed
    // If noError is true, proceed to next step
    /* NextStep(event) */
    if (isValid) {
      NextStep(event);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <InnerApp
        Records={Records}
        RemoveCurrentRecord={RemoveCurrentRecord}
        UpdateCurrent={UpdateCurrent}
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
  );
}
