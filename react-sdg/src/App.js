import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { AppBar, Toolbar, Button, Paper, ButtonGroup } from "@material-ui/core";
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
      <Toolbar variant="dense">
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
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
    const minHeight = "350px";
    return (
      <React.Fragment>
        <MyAppBar />
        <Container maxWidth="md" fixed={true}>
          <Paper style={{ margin: 16, padding: 16 }}>
            <Box my={4} minHeight={minHeight}>
              <Typography variant="h4" component="h1" gutterBottom>
                NMBU towards SDG
              </Typography>
              <FormWrapper step={this.state.step}/>
            </Box>
            <MyStepper Step={this.state.step} />
            <NavButton
              next={this.nextStep}
              prev={this.prevStep}
              step={this.state.step}
            />
          </Paper>
          <Copyright />
        </Container>
      </React.Fragment>
    );
  }
}
