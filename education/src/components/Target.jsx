import React, { Fragment, useState } from "react";

import {
  Box,
  Grid,
  GridList,
  GridListTile,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { SideTable } from "./Interaction";
import ImageLink from "./ImageLink";
import TargetDrawer from "./TargetDrawer";

const useStyles = makeStyles(theme => ({
  goalcover: {
    width: "100%",
    height: "175px",
    flexShrink: 0,
    backgroundPosition: "top left"
  },
  tableWrapper: {
    width: "100%"
  },
  table: {
    width: "100%",
    maxHeight: "150px",
    overflowY: "scroll",
    marginBottom: "15px",
    "& tbody": {
      "& *": {
        fontSize: "inherit",
        padding: "2px 5px"
      }
    }
  },
  goalheader: {
    display: "flex",
    alignItems: "center",
    "& p": {
      color: theme.palette.primary.contrastText,
      fontSize: "larger"
    },
    "& h3": {
      color: theme.palette.primary.contrastText,
      paddingRight: "10px",
      paddingLeft: "5px"
    }
  },
  titleTile: {
    maxWidth: "150px",
    maxHeight: "150px"
  }
}));

function Target(props) {
  const classes = useStyles();
  const {
    PossibleGoalList,
    CurrentSDG,
    UpdateCurrentSDG,
    RemoveCurrentSDG,
    UpdateCurrent,
    Records
  } = props;
  const [targetFor, showTargetFor] = useState([false, false]);

  const toggleTarget = idx => event => {
    const newState = [...targetFor];
    newState[idx] = !newState[idx];
    showTargetFor(newState);
  };

  return (
    <Fragment>
      <Grid item className={classes.tableWrapper}>
        {Records.length > 0 && (
          <React.Fragment>
            <Typography m={0} variant="overline">
              Selected Records
            </Typography>
            <SideTable
              Records={Records}
              removeCurrent={RemoveCurrentSDG}
              UpdateCurrent={UpdateCurrent}
            />
          </React.Fragment>
        )}
      </Grid>
      {CurrentSDG.Goals.length ? (
        <GridList cols={2} component="div" cellHeight="auto" spacing={16}>
          {PossibleGoalList.filter(goal => goal.isSelected).map((goal, idx) => (
            <GridListTile key={goal.goal} component="div">
              <Box
                style={{
                  border: `2px solid ${goal.colorInfo.hex}`,
                  backgroundColor: goal.colorInfo.hex,
                  height: "150px"
                }}
              >
                <ImageLink
                  key={goal.goal}
                  goal={goal}
                  onClick={toggleTarget(idx)}
                  disabled={false}
                  className={classes.titleTile}
                />
              </Box>
              <TargetDrawer
                CurrentSDG={CurrentSDG}
                UpdateCurrentSDG={UpdateCurrentSDG}
                state={targetFor[idx]}
                goal={goal}
              />
            </GridListTile>
          ))}
        </GridList>
      ) : (
        <Typography variant="h2">Select one/two goal(s) from sidebar.</Typography>
      )}
    </Fragment>
  );
}
export default Target;
