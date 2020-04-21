import React, { Fragment } from "react";
import { RecordSummary, RecordPlotPanel } from "./Summary";
import { flatMap } from "lodash";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, gql } from "@apollo/client";

const ALL_RECORDS = gql`
  {
    getAllResearchRecords {
      Name
      Faculty
      Coauthors {
        Faculty
      }
      Research {
        Outreach
        Title
        Type
        URL
      }
      SDGRecords {
        Goals
        Targets
        Interaction {
          direction
          type
          value
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
  const AllRecords = data.getAllResearchRecords;

  return (
    <Box height="100%" width="100%" className={classes.wrapper}>
      <Typography variant="h2">Recent Records</Typography>
      <Grid container>
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
    </Box>
  );
};
export default AllRecords;
