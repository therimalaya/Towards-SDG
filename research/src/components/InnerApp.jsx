import React, { useContext } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// Apollo GraphQL Related Imports
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// Style Related Imports
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// Import Other Components
import MainForm from "./MainForm";
import SideInfo from "./SideInfo";
import AllRecords from "./Records";
import DownloadButtons from "./DownloadButtons";
import NavPanel from "./NavPanel";
import SideBarPanel from "./SideBarPanel";
import GroupPanel from "./GroupPanel";
import MainPanel from "./MainPanel";

// Importing Visualization
import Heatmap from "./Heatmap";

import { StepContext } from "../context/StepContext";
import { FormContext } from "../context/FormContext";
import { RecordsContext } from "../context/RecordsContext";

// Create classes for styling
const useStyles = makeStyles((theme) => ({
  MainFormBox: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
    padding: theme.spacing(1),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

// Construct GraphQL Query and Mutation
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

// InnerApp Component
function InnerApp(props) {
  const classes = useStyles();
  const { NextStep } = useContext(StepContext);
  const { Records } = useContext(RecordsContext);
  const { FormData } = useContext(FormContext);
  const [addRecords, { error: mutationError }] = useMutation(ADD_RECORD);
  const SubmitData = (event) => {
    event.preventDefault();
    const data = { ...FormData, SDGRecords: Records };
    addRecords({ variables: { data: data } });
    if (!mutationError) {
      NextStep(event);
    }
  };

  return (
    <Box display="flex" flexDirection="row" height="100vh" overflow="hidden">
      <Router basename="/">
        <Switch>
          <Route path="/records">
            <SideBarPanel>
              <DownloadButtons />
              <GroupPanel />
              {/* <FilterContextProvider>
                <FilterPanel />
              </FilterContextProvider> */}
            </SideBarPanel>
            <MainPanel>
              <AllRecords />
            </MainPanel>
          </Route>
          <Route path="/network">
            <SideBarPanel></SideBarPanel>
            <MainPanel>
              <h1>We will come back soon!</h1>
            </MainPanel>
          </Route>
          <Route path="/heatmap">
            <SideBarPanel></SideBarPanel>
            <MainPanel>
              <Heatmap />
            </MainPanel>
          </Route>
          <Route path="/">
            <SideBarPanel>
              <SideInfo />
            </SideBarPanel>
            <MainPanel>
              <Box height="100%" className={classes.MainFormBox}>
                <MainForm />
              </Box>
              <NavPanel SubmitData={SubmitData} />
            </MainPanel>
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default InnerApp;
