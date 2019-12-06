import React from 'react';

class SideInfo extends React.Component {
  render() {
    const {Step, StepConfig} = this.props
    const Label = StepConfig.filter(x=>x.key===Step)[0].label
    return (
      <React.Fragment>
        <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
        <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
      </React.Fragment>
    );
  }
};

export default SideInfo;
