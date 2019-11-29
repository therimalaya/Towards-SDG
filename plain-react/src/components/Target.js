import React from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';

const numnum = num => num <=9 ? "0"+num : num;

class Target extends React.Component {
  constructor(props) {
    super(props)
    /* TargetList.filter(target=>target.id.match('[0-9]$')) */
    var newTargets = TargetList
      .filter(target=>props.Goals.includes(target.goal))
      .filter(target=>target.id.match("[0-9]$"))
    newTargets.forEach(target=>{
      target.goal_img = "images/Goals/Goal-"+numnum(target.goal)+".png"
      target.isSelected = props.Targets.map(x=>x.toString()).includes(target.id)
    });
    this.state = {
      PossibleTargets: newTargets
    }
    this.handleClick = this.handleClick.bind(this)
    /* console.log(GoalList.filter(goal=>goal.isSelected).flatMap(goal=>goal.targets.filter(x=>x.isSelected))); */
  }

  componentDidMount() {
    const clicked_btn = document.getElementsByClassName('clicked-target-btn');
    [...clicked_btn].forEach(btn=>btn.scrollIntoView());
  }

  handleClick = (event) => {
    const newTargets = this.state.PossibleTargets;
    newTargets.forEach(target=>{
      if(target.id === event.target.name) {
        // MAKE TARGET AUTO DISSELECT OLD ONE WHEN NEW IS SELECTED
        target.isSelected = !target.isSelected
        event.target.classList.toggle("clicked-target-btn")
        event.target.classList.toggle("target-btn")
        event.target.scrollIntoView()
      }
    })
    console.log(newTargets)
    this.props.handleSelect(
      newTargets.filter(target=>target.isSelected).map(target=>target.id)
    )
    this.setState({PossibleTargets: newTargets})
  }
  render() {
    const {Targets, handleSelect, nextStep, prevStep} = this.props;
    const {PossibleTargets} = this.state
    const NestedTargets = [...new Set(PossibleTargets.map(target=>target.goal))]
      .reduce((acc, curr) => {
        acc[curr]=PossibleTargets.filter(target=>target.goal===curr)
        return acc;
      }, {});
    var SelectedGoals = GoalList.filter(goal=>Object.keys(NestedTargets).includes(goal.goal.toString()))
    SelectedGoals.forEach(goal=>{
      goal.targets = NestedTargets[goal.goal];
      return(goal);
    });

    return (
      <React.Fragment>
        <div id="target-list" className="target-list">
          {
            SelectedGoals.map((goal, idx)=>{
              return(
                <div id={"Goal-"+goal.goal} key={goal.goal} className="target-group">
                  {
                    goal.targets.map((target, idx)=>{
                      return(
                        <div id={"Target-"+target.id} key={target.id}>
                          <label>
                            <button
                              className={target.isSelected ? "clicked-target-btn" : "target-btn"}
                              onClick={this.handleClick}
                              name={target.id}
                              key={target.id}
                              style={{backgroundColor: goal.colorInfo.hex}}>
                              {target.id}
                            </button>
                            <p className="target-text">{target.title}</p>
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div className="goal-details">
          {
            SelectedGoals.flatMap(goal=>{
              const res = {
                color: goal.colorInfo.hex,
                targetTitle: goal.targets
                  .filter(target=>target.isSelected)
                  .flatMap(target=>target.title).toString(),
                targetID: goal.targets
                  .filter(target=>target.isSelected)
                  .flatMap(target=>target.id).toString(),
              };
              return(res);
            }).map((goal, idx)=>{
              return(
                <React.Fragment key={idx}>
                  <p className="goal-label" style={{background: goal.color}}>Target {goal.targetID}</p>
                  <p className="goal-title">{goal.targetTitle}</p>
                </React.Fragment>
              )
            })
          }
        </div>
        <div className="nav-btn">
          <button onClick={prevStep} className="App-Nav-Btn">Previous</button>
          <button onClick={nextStep} className="App-Nav-Btn">Next</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Target;
