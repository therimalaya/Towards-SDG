import React, { useContext } from "react";
import Summary from "./Summary";
import RecordPlot from "./RecordPlot";

import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { RecordsContext } from "../context/RecordsContext";
import { SelectTargetContext } from "../context/SelectTarget";

const useStyles = makeStyles((themes) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));

function Confirmation(props) {
  const classes = useStyles();
  const { selectTarget } = useContext(SelectTargetContext);
  const { Records } = useContext(RecordsContext);
  // const { FormData } = useContext(FormContext);
  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Typography variant="h2" align="center">
          Your Records have been saved.
        </Typography>
        <Summary />
      </Box>
      {selectTarget === "yes" ? (
        <Box>
          <RecordPlot Records={Records} />
        </Box>
      ) : null}
    </React.Fragment>
  );
}

export default Confirmation;
