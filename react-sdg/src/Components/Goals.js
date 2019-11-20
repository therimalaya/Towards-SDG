import React, { Component } from 'react'
import SDGImageGrid from './SDGImageGrid'

export default class Goals extends Component {
    render() {
        const {updateGoals, goals} = this.props
        const images = []
        goals.forEach((goal) => {
            images.push({
                src: goal['image_src'],
                thumbnail: goal['image_src'],
                thumbnailWidth: 200,
                thumbnailHeight: 200,
                index: goal.goal-1,
                caption: goal.title,
                alt: goal.short,
                isSelected: false
            })
        })
        return (
            <div>
                <h2>Select SDG Goals (At most 2)</h2>
                <div style={{width: '100%'}}>
                    <SDGImageGrid 
                    Goals={goals}
                    Images={images}
                    updateGoals={updateGoals} />
                </div>
            </div>
        )
    }
}
