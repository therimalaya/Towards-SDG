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
  }

  handleClick = (event) => {
    const newTargets = this.state.PossibleTargets;
    console.log(newTargets)
    console.log(event.target)
    console.log(event.currentTarget)
    newTargets.forEach(target=>{
      if(target.id === event.currentTarget.name) {
        target.isSelected = !target.isSelected
        event.currentTarget.classList.toggle("clicked-target-btn")
        event.currentTarget.classList.toggle("target-btn")
        /* event.currentTarget.scrollIntoView() */
      }
    })
    this.props.handleSelect(
      newTargets.filter(target=>target.isSelected).map(target=>target.id)
    )
    this.setState({PossibleTargets: newTargets})
  }

  setInteraction = (event) => {
    console.log(event.target);
    this.props.handleSelect(event.target.value)
  }

  componentDidMount(){
    [...document.getElementsByClassName("clicked-target-btn")]
      .map(btn=>btn.scrollIntoView())
  }

  render() {
    const {Interaction, nextStep, prevStep} = this.props;
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
        <div id="target-panel" className="target-panel">
          {
            SelectedGoals.map((goal, idx)=>{
              return(
                <React.Fragment key={idx}>
                  <div id={"Goal-"+goal.goal+"-header"} className="goal-header">
                    <img src={goal.image_src} alt={goal.goal} />
                    <p>{goal.short}</p>
                    <p>{goal.title}</p>
                  </div>
                  <div className="target-list">
                    {
                      goal.targets.map((target, idx)=>{
                        return(
                          <button
                            disabled={this.props.Targets.length>=2 & !target.isSelected}
                            id={"Target-"+target.id}
                            name={target.id}
                            key={target.id}
                            width="100%"
                            height="100%"
                            onClick={this.handleClick}
                            className={target.isSelected ? "clicked-target-btn" : "target-btn"}>
                            <p className="target-text">
                              <span className="target-id">{target.id} </span>
                              {target.title}
                            </p>
                          </button>
                        )
                      })
                    }
                  </div>
                </React.Fragment>
              )
            })
          }
        </div>
        <div className="target-page-buttons">
          <div className="Interaction-Buttons">
            <p className="Interaction-Text">Set Interaction</p>
            <button onClick={this.setInteraction}
              value="Positive"
              className="Btn-Interaction PositiveInteraction">+</button>
            <button onClick={this.setInteraction}
              value="Negative"
              className="Btn-Interaction NegativeInteraction">-</button>
            <div className="Interaction-Status">{Interaction}</div>
          </div>
          <div className="nav-btn">
            <button onClick={prevStep} className="App-Nav-Btn">Previous</button>
            <button onClick={nextStep} className="App-Nav-Btn">Next</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Target;
