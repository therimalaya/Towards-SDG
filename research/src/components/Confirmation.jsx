import React from 'react';
import Summary from './Summary';

import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(themes => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}))

function Confirmation(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box height="100%" className={classes.container}>
        <Typography variant="h2" align="center">Your Records have been saved.</Typography>
        <Summary
          FormData = {props.FormData}
          Records = {props.Records}
        />
      </Box>
    </React.Fragment>
  );
}

export default Confirmation;

