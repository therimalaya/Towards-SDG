import React, { Fragment, useState } from "react";
import { Box, Grid, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageLink from "./ImageLink";

const useStyles = makeStyles(theme => ({
  selected: {
    marginTop: "10px"
  },
  selectedTiles: {
    boxShadow: `0 0 8px 0px red`,
    transform: "scale(0.80)",
    borderColor: "whitesmoke",
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "3px",
    "&:focus": {
      outline: "none"
    },
    filter: "saturate(1.3)"
  },
  regularTiles: {
    "&:focus": {
      outline: "none"
    }
  },
  dimTiles: {
    filter: "saturate(0.3)"
  },
  root: {}
}));

const Goal = props => {
  const classes = useStyles();
  const {
    UpdateCurrentSDG,
    PossibleGoalList,
    UpdatePossibleGoalList
  } = props;
  const [CandidateGoals, setCandidateGoals] = useState(
    PossibleGoalList.filter(goal => goal.isPossible)
  );
  const disableFilter = GoalList => (GoalList.filter(goal => goal.isSelected).length >= 2)
  const handleTileClick = event => {
    const newGoals = [...PossibleGoalList];
    newGoals.forEach(goal => {
      if (goal.goal === Number(event.target.name)) {
        goal.isSelected = !goal.isSelected;
      }
    });
    UpdateCurrentSDG(
      "Goals",
      newGoals.filter(goal => goal.isSelected).map(goal => goal.goal)
    );
    setCandidateGoals(newGoals.filter(goal => goal.isPossible));
    UpdatePossibleGoalList(newGoals);
  };
  return (
    <Fragment>
      <Grid container direction="column">
        <Box className={classes.root}>
          {CandidateGoals.length ? (
            <GridList cols={6} component="div" cellHeight="auto">
              {CandidateGoals.map(goal => (
                <GridListTile key={goal.goal} component="div">
                  <ImageLink
                    goal={goal}
                    onClick={handleTileClick}
                    disabled={
                      (disableFilter(CandidateGoals)) &
                      !goal.isSelected
                    }
                    className={
                      (disableFilter(CandidateGoals)) &
                      !goal.isSelected
                        ? classes.dimTiles
                        : goal.isSelected
                        ? classes.selectedTiles
                        : classes.regularTiles
                    }
                    key={goal.goal}
                  />
                </GridListTile>
              ))}
            </GridList>
          ) : null}
        </Box>
      </Grid>
    </Fragment>
  );
};

export default Goal;

// const Goal = props => {
//   const classes = useStyles();
//   const {
//     CurrentSDG: { Goals },
//     UpdateCurrentSDG,
//     PossibleGoalList
//   } = props;
//   const [CandidateGoals, setCandidateGoals] = useState(
//     PossibleGoalList.filter(goal => goal.isPossible)
//   );
//   const disableFilter = goal => goal.length >= 2;
//
//   useEffect(() => {
//     if (props.CurrentSDG.Targets.length) {
//       props.UpdateCurrentSDG("Targets", []);
//     }
//   });
//
//   CandidateGoals.forEach(
//     goal => (goal.isSelected = props.CurrentSDG.Goals.includes(goal.goal))
//   );
//
//   const handleClick = event => {
//     const newGoals = CandidateGoals;
//     newGoals.forEach(goal => {
//       if (goal.goal === Number(event.target.name)) {
//         goal.isSelected = !goal.isSelected;
//       }
//     });
//     event.target.classList.toggle("selected");
//     UpdateCurrentSDG(
//       "Goals",
//       newGoals.filter(goal => goal.isSelected).map(goal => goal.goal)
//     );
//     setCandidateGoals(newGoals);
//   };
//
//   return (
//     <Fragment>
//       <Grid container direction="column">
//         <Box className={classes.root}>
//           <GridList cols={6} component="div" cellHeight="auto">
//             {CandidateGoals
//               ? CandidateGoals.map(goal => (
//                   <GridListTile key={goal.goal} component="div">
//                     <ImageLink
//                       makeDim={
//                         CandidateGoals.filter(item => item.isSelected).length >=
//                         2
//                       }
//                       goal={goal}
//                       handleClick={handleClick}
//                       key={goal.goal}
//                       disabled={(Goals.length >= 2) & !goal.isSelected}
//                     />
//                   </GridListTile>
//                 ))
//               : null}
//           </GridList>
//         </Box>
//       </Grid>
//     </Fragment>
//   );
// };
//
// export default Goal;

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
