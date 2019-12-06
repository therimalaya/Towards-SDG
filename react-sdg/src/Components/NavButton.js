import React, { Component } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'

export default class NavButton extends Component {
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
    if (this.props.step !== this.props.maxStep) {
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