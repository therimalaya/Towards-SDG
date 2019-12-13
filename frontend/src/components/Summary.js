import React from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import { FacultyConfig } from '../config/app-config.js';
import Circos from 'react-circos';

class Summary extends React.Component {
  render() {
    const {FormData, Records, Submit, PrevStep} = this.props
    const targets = Records.flatMap(record=>record.Targets)
    const targets_distinct = [...new Set(targets)]

    console.log(TargetList)
    console.log(GoalList)

    const layout = GoalList.map((goal) => ({
      len: TargetList.filter(x=>x.goal===goal.goal).length,
      color: goal.colorInfo.hex,
      label: "Goal "+goal.goal,
      id: goal.goal
    }))
    const size = 500

    return (
      <React.Fragment>
        <h2 className="AppStepTitle">Summary</h2>
        <div className="summary-panel">
          <div className="form-data-panel">
            <div className="smry-name">
              <div className="smry-label">Name</div>
              <div className="smry-txt">{FormData.Name}</div>
            </div>
            <div className="smry-faculty">
              <div className="smry-label">Faculty</div>
              <div className="smry-txt">{FormData.Faculty}</div>
            </div>
            <div className="smry-research-title">
              <div className="smry-label">Research.Title</div>
              <div className="smry-txt">{FormData.Research.Title}</div>
            </div>
            <div className="smry-research-url">
              <div className="smry-label">Research.URL</div>
              <div className="smry-txt">{FormData.Research.URL}</div>
            </div>
            <div className="smry-coauthors">
              <div className="smry-label">Coauthor's Faculty</div>
              {FormData.Coauthors.Faculty.map((fclty, idx)=>{
                return(
                  <div className="smry-txt" key={idx}>
                    {FacultyConfig.filter(x=>x.value===fclty).map(x=>x.label).toString()}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="sdg-data-panel">
            <Circos
              size={size}
              layout={layout}
              config={{
                innerRadius: size / 2 - 80,
                outerRadius: size / 2 - 40,
                ticks: {
                  display: true,
                  majorSpacing: 2,
                  spacing: 1,
                  spacing: 1,
                  labels: true,
                  labelDisplay0: true,
                  step: 1,
                  size: {
                    minor: 1,
                    major: 2
                  }
                },
                labels: {
                  position: 'center',
                  display: true,
                  size: 10,
                  color: '#000',
                  radialOffset: -15,
                }
              }}
            />
          </div>
        </div>
        <div className="nav-btn">
          <button onClick={PrevStep} className="App-Nav-Btn">Previous</button>
          <button onClick={Submit} className="App-Nav-Btn">Submit</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Summary;
