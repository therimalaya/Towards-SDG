import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
import { RecordSummary, RecordPlotPanel } from "./Summary";
import { flatMap } from "lodash";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
var unsubscribe;

const useStyle = makeStyles(theme => ({
  wrapper: {
    overflowY: "auto"
  },
  recordsWrapper: {
    width: "100%"
  }
}));

const AllRecords = props => {
  const classes = useStyle();
  const [records, setRecords] = useState({});
  useEffect(() => {
    const db = firestore();

    unsubscribe = db
      .collection("records")
      .orderBy("created", "desc")
      .limit(8)
      .onSnapshot(snapshot => {
        let records = [];
        snapshot.forEach(doc => records.push({ ...doc.data() }));
        setRecords(records);
        /* console.log(records) */
      });
    return () => unsubscribe();
  }, []);

  return (
    <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2">Recent Records</Typography>
      <Grid container>
        <Grid item container md={6} className={classes.recordsWrapper}>
          {records.length
            ? records.map((record, idx) => {
                return (
                  <Box py={1} width="100%" key={idx}>
                    <RecordSummary Record={record} expanded={false} />
                  </Box>
                );
              })
            : null}
        </Grid>
        <Grid item md={6}>
          {records.length ? (
            <RecordPlotPanel Records={flatMap(records, "SDGRecords")} />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};
export default AllRecords;
