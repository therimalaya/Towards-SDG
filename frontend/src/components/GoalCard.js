import React, { Component } from 'react'

export default class GoalCard extends Component {
  render() {
    const { CurrentRecord, goal } = this.props;
    const { handleClick } = this.props;

    return (
      <React.Fragment>
        <div id={"goal-" + goal.goal + "-header"} className="goal-header">
          <img src={goal.image_src} alt={goal.goal} />
          <div>
            <p>{goal.short}</p>
            <p>{goal.title}</p>
          </div>
        </div>
        <div className="target-list">
          {
            goal.targets.map((target, idx) => {
              return (
                <button
                  disabled={CurrentRecord.Targets.length > 1 & !target.isSelected}
                  id={"Target-" + target.id}
                  value={target.id}
                  name={target.id}
                  key={target.id}
                  width="100%"
                  height="100%"
                  onClick={handleClick}
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
  }
}
