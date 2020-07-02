import React, { Fragment, useState } from "react";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { useQuery, useMutation, ApolloProvider } from "@apollo/react-hooks";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, ButtonGroup } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import FrontCover from "./components/FrontCover";
import MainForm from "./components/MainForm";
import SideInfo from "./components/SideInfo";
import AllRecords from "./components/Records";
import NetworkSDG from "./components/Network";
import Heatmap from "./components/Heatmap";

import { StepConfig } from "./config/app-config";
import NMBUwhite from './images/NMBUwhite.svg';

import { CSVLink } from "react-csv";

// Apollo Client Setup
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://api:4000/graphql/",
});
const client = new ApolloClient({
  cache,
  link,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33ae99",
      main: "#009a80",
      dark: "#006b59",
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
    backgroundImage: `url(${NMBUwhite})`,
    backgroundPosition: "left",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    height: "60px",
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

const validateURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

const CSV_DOWNLOAD = gql`
  {
    getAllResearchRecords {
      Name
      Research {
        Title
      }
      SDGRecords {
        Goals
        Targets
        Interaction {
          direction
          type
          value
        }
      }
    }
  }
`;

const ADD_RECORD = gql`
  mutation addRecord($data: ResearchRecordInput!) {
    createResearchRecord(data: $data) {
      Name
      Faculty
      Coauthors {
        Faculty
      }
      Research {
        Outreach
        Title
        Type
        URL
      }
      SDGRecords {
        Goals
        Targets
        Interaction {
          direction
          type
          value
        }
      }
    }
  }
`;

const DownloadCSV = (props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(CSV_DOWNLOAD);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const records = data.getAllResearchRecords.flatMap((dta) => {
    return dta.SDGRecords.flatMap((item) => ({
      id: item.Targets.join("-"),
      Name: dta.Name,
      Research: dta.Research.Title,
      Goal1: item.Goals[0],
      Goal2: item.Goals[1],
      Target1: item.Targets[0],
      Target2: item.Targets[1],
      Interaction: item.Interaction.value,
      Direction: item.Interaction.direction,
      Type: item.Interaction.type,
    }));
  });
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
  const [addRecords, { error: mutationError }] = useMutation(ADD_RECORD);
  const { Step, NextStep, PrevStep, GoHome } = props;
  const { Records, CurrentRecord, FormData } = props;
  const { UpdateCurrent, RemoveCurrentRecord, UpdateCurrentRecord } = props;
  const { UpdateFormData, UpdateRecords } = props;
  const { Errors, setErrors, NoError, setNoError } = props;
  const { checkValidFields, HandleChange, CheckAndProceed } = props;
  const { StepConfig } = props;
  const SubmitData = (event) => {
    event.preventDefault();
    addRecords({ variables: { data: { ...FormData, SDGRecords: Records } } });
    if (!mutationError) NextStep(event);
  };

  return (
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
                {/* <h1>We will come back soon!</h1> */}
                <NetworkSDG />
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
                          <Button onClick={SubmitData}>Submit</Button>
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
  );
}

export default function App() {
  // STATES
  const [Step, setStep] = useState(1);
  const [FormData, setFormData] = useState({
    Name: "",
    Faculty: "",
    Research: {
      Title: "",
      URL: "",
      Type: "",
      Outreach: "",
    },
    Coauthors: { Faculty: [] },
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
    Name: "",
    Faculty: "",
    Research: {
      Title: "",
      URL: "",
      Type: "",
      Outreach: "",
    },
    Coauthors: { Faculty: "" },
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
    field = field.split(".");
    var newState = FormData;
    if (field.length > 1) {
      newState[field[0]][field[1]] = data;
    } else {
      newState[field[0]] = data;
    }

    setFormData(newState);
  };
  const UpdateCurrentRecord = (input, value) => {
    setCurrentRecord({
      ...CurrentRecord,
      [input]: value,
    });
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
      Name: FormData.Name,
      Faculty: "",
      Research: {
        Title: FormData.Research.Title,
        URL: "",
        Type: "",
        Outreach: "",
      },
      Coauthors: { Faculty: [] },
    });
    setStep(1);
  };
  const checkValidFields = (event) => {
    let isValid = true;
    let errors = Errors;

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

    // if (!FormData.Faculty) {
    //   errors.Faculty = "Must select a faculty";
    //   isValid = false;
    // }

    if (!FormData.Research.Title) {
      errors.Research = { ...errors.Research, Title: "Name can not be empty" };
      isValid = false;
    } else if (FormData.Research.Title <= 5) {
      errors.Research = {
        ...errors.Research,
        Title: "Name must be at least 5 character long.",
      };
      isValid = false;
    }

    // if (FormData.Coauthors.Faculty.length < 1) {
    //   errors.Coauthors = {
    //     ...errors.Coauthors,
    //     Faculty: "Must select a faculty"
    //   };
    //   isValid = false;
    // }

    if (!FormData.Research.URL) {
      // errors.Research = {
      //   ...errors.Research,
      //   URL: "Research URL must not be empty."
      // };
      // isValid = false;
    } else if (!validateURL(FormData.Research.URL)) {
      errors.Research = {
        ...errors.Research,
        URL: "Research URL is not valid. For DOI use doi.org/<<doi-number>>",
      };
      isValid = false;
    }

    // if (!FormData.Research.Type) {
    //   errors.Research = {
    //     ...errors.Research,
    //     Type: "Research Type must not be empty."
    //   };
    //   isValid = false;
    // }

    // if (!FormData.Research.Outreach) {
    //   errors.Research = {
    //     ...errors.Research,
    //     Outreach: "Research Outreach must not be empty."
    //   };
    //   isValid = false;
    // }

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
    if (event.target) {
      UpdateFormData(input, event.target.value);
    } else if (event.value) {
      UpdateFormData(input, event.value);
    } else {
      UpdateFormData(input, event);
    }
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
    <ApolloProvider client={client}>
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
          Errors={Errors}
          setErrors={setErrors}
          NoError={NoError}
          setNoError={setNoError}
          checkValidFields={checkValidFields}
          HandleChange={HandleFormChange}
          CheckAndProceed={CheckAndProceed}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
}
