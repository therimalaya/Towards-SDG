import React from 'react';

class SideInfo extends React.Component {
  render() {
    const {Step, StepConfig, Records} = this.props
    const Label = StepConfig.filter(x=>x.key===Step)[0].label
    switch(Step) {
      case 0:
        return (
          <React.Fragment>
            <p><span className="App-Step"></span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
            <h4>Selected Records</h4>
            {Records.length>0 && <SideTable Records={Records}/>}
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
          </React.Fragment>
        );
      case 5:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
          </React.Fragment>
        );
    }
  }
};

export default SideInfo;

const SideTable = props => {
  const {Records} = props
  return(
    <table className="sidebar-record-table">
      <thead>
        <tr>
          <th>Target1</th><th>Target2</th><th>Interaction</th>
        </tr>
      </thead>
      <tbody>
        {
          Records.map((record, key)=>{
            return(
              <tr key={key}>
                <td>{record.Targets[0]}</td><td>{record.Targets[1]}</td><td>{record.Interaction}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
