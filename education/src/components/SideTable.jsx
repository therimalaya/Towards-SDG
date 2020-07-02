import React, { useContext } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { RecordsContext } from "../context/RecordsContext";
import { direction, interaction, type } from "./Interaction";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    maxHeight: "150px",
    overflowY: "auto",
    marginBottom: "15px",
    "& tbody": {
      "& *": {
        fontFamily: "monospace",
        padding: "2px 5px",
      },
    },
  },
}));

export const SideTable = (props) => {
  const classes = useStyles();
  const { Records, UpdateCurrent, RemoveCurrentSDG } = useContext(
    RecordsContext
  );
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
          {Records.map(
            (row, key) =>
              row.Targets && (
                <TableRow key={key}>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={RemoveCurrentSDG}
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
                      {direction.map((option) => (
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
                      {interaction.map((option) => (
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
                      {type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SideTable;
