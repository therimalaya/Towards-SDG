import React, { Fragment } from "react";
import { RecordSummary, RecordPlotPanel } from "./Summary";
import { flatMap } from "lodash";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ALL_RECORDS = gql`
  {
    getAllCourseRecords {
      Type
      CourseCode
      Year
      CourseName
      CourseResponsible
      Faculty
      RelatedFaculties
      Teaching
      SustainFocus
      SDGRecords {
        Goals
        Targets
        Interaction {
          value
          type
          direction
        }
      }
    }
  }
`;

const useStyle = makeStyles((theme) => ({
  wrapper: {
    overflowY: "auto",
  },
  recordsWrapper: {
    width: "100%",
  },
}));

const AllRecords = (props) => {
  const { loading, error, data } = useQuery(ALL_RECORDS);
  const classes = useStyle();
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :(</p>;
  const AllRecords = data.getAllCourseRecords;

  return (
    <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2">Recent Records</Typography>
      <Grid container>
        <Grid item container className={classes.recordsWrapper}>
          {AllRecords.map((records, idx) => (
            <Fragment key={idx}>
              <Grid item container className={classes.recordsWrapper}>
                {records ? (
                  <Box py={1} width="100%" key={idx}>
                    <RecordSummary Record={records} expanded={false} />
                  </Box>
                ) : null}
              </Grid>
              <Grid item>
                {records.length ? (
                  <RecordPlotPanel Records={flatMap(records, "SDGRecords")} />
                ) : null}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
export default AllRecords;
