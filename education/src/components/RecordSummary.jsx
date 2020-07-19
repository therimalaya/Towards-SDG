import React, { Fragment, useContext } from "react";
import { Paper, Box } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { groupData, DataContext } from "../context/DataContext";
import { GroupContext } from "../context/GroupContext";

const useStyles = makeStyles((theme) => ({
  recordsDetails: {
    display: "flex",
    flexDirection: "column",
  },
  expansionTitle: {
    "& > div": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      "& > div:first-child": {
        "& p": {
          fontWeight: 800,
        },
      },
    },
  },
  expansionDetail: {
    flexDirection: "column",
  },
  gridRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  table: {
    maxWidth: "100%",
  },
  rtlIcon: {
    transform: "rotate(180deg)",
  },
  ltrIcon: {},
  link: {
    textTransform: "uppercase",
    fontSize: "small",
  },
  tableRecords: {
    "&>td": {
      fontFamily: "'Source Code Pro', monospace",
    },
  },
}));

export const GoalSummary = (props) => {
  const { Group } = useContext(GroupContext);
  const classes = useStyles();
  const { loading, error, GoalData } = useContext(DataContext);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const groupedData = groupData(GoalData, Group);

  return (
    <Fragment>
      <Box width="100%">
        <h1>Goal Summary</h1>
        {Object.entries(groupedData).map(([idx, data]) => {
          return (
            <React.Fragment key={idx}>
              <ExpansionPanel defaultExpanded={false}>
                <ExpansionPanelSummary className={classes.expansionTitle}>
                  <Typography>{`Grouped By: ${Group}(${idx})`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetail}>
                  <TableContainer component={Paper} className={classes.table}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="Selected Records Table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Course Code</TableCell>
                          <TableCell>Year</TableCell>
                          <TableCell>Faculty</TableCell>
                          <TableCell>Goals</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, idx) => (
                          <TableRow key={idx} className={classes.tableRecords}>
                            <TableCell>{row.CourseCode}</TableCell>
                            <TableCell>{row.Year}</TableCell>
                            <TableCell>{row.Faculty}</TableCell>
                            <TableCell>{row.Goals.join(", ")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </React.Fragment>
          );
        })}
      </Box>
    </Fragment>
  );
};

export const TargetSummary = (props) => {
  let { Group } = useContext(GroupContext);
  const classes = useStyles();
  const { loading, error, TargetData } = useContext(DataContext);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const groupedData = groupData(TargetData, Group);

  return (
    <Fragment>
      <Box width="100%">
        <h1>Target Summary</h1>
        {Object.entries(groupedData).map(([idx, data]) => {
          return (
            <React.Fragment key={idx}>
              <ExpansionPanel defaultExpanded={false}>
                <ExpansionPanelSummary className={classes.expansionTitle}>
                  <Typography>{`Grouped By: ${Group}(${idx})`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetail}>
                  <TableContainer component={Paper} className={classes.table}>
                    <Table
                      stickyHeader
                      size="small"
                      aria-label="Selected Records Table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Target1</TableCell>
                          <TableCell>Direction</TableCell>
                          <TableCell>Target2</TableCell>
                          <TableCell>Interaction</TableCell>
                          <TableCell>Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, idx) => (
                          <TableRow key={idx} className={classes.tableRecords}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.Target1}</TableCell>
                            <TableCell>{row.Direction}</TableCell>
                            <TableCell>{row.Target2}</TableCell>
                            <TableCell>{row.Interaction}</TableCell>
                            <TableCell>{row.Type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </React.Fragment>
          );
        })}
      </Box>
    </Fragment>
  );
};
