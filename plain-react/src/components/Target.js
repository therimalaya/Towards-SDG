import React from 'react';
import TargetList from '../data/targets.json';

const numnum = num => num <=9 ? "0"+num : num;

class Target extends React.Component {
  constructor(props) {
    super(props)
    /* TargetList.filter(target=>target.id.match('[0-9]$')) */
    var newTargets = TargetList
      .filter(target=>props.Goals.includes(target.goal))
      .filter(target=>target.id.match("[0-9]$"))
    console.log(newTargets)
    newTargets.forEach(target=>{
      target.goal_img = "images/Goals/Goal-"+numnum(target.goal)+".png"
      target.isSelected = props.Targets.includes(Number(target.id))
    });
    this.state = {
      PossibleTargets: newTargets
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (event) => {
    const newTargets = this.state.AllTargets
    /* newTargets.forEach(target=>{
     *   if(target.id === Number(event.target.name)) {
     *     target.isSelected = !target.isSelected
     *   }
     * })
     * event.target.classList.toggle("selected")
     * this.props.handleSelect(
     *   newTargets.filter(target=>target.isSelected).map(target=>target.id)
     * )
     * this.setState({AllTargets: newTargets}) */
  }
  render() {
    const {Targets, handleSelect, nextStep, prevStep} = this.props
    const {PossibleTargets} = this.state
    return (
      <React.Fragment>
        <div id="target-list" className="target-list">
          {
            PossibleTargets.map(target=>{
              return(
                <div id={"Target-"+target.id}>
                  <p><span>{target.id}</span> <span>{target.title}</span></p>
                </div>
              )
            })
          }
        </div>
        <button onClick={this.props.nextStep} className="App-Nav-Btn">Next</button>
        <button onClick={this.props.prevStep} className="App-Nav-Btn">Previous</button>
      </React.Fragment>
    );
  }
};

{/* <ImageLink
    AllGoals={AllGoals}
    goal={goal}
    handleClick={this.handleClick.bind(this)}
    key={goal.goal}
    disabled={Goals.length >= 2 & !goal.isSelected}
    /> */}

export default Target;
