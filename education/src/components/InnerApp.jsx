import React, { Fragment } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// Apollo GraphQL Related Imports
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// Style Related Imports
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button, ButtonGroup } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

// Import Other Components
import FrontCover from "./FrontCover";
import MainForm from "./MainForm";
import SideInfo from "./SideInfo";
import AllRecords from "./Records";
import DownloadCSV from "./DownloadCSV";

// Importing Visualization
import Heatmap from "./Heatmap";

// Data, Images and realted stuffs
import NMBUwhite from "../images/NMBUwhite.svg";

// Create classes for styling
const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",
    margin: "0px",
    boxSizing: "border-box"
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexShrink: 0
  },
  header: {
    background: 'url("./images/header.jpg")',
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "150px",
    borderBottom: `5px solid ${theme.palette.primary.main}`
  },
  sideinfo: {
    backgroundColor: "#efefef",
    padding: "1rem",
    overflowY: "auto"
  },
  sidefooter: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${NMBUwhite})`,
    backgroundPosition: "left",
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    height: "60px"
  },
  sidefooterRecords: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: theme.palette.background.default,
    borderTopWidth: "5px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.primary.main
  },
  mainpanel: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignContent: "flex-start",
    padding: "20px",
    paddingBottom: 0
  },
  mainpanelBox: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  mainContent: {
    padding: "12px",
    flexGrow: 1,
    overflowY: "auto"
  }
}));

// Construct GraphQL Quary and Mutation
const ADD_RECORD = gql`
  mutation addRecord($data: CourseRecordInput!) {
    createCourseRecord(data: $data) {
      Type
      CourseCode
      Year
      CourseName
      CourseResponsible
      Faculty
      RelatedFaculties
      Teaching
      SustainFocus
      SDGRecords {
        Goals
        Targets
        Interaction {
          value
          type
          direction
        }
      }
    }
  }
`;

// InnerApp Component
function InnerApp(props) {
  const classes = useStyles();
  const [addRecords, { error: mutationError }] = useMutation(ADD_RECORD);
  const { Step, NextStep, PrevStep, GoHome } = props;
  const { Records, CurrentSDG, FormData } = props;
  const { UpdateCurrent, RemoveCurrentSDG, UpdateCurrentSDG } = props;
  const { UpdateFormData, UpdateRecords } = props;
  const { Errors, setErrors, NoError, setNoError } = props;
  const { checkValidFields, HandleChange, CheckAndProceed } = props;
  const { PossibleGoalList, UpdatePossibleGoalList } = props;
  const { StepConfig } = props;
  const SubmitData = event => {
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
                <h1>We will come back soon!</h1>
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
                  UpdatePossibleGoalList={UpdatePossibleGoalList}
                  PossibleGoalList={PossibleGoalList}
                  Records={Records}
                  RemoveCurrentSDG={RemoveCurrentSDG}
                  Step={Step}
                  StepConfig={StepConfig}
                  UpdateCurrentSDG={UpdateCurrentSDG}
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
                        CheckAndProceed={CheckAndProceed}
                        CurrentSDG={CurrentSDG}
                        Errors={Errors}
                        FormData={FormData}
                        HandleChange={HandleChange}
                        NoError={NoError}
                        PossibleGoalList={PossibleGoalList}
                        Records={Records}
                        RemoveCurrentSDG={RemoveCurrentSDG}
                        UpdatePossibleGoalList={UpdatePossibleGoalList}
                        Step={Step}
                        UpdateCurrent={UpdateCurrent}
                        UpdateCurrentSDG={UpdateCurrentSDG}
                        UpdateFormData={UpdateFormData}
                        UpdateRecords={UpdateRecords}
                        checkValidFields={checkValidFields}
                        setErrors={setErrors}
                        setNoError={setNoError}
                      />
                    </Box>
                    <Box py="15px">
                      <ButtonGroup variant="contained" color="primary">
                        {[2, 3, 4].includes(Step) ? (
                          <Button onClick={PrevStep}>Previous</Button>
                        ) : null}
                        {Step === 1 ? (
                          <Button onClick={CheckAndProceed}>Next</Button>
                        ) : null}
                        {Step === 2 ? (
                          <Button
                            onClick={NextStep}
                            disabled={!PossibleGoalList.length}
                          >
                            Next
                          </Button>
                        ) : null}
                        {Step === 3 ? (
                          <Button onClick={NextStep}>Next</Button>
                        ) : null}
                        {Step === 3 ? (
                          <Button onClick={UpdateRecords}>
                            Add Selected Record
                          </Button>
                        ) : null}
                        {Step === 4 ? (
                          <Button onClick={SubmitData}>Submit</Button>
                        ) : null}
                        {Step === 5 ? (
                          <Button onClick={GoHome}>Start</Button>
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

export default InnerApp;
