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
            <div>
              <p>TODO:</p>
              <ul>
                <li>Think about alternative database.</li>
                <li>Give a proper title to the form.</li>
                <li>Validate the fields before going to next step.</li>
              </ul>
            </div>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
            <div>
              <p>TODO:</p>
              <ul>
                <li>Give a proper title to the image grid.</li>
                <li>Make the thumbnails a little larger.</li>
              </ul>
            </div>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
            <div>
              <p>TODO:</p>
              <ul>
                <li>Make the goal image a bit small.</li>
                <li>Write an instruction to the user so that they can go back to Goal page and selection other goal pairs as well.</li>
                <li>Fix the size of Interaction button before and after click. Try go make them more visible.</li>
              </ul>
            </div>
            {Records.length>0 && <h4>Selected Records</h4>}
            {Records.length>0 && <SideTable Records={Records}/>}
          </React.Fragment>
        );
      case 4:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
            <div>
              <p>TODO:</p>
              <ul>
                <li>Make the goal image a bit small.</li>
                <li>Change the summary of all selected records.</li>
                <li>Try to group the records by goal and its small image.</li>
                <li>Try to show the title of target at the bottom somewhere when user hovers over them.</li>
                <li>Keep the two sides of the summary span equal space even if there are not enough records.</li>
              </ul>
            </div>
          </React.Fragment>
        );
      case 5:
        return (
          <React.Fragment>
            <p><span className="App-Step">Step {this.props.Step}</span></p><p><span className="App-Step-Label">{Label}</span></p>
            <p>Information about this application. Include help per stages. This section might include login and logout afterwards.</p>
            <div>
              <p>TODO:</p>
              <ul>
                <li>Show the records grouped by goal and its short title.</li>
                <li>Also try to group the records per user/research.</li>
                <li>Try to sort and keep the latest on top.</li>
              </ul>
            </div>
          </React.Fragment>
        );
    }
  }
};

export default SideInfo;

const SideTable = props => {
  const {Records} = props
  return(
    <div className="sidebar-record-table">
      <div className="sidebar-table-row sidebar-table-header">
        <p>Target1</p><p>Target2</p><p>Interaction</p>
      </div>
      <div className="sidebar-table-records">
        {
          Records.map((record, key)=>{
            return(
              <div className="sidebar-table-row sidebar-table-record" key={key}>
                <p>{record.Targets[0]}</p><p>{record.Targets[1]}</p><p>{record.Interaction}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
