import React from 'react';

class SideInfo extends React.Component {
  render() {
    const {Step, StepConfig, Records, RemoveCurrentRecord} = this.props
    const Label = StepConfig.filter(x=>x.key===Step)[0].label
    switch(Step) {
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
            <div>
              <p>TODO:</p>
              <ul>
                <li>Think about alternative database.</li>
                <li><strike>Give a proper title to the form.</strike></li>
                <li><strike>Validate the fields before going to next step.</strike></li>
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
                <li><strike>Give a proper title to the image grid.</strike></li>
                <li><strike>Make the thumbnails a little larger.</strike></li>
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
                <li><strike>Make the goal image a bit small.</strike></li>
                <li>Write an instruction to the user so that they can go back to Goal page and selection other goal pairs as well.</li>
                <li><strike>Fix the size of Interaction button before and after click. Try go make them more visible.</strike></li>
              </ul>
            </div>
            {Records.length>0 && <h4>Selected Records</h4>}
            {Records.length>0 && <SideTable Records={Records} removeCurrent={RemoveCurrentRecord}/>}
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
                <li><strike>Change the summary of all selected records.</strike></li>
                <li><strike>Keep the two sides of the summary span equal space even if there are not enough records.</strike></li>
                <li>May be go for Network Graph for visualization. Or just use Table.</li>
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
      default:
        throw new Error('Opss!');
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
                <button onClick={props.removeCurrent} value={key}>x</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
