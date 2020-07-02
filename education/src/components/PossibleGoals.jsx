import React, { useContext } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  GridList,
  GridListTile,
  GridListTileBar,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageLink from "./ImageLink";

import { GoalContext } from "../context/GoalContext";
import { ImageGrid } from "./ImageGrid";

import { SelectTargetContext } from "../context/SelectTarget";

const useStyles = makeStyles((theme) => ({
  root: {},
  selectedTiles: {
    boxShadow: `0 0 8px 0px red`,
    transform: "scale(0.90)",
    borderColor: "whitesmoke",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "3px",
    "&:focus": {
      outline: "none",
    },
  },
  regularTiles: {
    height: "100%",
    filter: "saturate(0.7)",
    "&:focus": {
      outline: "none",
    },
  },
  dimTiles: {
    filter: "saturate(0.3)",
  },
  selectAllBtn: {
    height: "100%",
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  selectAllLabel: {
    height: "auto",
    position: "relative",
    padding: "1vh 0.8vw",
    // outline: `2px solid ${theme.palette.primary.main}`,
    textTransform: "uppercase",
    boxShadow: `0px 0px 5px #333`,
    "&>div": {
      margin: "0",
      "&>div": {
        fontSize: "1.5vw",
      },
    },
  },
}));

const PossibleGoals = (props) => {
  const classes = useStyles();
  const { selectTarget, setSelectTarget } = useContext(SelectTargetContext);
  const { PossibleGoals, handleSelectAll, handleTileClick } = useContext(
    GoalContext
  );
  const handleChange = (event) => {
    setSelectTarget(event.target.value);
  };
  return (
    <Box display="flex" flexDirection="column">
      <ImageGrid>
        {PossibleGoals.map((goal) => (
          <GridListTile key={goal.goal} component="div">
            <ImageLink
              goal={goal}
              onClick={handleTileClick}
              key={goal.goal}
              disabled={false}
              className={
                goal.isPossible ? classes.selectedTiles : classes.regularTiles
              }
            />
          </GridListTile>
        ))}
        <GridListTile key="selectAll" component="div">
          <Box className={classes.selectAllBtn}>
            <GridListTileBar
              title="Select All"
              className={classes.selectAllLabel}
              onClick={handleSelectAll("select")}
            />
            <GridListTileBar
              title="Reject All"
              className={classes.selectAllLabel}
              onClick={handleSelectAll("reject")}
            />
          </Box>
        </GridListTile>
      </ImageGrid>
      <Box>
        {PossibleGoals.filter((goal) => goal.isPossible).length ? (
          <Typography>Selected Goals:</Typography>
        ) : null}
        <GridList cols={17} component="div" cellHeight="auto">
          {PossibleGoals.filter((goal) => goal.isPossible).map((goal) => (
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
      <Box mt={3}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Would you like to select sub-goals and their interactions as well?
          </FormLabel>
          <RadioGroup
            value={selectTarget}
            onChange={handleChange}
            aria-label="gender"
            name="addTarget"
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default PossibleGoals;
