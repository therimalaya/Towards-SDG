import React from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  targetBtns: {
    alignContent: "flex-start"
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
        color: theme.palette.primary.main
      }
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
          marginRight: "5px"
        }
      }
    }
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
        marginRight: "5px"
      }
    },
    "&:hover": {
      backgroundColor: theme.palette.background.light
    }
  },
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
  }
}));

export const InteractionArrow = props => {
  const { direction } = props;
  if (direction === "rtl") {
    return (
      <DoubleArrowIcon
        style={{ fontSize: "inherit", transform: "rotate(180deg)" }}
      />
    );
  } else if (direction === "ltr") {
    return <DoubleArrowIcon style={{ fontSize: "inherit" }} />;
  } else {
    return null;
  }
};
export const direction = [
  { value: "", label: "None" },
  { value: "ltr", label: <InteractionArrow direction="ltr" /> },
  { value: "rtl", label: <InteractionArrow direction="rtl" /> }
];
export const interaction = [
  { value: "", label: "None" },
  { value: "Positive", label: "Positive" },
  { value: "Negative", label: "Negative" }
];
export const type = [
  { value: "", label: "None" },
  { value: "Direct", label: "Direct" },
  { value: "Indirect", label: "Indirect" }
];

export const SideTable = props => {
  const classes = useStyles();
  const { Records, removeCurrent, UpdateCurrent } = props;
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table stickyHeader size="small" aria-label="Selected Records Table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Target1</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Target2</TableCell>
            <TableCell>Interaction</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Records.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={removeCurrent}
                  name={String(key)}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                {row.Targets[0] ? row.Targets[0] : row.Goals[0]}
              </TableCell>
              <TableCell>
                <TextField
                  defaultValue=""
                  name={String(key)}
                  id="select-interaction-direction"
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  onChange={UpdateCurrent("direction")}
                  value={Records[key].Interaction.direction}
                >
                  {direction.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                {row.Targets[1] ? row.Targets[1] : row.Goals[1]}
              </TableCell>
              <TableCell>
                <TextField
                  name={String(key)}
                  id="select-interaction"
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  value={Records[key].Interaction.value}
                  onChange={UpdateCurrent("value")}
                >
                  {interaction.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  id="select-interaction-type"
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  name={String(key)}
                  onChange={UpdateCurrent("type")}
                  value={Records[key].Interaction.type}
                >
                  {type.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
