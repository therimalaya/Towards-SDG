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

    const nodes = targets_distinct.map((target, idx)=>({
	    id: target,
      label: target,
      cid: target.split(".")[0],
      color: GoalList.filter(goal=>goal.goal===Number(target.split(".")[0]))[0].colorInfo.hex
    }))


    const edges = Records.map((record, idx) => ({
      id: {idx},
      from: record.Targets[0],
      to: record.Targets[1],
      color: record.Interaction === "Positive" ?
             {color: 'red'} :
             record.Interaction === "Negative" ?
             {color: 'blue'} :
             {color: 'grey'},
      arrows: 'to'
    }))

    const options = {
      layout:{
        hierarchical: {
          enabled: false,
        }
      }
    }

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
            <Network options={options}>
              {nodes.map(node => <Node id={node.id} label={node.label} cid={node.cid} color={node.color}/>)}
              {edges.map(edge => <Edge from={edge.from} to={edge.to} color={edge.color} arrows={edge.arrows}/>)}
            </Network>
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
