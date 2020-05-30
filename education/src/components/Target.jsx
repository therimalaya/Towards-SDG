import React, { Fragment, useState } from "react";

import {
  Box,
  Grid,
  GridList,
  GridListTile,
  Typography,
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
      ) : null}
    </Fragment>
  );
}
export default Target;
// function Target(props) {
//   const classes = useStyles();
//   const { CurrentSDG, Records } = props;
//   const { UpdateCurrentSDG, RemoveCurrentSDG } = props;
//   const { UpdateCurrent } = props;
//
//   let newTargets = TargetList.filter(target =>
//     props.CurrentSDG.Goals.includes(target.goal)
//   ).filter(target => target.id.match("[0-9]$"));
//   newTargets.forEach(target => {
//     target.goal_img = "images/Goals/Goal-" + numnum(target.goal) + ".png";
//     target.isSelected = props.CurrentSDG.Targets.map(x =>
//       x.toString()
//     ).includes(target.id);
//   });
//
//   const [PossibleTargets, setPossibleTargets] = useState(newTargets);
//   const NestedTargets = [
//     ...new Set(PossibleTargets.map(target => target.goal))
//   ].reduce((acc, curr) => {
//     acc[curr] = PossibleTargets.filter(target => target.goal === curr);
//     return acc;
//   }, {});
//   var SelectedGoals = GoalList.filter(goal =>
//     Object.keys(NestedTargets).includes(goal.goal.toString())
//   );
//   SelectedGoals.forEach(goal => {
//     goal.targets = NestedTargets[goal.goal];
//     return goal;
//   });
//
//   useEffect(() => {
//     [...document.getElementsByClassName("clicked-target-btn")].map(btn =>
//       btn.scrollIntoView()
//     );
//   });
//
//   const handleClick = event => {
//     event.preventDefault();
//     const newTargets = PossibleTargets;
//     newTargets.forEach(target => {
//       if (target.id === event.currentTarget.name) {
//         target.isSelected = !target.isSelected;
//         event.currentTarget.classList.toggle(classes.clickedTargetBtn);
//       }
//     });
//     UpdateCurrentSDG(
//       "Targets",
//       newTargets.filter(target => target.isSelected).map(target => target.id)
//     );
//     setPossibleTargets(newTargets);
//   };
//   return (
//     <Fragment>
//       <Grid container direction="column">
//         <Grid container>
//           <Grid item className={classes.tableWrapper}>
//             {Records.length > 0 && (
//               <React.Fragment>
//                 <Typography m={0} variant="overline">
//                   Selected Records
//                 </Typography>
//                 <SideTable
//                   Records={Records}
//                   removeCurrent={RemoveCurrentSDG}
//                   UpdateCurrent={UpdateCurrent}
//                 />
//               </React.Fragment>
//             )}
//           </Grid>
//           <Grid item container spacing={1}>
//             {SelectedGoals.map((goal, idx) => (
//               <Grid item xs={6} key={goal.goal}>
//                 <Box
//                   width="100%"
//                   height="50px"
//                   className={classes.goalheader}
//                   style={{ backgroundColor: goal.colorInfo.hex }}
//                 >
//                   <Typography variant="h3" component="h3">
//                     {goal.goal}
//                   </Typography>
//                   <Typography variant="subtitle1" component="p">
//                     {goal.short}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//           <Grid item container spacing={1}>
//             {SelectedGoals.map((goal, idx) => (
//               <Grid
//                 item
//                 xs={6}
//                 container
//                 className={classes.targetBtns}
//                 key={goal.goal}
//               >
//                 {goal.targets.map((target, idx) => {
//                   return (
//                     <Button
//                       fullWidth={true}
//                       key={target.id}
//                       variant="outlined"
//                       size="small"
//                       color="secondary"
//                       id={"Target-" + target.id}
//                       value={target.id}
//                       name={target.id}
//                       onClick={handleClick}
//                       disabled={
//                         CurrentSDG.Targets.length >= 2 &&
//                         !CurrentSDG.Targets.includes(String(target.id))
//                       }
//                       className={className(
//                         classes.targetBtn,
//                         CurrentSDG.Targets.includes(target.id)
//                           ? classes.clickedTargetBtn
//                           : null
//                       )}
//                     >
//                       <p className="target-text">
//                         <span className="target-id">{target.id} </span>
//                         {target.title}
//                       </p>
//                     </Button>
//                   );
//                 })}
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// }
// export default Target;
