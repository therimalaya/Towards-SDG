import React, { Fragment } from "react";
import { numnum } from "../data/AllGoals.js";
import { GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

// const ImageLink = props => {
//   const classes = useStyles();
//   const { goal, handleClick, disabled } = props;
//   return (
//     <input
//       width="100%"
//       id={"Goal-" + numnum(goal.goal)}
//       type="image"
//       src={goal.image_src}
//       name={goal.goal}
//       alt={goal.short}
//       onClick={handleClick}
//       className={
//         goal.isSelected
//           ? classes.selectedTiles
//           : props.makeDim
//           ? classes.dimTiles
//           : classes.regularTiles
//       }
//       disabled={disabled}
//     />
//   );
// };
