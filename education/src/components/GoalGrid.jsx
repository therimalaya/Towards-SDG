// Import Javascript Modules
import React, { Fragment } from "react";

// Import Other Local Components
import { numnum } from "../data/AllGoals.js";

// Import Material UI Components
import { GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Create Styles 
const useStyles = makeStyles((theme) => ({
  selected: {
    marginTop: "10px",
  },
  selectedTiles: {
    boxShadow: `0 0 8px 0px red`,
    transform: "scale(0.85)",
    borderColor: "whitesmoke",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "3px",
    "&:focus": {
      outline: "none",
    },
    filter: "saturate(1.3)",
  },
  regularTiles: {
    "&:focus": {
      outline: "none",
    },
  },
  dimTiles: {
    filter: "saturate(0.5)",
  },
}));


// Using Goals object from props, this component
// renders a grid of goal object which also acts as button
const GoalGrid = (props) => {
  const { AllGoals, handleClick, disableFilter } = props;

  return (
    <Fragment>
      <GridList cols={6} component="div" cellHeight="auto">
        {AllGoals.map((goal) => (
          <GridListTile key={goal.goal} component="div">
            <ImageLink
              makeDim={disableFilter}
              goal={goal}
              handleClick={handleClick(AllGoals)}
              key={goal.goal}
              disabled={disableFilter & !goal.isSelected}
            />
          </GridListTile>
        ))}
      </GridList>
    </Fragment>
  );
};

export default GoalGrid;

