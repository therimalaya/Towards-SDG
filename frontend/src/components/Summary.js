import React from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';
import { FacultyConfig } from '../config/app-config.js'

class Summary extends React.Component {
  render() {
    const {FormData, CurrentRecord, Submit, PrevStep} = this.props
    const SelectedGoals = GoalList.filter(goal=>CurrentRecord.Goals.includes(goal.goal));
    SelectedGoals.forEach(goal=>{
      goal.targets = TargetList
        .filter(target=>target.goal===goal.goal)
        .filter(target=>CurrentRecord.Targets.map(x=>x.toString()).includes(target.id));
      return(goal)
    })
    return (
      <React.Fragment>
        <h2 className="AppStepTitle">Summary</h2>
        <div className="summary-panel">
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
          <div className="smry-goal-card-list">
            {SelectedGoals.map(goal=>{
              return(
                <div className="smry-goal-card" key={goal.goal}>
                  <div className="smry-goal-img">
                    <img src={goal.image_src} alt={goal.short} width="100%" />
                  </div>
                  <div className="smry-goal-short">{goal.short}</div>
                  <div className="smry-target-title">
                    {goal.targets.map(target=>{
                      return(
                        <p key={target.id} className="sumry-target-text">
                          <span className="sumry-target-id">{target.id}</span>
                          {target.title}
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="smry-interaction">
            <div className="smry-label">Interaction</div>
            <div className="smry-txt">{CurrentRecord.Interaction}</div>
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
