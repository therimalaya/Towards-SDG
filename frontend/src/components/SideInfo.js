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
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Here you can provide personal information and details about your main author contribution. Co-authors may also register publications in case the lead author is not affiliated at NMBU. Potentially multiple NMBU co-authors must coordinate a single registration in the portal.</p>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>The portal focuses on mapping pairwise interactions. Select one or two main SDG goals addressed (directly or indirectly) in your publication. At most two goals can be selected simultaneously. You may to return to this page later to register other goals for the same publication.</p>
            <p>(You must deselect selected goals to choose new ones.)</p>
            <p>On the next page you will have the opportunity to specify any pair-wise sub-goal interactions addressed in the publication, either between sub-goals within a main goal, or between sub-goals of two main goals.</p>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Select two sub-goals which interactions is addressed. You will also be asked to indicate (optionally) whether:</p>
            <ul>
              <li>the interaction is positive (synergetic) or negative (trade-off)</li>
              <li>the addressed interaction is a direct cause-effect interaction or a mere correlated effect (non-causal)</li>
              <li>the direction of a potential direct causal effect</li>
            </ul>
            <p>You may add multiple pair-wise interactions. Selected interactions are listed here continuously and may be edited (deleted).</p>
            <p>When you are done, you may return to the previous page to select additional main goals.</p>
            {Records.length > 0 && <h4 className="sidebar-info-h4">Selected Records</h4>}
            {Records.length > 0 && <SideTable Records={Records} removeCurrent={RemoveCurrentRecord} />}
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Review the summary of you added interactions. A simple graphical representation is given in addition to a full list of provided information on each interaction.</p>
            <p>To delete or add new, please return to the previous page. When the information is completed, press “Submit”</p>
          </React.Fragment>
        );
      case 5:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Thank you for your contribution!</p>
            <p>To add more publications, simply press the home button.</p>
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
