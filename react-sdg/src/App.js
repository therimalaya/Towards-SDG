import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { AppBar, Toolbar, Button, Paper, ButtonGroup, Hidden } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import FormWrapper from "./Components/FormWrapper";
import MyStepper from "./Components/Stepper";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit">
          NMBU towards Sustainable Development Goal
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export class NavButton extends Component {
  render() {
    var navBtn = {};
    if (this.props.step !== 1) {
      navBtn.prev = (
          <Button variant="contained" color="primary" onClick={this.props.prev}>
            {" "}
            Previous{" "}
          </Button>
      );
    }
    if (this.props.step !== 5) {
      navBtn.next = (
          <Button variant="contained" color="primary" onClick={this.props.next}>
            {" "}
            Next{" "}
          </Button>
      );
    }
    return (
      <React.Fragment>
          <ButtonGroup 
              color="secondary"
              size="large"
              aria-label="large outlined secondary button group">
          {navBtn.prev}
          {navBtn.next}
          </ButtonGroup>
      </React.Fragment>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 2
    };
  }

  // Forward the form -------
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Backward the form -------
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };


  render() {
    const minHeight = "80vh";
    return (
      <React.Fragment>
        <MyAppBar />
        <Container xs={12} sm={6} fixed={true}>
          <Paper>
            <Box my={6} p={2} minHeight={minHeight} className="main-container">
              {/* <Typography variant="h4" component="h1" gutterBottom>
                NMBU towards SDG
              </Typography> */}
              <FormWrapper step={this.state.step}/>
            <Hidden smDown>
              <MyStepper Step={this.state.step} />
            </Hidden>
            <NavButton
              next={this.nextStep}
              prev={this.prevStep}
              step={this.state.step}
            />
            </Box>
          </Paper>
          <Copyright />
        </Container>
      </React.Fragment>
    );
  }
}

export default App