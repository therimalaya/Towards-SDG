import React from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import { FacultyConfig } from '../config/app-config.js';
import Circos from 'react-circos';

class Summary extends React.Component {
  render() {
    const {FormData, Records, Submit, PrevStep} = this.props
    const targetColors = TargetList.filter(target=>target.id.match("[0-9]$")).map(target=>({
      id: target.id,
      color: GoalList.map(goal=>goal.colorInfo.hex)[target.goal-1]
    }))


    const layout = TargetList
      .filter(target=>target.id.match("[0-9]$"))
      .map(target => ({
        id: target.id,
        len: 1,
        label: target.id,
        color: targetColors.filter(col=>col.id===target.id).map(target=>target.color).toString(),
        block_id: String(target.goal),
        position: (TargetList.indexOf(target) +
          TargetList.indexOf(target))/2,
        value: target.id.split(".")[1],
        start: TargetList.indexOf(target)-1,
        end: TargetList.indexOf(target)
      }))

    const chordData = Records.map((record, idx) => {
      return({
        source: {
          id: record.Targets[0],
          start: layout.filter(trgt=>trgt.id===record.Targets[0])[0].start,
          end: layout.filter(trgt=>trgt.id===record.Targets[0])[0].end,
        },
        target: {
          id: record.Targets[1],
          start: layout.filter(trgt=>trgt.id===record.Targets[1])[0].start,
          end: layout.filter(trgt=>trgt.id===record.Targets[1])[0].end,
        },
        value: record.Interaction === "Positive" ? 1 : record.Interaction === "Negative" ? -1 : 0
      })
    })

    const size = 420

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
                innerRadius: size / 2 - 65,
                outerRadius: size / 2 - 40,
                gap: 0.01,
                ticks: {
                  display: false,
                },
                labels: {
                  position: 'out',
                  display: false,
                  size: 8,
                  color: 'black',
                  radialOffset: 29,
                }
              }}
              tracks={[
                {
                  type: "CHORDS",
                  data: chordData,
                  config: {
                    color: d => d.value > 0 ? "red" : (d.value < 0 ? "blue" : "grey"),
                    tooltipContent: function (d) {
                      const interaction = d.value > 0 ? "Interaction: Positive" : (d.value < 0 ? "Interaction: Negative" : "")
                      return `<h3>Target: ${d.source.id} ➤ Target: ${d.target.id} ${interaction}</h3>`;
                    },
                  }
                },
              ]}
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
