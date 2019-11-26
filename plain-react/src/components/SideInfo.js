import React from 'react';

class SideInfo extends React.Component {
  render() {
    const {Step, StepConfig} = this.props
    const Label = StepConfig.filter(x=>x.key===Step)[0].label
    return (
      <React.Fragment>
        <h2>Step {this.props.Step}</h2>
        <h3>{Label}</h3>
        <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
      </React.Fragment>
    );
  }
};

export default SideInfo;
