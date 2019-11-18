import React, { Component } from 'react'
import SDGImageGrid from './SDGImageGrid'


export default class SDGGoalsSelect extends Component {
    render() {
        const {updateGoals, Goals, Images} = this.props
        return (
            <div>
                {/* <h2>Select SDG Goals (At most 2)</h2> */}
                <div style={{width: '100%'}}>
                    <SDGImageGrid 
                    Goals={Goals}
                    Images={Images}
                    updateGoals={updateGoals} />
                </div>
            </div>
        )
    }
}
