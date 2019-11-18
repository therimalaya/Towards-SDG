import React, { Component } from 'react'
import Gallery from 'react-grid-gallery'
import UnSortedGoals from '../Data/SDG-Goals.json'

const numericSort = (a, b) => a - b
const numnum = (num) => num <= 9 ? "0"+num : num
const GoalNumber = Object.values(UnSortedGoals).map((x) => x.number).sort(numericSort)
const Goals = {}
GoalNumber.forEach((key) => {
    Goals["goal_"+key] = UnSortedGoals["goal_"+key]
})

const Images = []
Object.values(Goals).forEach((goal) => {
    Images.push({
        src: "images/Goal-"+numnum(goal.number)+".png",
        thumbnail: "images/Goal-"+numnum(goal.number)+".png",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        index: goal.number-1,
        caption: goal.description,
        isSelected: false
    })
})

export default class SDGImageGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: Images,
            selectionEnable: true
         }
         this.onSelectImage = this.onSelectImage.bind(this);
         this.getSelectedGoals = this.getSelectedGoals.bind(this);
    }
    onSelectImage = (index) => {
        const images = this.state.images
        const current_selection = images.filter(x=>x.isSelected)
        const select_new = current_selection.length < 2
        const disselect_old = current_selection.map(x=>x.index).includes(index)

        if (select_new) {
            images[index].isSelected = true
        }
        if (disselect_old) {
            images[index].isSelected = false
        }
        this.setState({
            images: images
        })
    }
    getSelectedGoals = () => Object.values(this.state.images).filter((x) => x.isSelected).map((x) => x.index+1)
    selectedGoals = () => {
        return(
            <React.Fragment>
            <h3>{this.getSelectedGoals().length > 0 ? "Selected Goals" : ""}</h3>
            <table width="100%">
                <tbody>
                {this.getSelectedGoals().map((goal_id) => {
                    var selected_goal = Goals["goal_"+goal_id]
                    return(
                        <tr>
                            <th key={goal_id}><strong>Goal: {goal_id}</strong></th><td><em>{selected_goal.description}</em></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div style={{
                display: "block",
                minHeight: "1px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto"}}>
            <Gallery 
                enableImageSelection={this.state.selectionEnable}
                images={this.state.images}
                onSelectImage={this.onSelectImage}
                onClickThumbnail={this.onSelectImage}
                enableLightbox={false}
                rowHeight={96}/>
            {this.selectedGoals()}
            </div>
        )
    }
}
