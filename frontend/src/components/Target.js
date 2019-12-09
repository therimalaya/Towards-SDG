import React from 'react';
import TargetList from '../data/targets.json';
import GoalList from '../data/goals.json';

const numnum = num => num <=9 ? "0"+num : num;
const adjustLine = (from, to, line) => {
	var fT  = from.offsetTop  + from.offsetHeight/2;
  var tT  = to.offsetTop 	 + to.offsetHeight/2;
  var fL  = from.offsetLeft + from.offsetWidth;
  var tL  = to.offsetLeft;
  var CA  = Math.abs(tT - fT);
  var CO  = Math.abs(tL - fL);
  var H   = Math.sqrt(CA*CA + CO*CO);
  var ANG = 180 / Math.PI * Math.acos( CA/H );
  var top = tT > fT ? (tT-fT)/2 + fT : (fT-tT)/2 + tT;
  var left = tL > fL ? (tL-fL)/2 + fL : (fL-tL)/2 + tL;
  top-= H/2;

  if(( fT < tT && fL < tL) ||
     ( tT < fT && tL < fL) ||
     (fT > tT && fL > tL) ||
     (tT > fT && tL > fL)) {
    ANG *= -1;
  }

  line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-transform"] = 'rotate('+ ANG +'deg)';
  line.style.top    = top+'px';
  line.style.left   = left+'px';
  line.style.height = H + 'px';
}

class Target extends React.Component {
  constructor(props) {
    super(props)
    var newTargets = TargetList
      .filter(target=>props.CurrentRecord.Goals.includes(target.goal))
      .filter(target=>target.id.match("[0-9]$"))
    newTargets.forEach(target=>{
      target.goal_img = "images/Goals/Goal-"+numnum(target.goal)+".png"
      target.isSelected = props.CurrentRecord.Targets.map(x=>x.toString()).includes(target.id)
    });
    this.state = {
      PossibleTargets: newTargets,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.ResetAndUpdate = this.ResetAndUpdate.bind(this)
  }
  ResetAndUpdate = (event) => {
    event.preventDefault()
    let currentPossible = this.state.PossibleTargets;
    currentPossible.forEach(target=>{
      target.isSelected = false;
      return target;
    })
    this.props.UpdateRecords(event)
  }
  handleInput = (event) => {
    this.props.UpdateCurrentRecord("Interaction", event.target.value)
  }
  handleClick = (event) => {
    event.preventDefault()
    const newTargets = this.state.PossibleTargets;
    newTargets.forEach(target=>{
      if(target.id === event.currentTarget.name) {
        target.isSelected = !target.isSelected
        event.currentTarget.classList.toggle("clicked-target-btn")
        event.currentTarget.classList.toggle("target-btn")
      }
    })
    this.props.UpdateCurrentRecord(
      'Targets',
      newTargets.filter(target=>target.isSelected).map(target=>target.id)
    )
    this.setState({PossibleTargets: newTargets})
  }
  componentDidMount(){
    [...document.getElementsByClassName("clicked-target-btn")]
      .map(btn=>btn.scrollIntoView())
    /* this.drawLine(this.state) */
  }
  drawLine = (state) => {
    if (state.PossibleTargets.filter(x=>x.isSelected).length === 2) {
      let target_goal = state.PossibleTargets.filter(x=>x.isSelected).map(x=>x.goal);
      if (target_goal[0] !== target_goal[1]) {
        let selected_divs = [...document.getElementsByClassName("clicked-target-btn")];
        let from_div = selected_divs[0];
        let to_div = selected_divs[1];
        let line_div = document.getElementsByClassName("target-join")[0];
        adjustLine(from_div, to_div, line_div)
        document.getElementsByClassName("target-join")[0].style["display"] = "unset";
      }
    } else {
      document.getElementsByClassName("target-join")[0].style["display"] = "none";
    }
  }
  componentDidUpdate() {
    /* if(this.props.CurrentRecord.Targets.length > 1) {
     *   this.drawLine(this.state)
     * } */
  }
  render() {
    const {CurrentRecord, NextStep, PrevStep} = this.props;
    const {PossibleTargets} = this.state
    const NestedTargets = [...new Set(PossibleTargets.map(target=>target.goal))]
      .reduce((acc, curr) => {
        acc[curr]=PossibleTargets.filter(target=>target.goal===curr)
        return acc;
      }, {});
    var SelectedGoals = GoalList
      .filter(goal=>Object.keys(NestedTargets)
        .includes(goal.goal.toString()))
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
                  <div id={"goal-"+goal.goal+"-header"} className="goal-header">
                    <img src={goal.image_src} alt={goal.goal} />
                    <p>{goal.short}</p>
                    <p>{goal.title}</p>
                  </div>
                  <div className="target-list">
                    {
                      goal.targets.map((target, idx)=>{
                        return(
                          <button
                            disabled={CurrentRecord.Targets.length>1 & !target.isSelected}
                            id={"Target-"+target.id}
                            value={target.id}
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
        <div className="target-join"></div>
        <div className="target-page-buttons">
          {
            CurrentRecord.Targets.length === 2
            ? <InteractionButtons
                Interaction={CurrentRecord.Interaction}
                handleInput={this.handleInput}/>
            : <div></div>
          }
          <div className="nav-btn add-btn">
            <button
              disabled={CurrentRecord.Targets.length<=0}
              onClick={this.ResetAndUpdate}
              className="App-Nav-Btn">
              Add More Records
            </button>
          </div>
          <div className="nav-btn">
            <button onClick={PrevStep} className="App-Nav-Btn">Previous</button>
            <button onClick={NextStep} className="App-Nav-Btn">Next</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Target;

const InteractionButtons = (props) => {
  const {Interaction, handleInput} = props;
  return(
    <div className="Interaction-Buttons">
      <p className="Interaction-Text">Set Interaction</p>
      <button onClick={handleInput}
        value="Positive"
        className="Btn-Interaction PositiveInteraction">+</button>
      <button onClick={handleInput}
        value="Negative"
        className="Btn-Interaction NegativeInteraction">-</button>
      <div className="Interaction-Status">{Interaction}</div>
    </div>
  )
}

