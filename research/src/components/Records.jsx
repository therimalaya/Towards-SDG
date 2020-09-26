import React, { useContext } from "react";
import { GoalSummary, TargetSummary } from "./RecordSummary";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DataContext } from "../context/DataContext";

const useStyle = makeStyles((theme) => ({
  wrapper: {
    overflowY: "auto",
  },
  recordsWrapper: {
    width: "100%",
  },
}));

const AllRecords = (props) => {
  const { loading, error } = useContext(DataContext);
  const classes = useStyle();
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Box height="100%" width="100%" className={classes.wrapper}>
      {/* <Typography variant="h3">Records</Typography> */}
      <Grid container>
        <Grid item container className={classes.recordsWrapper}>
          <Grid item container className={classes.recordsWrapper}>
            <Box py={1} width="100%">
              <GoalSummary />
            </Box>
          </Grid>
          <Grid item container className={classes.recordsWrapper}>
            <Box py={1} width="100%">
              <TargetSummary />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AllRecords;
