import React from 'react';
import GoalList from '../data/goals.json';
const numnum = num => num <=9 ? "0"+num : num;

GoalList.forEach(goal=>{
  goal.image_src = "images/Goals/Goal-"+numnum(goal.goal)+".png"
  goal.isSelected = false
});

class Goal extends React.Component {
  constructor(props){
    super(props);
    GoalList.forEach(goal=>goal.isSelected = props.CurrentRecord.Goals.includes(goal.goal))
    this.state = {
      AllGoals: GoalList
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    const newGoals = this.state.AllGoals
    newGoals.forEach(goal=>{
      if(goal.goal === Number(event.target.name)) {
        goal.isSelected = !goal.isSelected
      }
    })
    event.target.classList.toggle("selected")
    this.props.UpdateCurrentRecord(
      "Goals",
      newGoals.filter(goal=>goal.isSelected).map(goal=>goal.goal)
    )
    this.setState({AllGoals: newGoals})
  }

  componentDidUpdate(props){
    if (props.CurrentRecord.Targets.length) {
      props.UpdateCurrentRecord("Targets", [])
    }
  }

  render() {
    const {NextStep, PrevStep} = this.props;
    const {AllGoals} = this.state
    const {Goals} = this.props.CurrentRecord
    return (
      <React.Fragment>
        <div id="goal-image-grid" className="image-grid">
          {
            AllGoals.map(goal=>{
              return(
                <ImageLink
                  AllGoals={AllGoals}
                  goal={goal}
                  handleClick={this.handleClick.bind(this)}
                  key={goal.goal}
                  disabled={Goals.length >= 2 & !goal.isSelected}
                />
              )
            })
          }
        </div>
        <div className="goal-details">
          {
            AllGoals.filter(goal=>Goals.includes(goal.goal)).map((goal, idx)=>{
              return(
                <React.Fragment key={idx}>
                  <p className="goal-label" style={{background: goal.colorInfo.hex}}>Goal {goal.goal}</p>
                  <p className="goal-title">{goal.title}</p>
                </React.Fragment>
              )
            })
          }
        </div>
        <div className="nav-btn">
          <button onClick={PrevStep} className="App-Nav-Btn">Previous</button>
          <button onClick={NextStep} className="App-Nav-Btn">Next</button>
        </div>
      </React.Fragment>
    );
  }
};

export default Goal;

const ImageLink = (props) => {
  const {goal, handleClick, disabled} = props
	return(
    <input
      id={"Goal-"+numnum(goal.goal)}
      type="image"
      src={goal.image_src}
      name={goal.goal}
      alt={goal.short}
      onClick={handleClick}
      className={goal.isSelected ? "selected" : ""}
      disabled={disabled}
    />
  )
};
