import React from 'react';

class SideInfo extends React.Component {
  render() {
    const { Step, StepConfig, Records, RemoveCurrentRecord } = this.props
    const Label = StepConfig.filter(x => x.key === Step)[0].label
    switch (Step) {
      case 0:
        return (
          <React.Fragment>
            <p><span className="App-Step"></span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Welcome to NMBU towards SDG. Here you can help NMBU by providing information how you have contributed to Sustanable Developement Goals formulated by UN. You research can have direct or indirect connection to the 17 goals of SDG and they might interact positively or negatively with your research work. This will not only helps NMBU to plan better but also helps other researcher to find your research and collaborate with you.</p>
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
            {Records.length > 0 && <h4 className="sidebar-info-h4">Selected Records</h4>}
            {Records.length > 0 && <SideTable Records={Records} removeCurrent={RemoveCurrentRecord} />}
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
      default:
        throw new Error('Opss!');
    }
  }
};

export default SideInfo;

const SideTable = props => {
  const { Records } = props
  return (
    <table className="sidebar-record-table">
      <tbody>
        {
          Records.map((record, key) => {
            return (
              <tr className="sidebar-table-row sidebar-table-record" key={key}>
                <td>{record.Targets[0]}</td>
                <td>{record.Interaction.direction === "ltr" ? " → " : record.Interaction.direction === "rtl" ? " ← " : ""}</td>
                <td>{record.Targets[1]}</td>
                <td>{record.Interaction.type}</td>
                <td>{record.Interaction.value}</td>
                <td><button onClick={props.removeCurrent} value={key}>x</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
