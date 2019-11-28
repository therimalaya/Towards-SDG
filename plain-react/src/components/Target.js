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
    const newTargets = this.state.AllTargets;
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
    const {Targets, handleSelect, nextStep, prevStep} = this.props;
    const {PossibleTargets} = this.state
    const NestedTargets = [...new Set(PossibleTargets.map(target=>target.goal))]
      .reduce((acc, curr) => {
        acc[curr]=PossibleTargets.filter(target=>target.goal===curr)
        return acc;
      }, {});

    return (
      <React.Fragment>
        <div id="target-list" className="target-list">
          {
            Object.keys(NestedTargets).map((goal, idx)=>{
              return(
                <div id={"Goal-"+goal} key={goal} className="target-group">
                  {
                    NestedTargets[goal].map((target, idx)=>{
                      return(
                        <div id={"Target-"+target.id} key={target.id}>
                          <label><button name={target.id} key={target.id}>{target.id}</button><p>{target.title}</p></label>
                        </div>
                      )
                    })
                  }
                </div>
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
