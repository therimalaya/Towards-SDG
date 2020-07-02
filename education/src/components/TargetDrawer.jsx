import React, { useContext } from "react";
import className from "classname";
import { Drawer, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SDGContext } from "../context/SDGContext";

const useStyles = makeStyles((theme) => ({
  targetBtns: {
    alignContent: "flex-start",
  },
  targetBtn: {
    margin: "4px 0px",
    textTransform: "unset",
    textAlign: "left",
    justifyContent: "start",
    "& p": {
      margin: 0,
      "& span": {
        fontWeight: "bold",
        color: theme.palette.primary.main,
      },
    },
    "&:hover": {
      color: theme.palette.primary.main,
      "& p": {
        "& span": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: "inline-block",
          paddingRight: "5px",
          paddingLeft: "3px",
          borderRadius: "5px",
          marginRight: "5px",
        },
      },
    },
  },
  clickedTargetBtn: {
    margin: "4px 0px",
    textTransform: "unset",
    textAlign: "left",
    justifyContent: "start",
    backgroundColor: theme.palette.background.light,
    color: theme.palette.primary.main,
    "& p": {
      margin: 0,
      "& span": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: "inline-block",
        paddingRight: "5px",
        paddingLeft: "3px",
        borderRadius: "5px",
        marginRight: "5px",
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.background.light,
    },
  },
  targetDrawer: {
    height: "100%",
  },
  drawerPaper: {
    position: "relative",
    maxHeight: "min(500px, 80%)",
  },
  drawerBox: {
    height: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 2px grey",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "lightgrey",
      borderRadius: "2px",
    },
  },
}));

function TargetDrawer(props) {
  const classes = useStyles();
  const { CurrentSDG, UpdateCurrentSDG } = useContext(SDGContext);
  const { state, goal } = props;

  const handleClick = (event) => {
    event.preventDefault();
    const cSDG = CurrentSDG;
    //cSDG.Targets[idx] = event.currentTarget.name;
    cSDG.Targets.push(event.currentTarget.name);
    UpdateCurrentSDG("Targets", cSDG.Targets);
  };
  const disableCondition = (length, id) => {
    if (CurrentSDG.Targets) {
      return (
        CurrentSDG.Targets.length >= length &&
        !CurrentSDG.Targets.includes(String(id))
      );
    } else {
      return true;
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="bottom"
      open={state}
      className={classes.targetDrawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Box
        m={0}
        p={1}
        className={classes.drawerBox}
        style={{
          border: `2px solid ${goal.colorInfo.hex}`,
        }}
      >
        {goal.targets
          ? goal.targets.map((target, idx) => {
              return (
                <Button
                  fullWidth={true}
                  key={target.id}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  id={"Target-" + target.id}
                  value={target.id}
                  name={target.id}
                  onClick={handleClick}
                  disabled={disableCondition(2, target.id)}
                  className={className(
                    classes.targetBtn,
                    CurrentSDG.Targets.includes(target.id)
                      ? classes.clickedTargetBtn
                      : null
                  )}
                >
                  <p className="target-text">
                    <span className="target-id">{target.id} </span>
                    {target.title}
                  </p>
                </Button>
              );
            })
          : null}
      </Box>
    </Drawer>
  );
}

export default TargetDrawer;
