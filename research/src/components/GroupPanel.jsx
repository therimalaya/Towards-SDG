import React, { useContext } from "react";
import { GroupContext } from "../context/GroupContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(4),
    },
  },
}));

const GroupPanel = (props) => {
  const classes = useStyles();
  const { Group, setGroup } = useContext(GroupContext);
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        fullWidth
        select
        value={Group}
        id="outlined-basic"
        label="Group Variable"
        variant="outlined"
        onChange={(e) => setGroup(e.target.value)}
      >
        <MenuItem key="Faculty" value="Faculty">
          Faculty
        </MenuItem>
      </TextField>
    </form>
  );
};

export default GroupPanel;
