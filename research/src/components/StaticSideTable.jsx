import React, { useContext } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { InteractionArrow } from "./Interaction";
import { RecordsContext } from "../context/RecordsContext";

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

const StaticSideTable = () => {
  const classes = useStyles();
  const { Records } = useContext(RecordsContext);
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small" aria-label="Selected Records Table">
        <TableBody>
          {Records.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                {row.Targets[0] ? row.Targets[0] : row.Goals[0]}
              </TableCell>
              <TableCell>
                <InteractionArrow direction={row.Interaction.direction} />
              </TableCell>
              <TableCell>
                {row.Targets[1] ? row.Targets[1] : row.Goals[1]}
              </TableCell>
              <TableCell>{row.Interaction.value}</TableCell>
              <TableCell>{row.Interaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaticSideTable;
