import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    alignSelf: 'flex-end',
  },
}))

const FrontCover = (props) => {
  const { NextStep } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" height="100%">
        <Box>
          <img src="images/SDG-Logo-Horizontal.png" alt="Towards SDG" width="100%"/>
        </Box>
        <Box flexGrow={1}>
          <Typography paragraph={true}>Welcome to the NMBU SDG-mapping portal. NMBU contributes substantially to the fulfillment of the SDGs and Agenda 2030 through research, education and innovation. This portal is constructed to increase the awareness of these contributions, both internally and externally, and to give support to further research, dissemination and collaboration.</Typography>

          <Typography paragraph={true}>The Agenda 2030 with its 17 main goals and 169 sub-goals expresses a complex system of interdependent challenges. It is therefore crucial that we manage to bring attention to the interactions (synergies and trade-offs) between the goals in order to provide balanced and science based advise to decision- and policy makers. This portal therefore aims at tracking how we at NMBU work with these interactions in our research papers.</Typography>

          <Typography paragraph={true}>On the next few pages you are asked to provide some basic information on the SDG-relevance of your own research. The SDG-map of NMBU, which will be an output from this portal, depends on your input and your contribution. You may register as many main author contributions as you like which were published or accepted for publication in the period 2010-2019.</Typography>
        </Box>
        <Box><Link to='/records'></Link></Box>
        <Box className={classes.root}>
          <Button onClick={NextStep} variant="contained" color="primary">
            Let's Get Started »
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default FrontCover
