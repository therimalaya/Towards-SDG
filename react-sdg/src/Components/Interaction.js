import React, { Component } from 'react'

export default class Interaction extends Component {
    render() {
        const goals = this.props.selectedGoals
        const targets = goals.flatMap(x=>x.targets.filter(y=>y.isSelected))
        return (
            <div>
                {targets.map(target=>{
                    return(
                        <React.Fragment>
                            <h1>{target.id}</h1>
                            <p>{target.title}</p>
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}
