import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Goal from "./Goal";
import { StepConfig } from "../config/app-config";
import { StepContext } from "../context/StepContext";
import { RecordsContext } from "../context/RecordsContext";
import StaticSideTable from "./StaticSideTable";

const useStyles = makeStyles((theme) => ({
  sideHeader: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px",
    "& > span:first-child": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      paddingRight: "10px",
      paddingLeft: "4px",
      marginRight: "4px",
    },
    "& > span:nth-child(2)": {
      fontSize: "1.2em",
    },
  },
}));

function SideInfo(props) {
  const classes = useStyles();
  const { step } = useContext(StepContext);
  const Label = StepConfig.find((x) => x.key === step).label;
  const { Records } = useContext(RecordsContext);
  switch (step) {
    case 1:
      return (
        <React.Fragment>
          <Box className={classes.sideHeader}>
            <Typography component="span" variant="subtitle1" color="primary">
              Step {step}
            </Typography>
            <Typography component="span" variant="subtitle1" color="primary">
              {Label}
            </Typography>
          </Box>
          <Box>
            <Typography>
              Here you, as course responsible, can provide course information
              and details about faculty ownership and faculty collaboration.
            </Typography>
            <Typography>
              Master graduates may also register their thesis (choose Type
              “thesis”, and write course code “MSc”, and course name “MSc”).
            </Typography>
          </Box>
        </React.Fragment>
      );
    case 2:
      return (
        <React.Fragment>
          <Box className={classes.sideHeader}>
            <Typography component="span" variant="subtitle1" color="primary">
              Step {step}
            </Typography>
            <Typography component="span" variant="subtitle1" color="primary">
              {Label}
            </Typography>
          </Box>
          <Box>
            <Typography paragraph={true} variant="body2">
              This page allows you to provide information about the main goals
              that are addressed in the course/thesis, either solely or in
              interaction with others.
            </Typography>

            <Typography paragraph={true} variant="body2">
              Select a set of goals by clicking on the icons to the right. You
              may select as many as appropriate, and selected goals may be
              unselected by clicking the icon again. All goals may be selected
              simultaneously by clicking on the button on the bottom right.
            </Typography>

            <Typography paragraph={true} variant="body2">
              This portal also allows mapping of pairwise interactions between
              selected goals and sub-goals. If you would like to register any
              interactions, select the option “Yes”. If not, select the option
              “No” to skip to the last page in order to submit your list of main
              goals.
            </Typography>
          </Box>
        </React.Fragment>
      );
    case 3:
      return (
        <React.Fragment>
          <Box className={classes.sideHeader}>
            <Typography variant="subtitle1" component="span" color="primary">
              Step {step}
            </Typography>
            <Typography variant="subtitle2" component="span" color="primary">
              {Label}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              Select a pair of goals (two at a time) from your goals list below
              to register one or more interactions which is addressed between
              these goals in the course. By clicking on the goals that appear on
              the right, lists of sub-goals are populated, and, hence, you may
              also register interactions at a sub-goal level if desired. For
              each added interaction you may also indicate whether:
            </Typography>

            <ul>
              <li>
                <Typography variant="body2">
                  interaction is positive (synergetic) or negative (trade-off)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  there is a direct cause-effect between the goals (or
                  sub-goals), or an undirected correlation
                </Typography>
              </li>
            </ul>

            <Typography variant="body2">
              You may register multiple pairwise interactions, just click “Add
              selected record” after each selected pair. Selected records are
              listed continuously and may be edited and deleted.
            </Typography>

            <Typography variant="body2">
              When you are finished, press “Ready to submit” to go to the next
              page in order to submit your list of main goals and your selected
              interactions.
            </Typography>
          </Box>
          <Box>
            <Goal />
          </Box>
          <Box>
            {Records.length ? (
              <React.Fragment>
                <h4 className="sidebar-info-h4">Selected Records</h4>
                <StaticSideTable />
              </React.Fragment>
            ) : null}
          </Box>
        </React.Fragment>
      );
    case 4:
      return (
        <React.Fragment>
          <Box className={classes.sideHeader}>
            <Typography variant="subtitle1" component="span" color="primary">
              Step {step}
            </Typography>
            <Typography variant="subtitle2" component="span" color="primary">
              {Label}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              Review the summary of you registered records. To delete or add new
              records, please return to the previous pages by pressing the
              “Previous” button. Please also consider to answer the two
              additional questions regarding your course.
            </Typography>
            <Typography variant="body2">
              When you are done, and the information is complete, press
              “Submit”. Thank you for your registration!
            </Typography>
          </Box>
        </React.Fragment>
      );
    case 5:
      return (
        <React.Fragment>
          <Box className={classes.sideHeader}>
            <Typography variant="body2" component="span" color="primary">
              Step {step}
            </Typography>
            <Typography variant="body2" component="span" color="primary">
              {Label}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              Thank you for your contribution!
            </Typography>
            <Typography variant="body2">
              To add more course/thesis, simply press the START button.
            </Typography>
          </Box>
        </React.Fragment>
      );
    default:
      throw new Error("Ops!");
  }
}
export default SideInfo;
