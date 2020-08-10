// Import Javascript Modules
import React, { useContext } from "react";

// Import Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// Import Contexts
import { GroupContext } from "../context/GroupContext";

// Create Styles 
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(4),
    },
  },
}));

// Group panel uses group context to grouping the records
// This can be extended to add the count of records and 
// other various statiscs and plots per group
// This component is used by Records components
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
        <MenuItem key="CourseType" value="CourseType">
          CourseType
        </MenuItem>
        <MenuItem key="Faculty" value="Faculty">
          Faculty
        </MenuItem>
        <MenuItem key="CourseCode" value="CourseCode">
          Course Code
        </MenuItem>
        <MenuItem key="Year" value="Year">
          Year
        </MenuItem>
      </TextField>
    </form>
  );
};

export default GroupPanel;
