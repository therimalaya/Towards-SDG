import React, { Fragment, useContext } from "react";
import { Paper, Box, Grid, Divider } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  GridList,
  GridListTile,
  TextField,
  MenuItem
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ImageLink from "./ImageLink";

import { FormContext } from "../context/FormContext";
import { RecordsContext } from "../context/RecordsContext";
import { SelectTargetContext } from "../context/SelectTarget";
import { GoalContext } from "../context/GoalContext";
import { StepContext } from "../context/StepContext";

import {
  FacultyConfig,
  SustainFocusOption,
  TeachingOption
} from "../config/app-config.js";

const useStyles = makeStyles(theme => ({
  recordsDetails: {
    display: "flex",
    flexDirection: "column"
  },
  expansionTitle: {
    "& > div": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      "& > div:first-child": {
        "& p": {
          fontWeight: 800
        }
      }
    }
  },
  expansionDetail: {
    flexDirection: "column"
  },
  gridRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  table: {
    maxWidth: "100%"
  },
  rtlIcon: {
    transform: "rotate(180deg)"
  },
  ltrIcon: {},
  link: {
    textTransform: "uppercase",
    fontSize: "small"
  }
}));

const ResearchDetails = props => {
  const classes = useStyles();
  const { Record } = props;
  return (
    <Box width="100%" className={classes.recordsDetails}>
      {Record.CourseResponsible ? (
        <Box>
          <Typography variant="overline">
            {Record.Type === "course"
              ? "Course Responsible"
              : "Main Supervisor"}
            :
          </Typography>
          <Typography variant="subtitle2">
            {Record.CourseResponsible}
          </Typography>
        </Box>
      ) : null}
      {Record.Faculty ? (
        <Box>
          <Typography variant="overline">Faculty:</Typography>
          <Typography variant="subtitle2">
            {FacultyConfig.filter(
              fclty => fclty.value === Record.Faculty
            ).flatMap(fclty => fclty.label)}
          </Typography>
          <Divider />
        </Box>
      ) : null}
      {Record.RelatedFaculties.length ? (
        <Box>
          <Typography variant="overline">Collaborating Faculties:</Typography>
          <Typography variant="subtitle2">
            {FacultyConfig.filter(fclty =>
              Record.RelatedFaculties.includes(fclty.value)
            )
              .flatMap(fclty => fclty.label)
              .join("; ")}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
export const SDGTable = props => {
  const classes = useStyles();
  const { Record } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="records table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Target1</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Target2</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Interaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Record.SDGRecords.length > 0
            ? Record.SDGRecords.filter(sdg => sdg.Targets).map((sdg, key) => (
                <TableRow key={key}>
                  <TableCell>
                    {sdg.Targets[0] ? sdg.Targets[0] : sdg.Goals[0]}
                  </TableCell>
                  <TableCell>
                    {sdg.Interaction.direction === "ltr" ? (
                      <DoubleArrowIcon className={classes.ltrIcon} />
                    ) : sdg.Interaction.direction === "rtl" ? (
                      <DoubleArrowIcon className={classes.rtlIcon} />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {sdg.Targets[1] ? sdg.Targets[1] : sdg.Goals[1]}
                  </TableCell>
                  <TableCell>{sdg.Interaction.type}</TableCell>
                  <TableCell>{sdg.Interaction.value}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RecordGoalGrid = props => {
  const classes = useStyles();
  const { PossibleGoals } = useContext(GoalContext);
  return (
    <Box>
      {PossibleGoals.filter(goal => goal.isPossible).length ? (
        <Typography variant="overline">Selected Goals:</Typography>
      ) : null}
      <GridList cols={17} component="div" cellHeight="auto">
        {PossibleGoals.filter(goal => goal.isPossible).map(goal => (
          <GridListTile key={goal.goal} component="div">
            <ImageLink
              goal={goal}
              key={goal.goal}
              disabled={true}
              className={classes.goalThumbnail}
            />
          </GridListTile>
        ))}
      </GridList>
    </Box>
  );
};
export const RecordSummary = props => {
  const classes = useStyles();
  const { Record, expanded } = props;
  const { selectTarget } = useContext(SelectTargetContext);
  return (
    <Fragment>
      <Box width="100%">
        {Record ? (
          <React.Fragment>
            <ExpansionPanel defaultExpanded={expanded ? true : false}>
              <ExpansionPanelSummary className={classes.expansionTitle}>
                {Record.CourseName ? (
                  <Typography style={{ fontWeight: 800 }}>
                    {Record.CourseName}
                  </Typography>
                ) : (
                  <Typography style={{ fontWeight: 800 }}>Detail</Typography>
                )}
                {Record.CourseCode ? Record.CourseCode : null}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionDetail}>
                <Box pb={2}>
                  <ResearchDetails Record={Record} />
                </Box>
                {Record.SDGRecords.length > 0 ? (
                  selectTarget === "yes" ? (
                    <SDGTable Record={Record} />
                  ) : (
                    <RecordGoalGrid />
                  )
                ) : null}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </React.Fragment>
        ) : null}
      </Box>
    </Fragment>
  );
};

export const AdditionalQuestions = props => {
  const { FormData, HandleChange, Errors } = useContext(FormContext);
  return (
    <>
      <form>
        <Typography variant="h4" component="h4">
          Additional Questions:
        </Typography>
        <Box py={3}>
          <Typography variant="h5" gutterBottom component="p">
            Does the course description reflect that the course is relevant for
            sustainability, or should it be elaborated more?
          </Typography>
          <TextField
            select
            SelectProps={{
              MenuProps: {
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                }
              }
            }}
            onChange={HandleChange("Teaching")}
            error={Errors.Teaching !== ""}
            name="teaching"
            id="teaching"
            value={FormData.Teaching}
            label="Course Description"
            variant="outlined"
            fullWidth={true}
          >
            {TeachingOption.map(option => (
              <MenuItem key={option.value} value={option.value} dense>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box py={3}>
          <Typography variant="h5" gutterBottom component="p">
            Would the students’ understanding of the subject of the course be
            enhanced if the teaching were putting more emphasis on
            sustainability issues?
          </Typography>
          <TextField
            select
            SelectProps={{
              MenuProps: {
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                }
              }
            }}
            onChange={HandleChange("SustainFocus")}
            error={Errors.SustainFocus !== ""}
            name="sustain-focus"
            id="sustain-focus"
            value={FormData.SustainFocus}
            label="Sustainability Focus"
            variant="outlined"
            fullWidth={true}
          >
            {SustainFocusOption.map(option => (
              <MenuItem key={option.value} value={option.value} dense>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </form>
    </>
  );
};

export default function Summary(props) {
  const { FormData } = useContext(FormContext);
  const { Records } = useContext(RecordsContext);
  const { step } = useContext(StepContext);
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <RecordSummary
            Record={{ ...FormData, SDGRecords: Records }}
            expanded
          />
        </Grid>
        {step === 4 ? (
          <Grid item xs={12}>
            <AdditionalQuestions />
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  );
}
