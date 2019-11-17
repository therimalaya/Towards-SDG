import React, { Component } from 'react'
import ImagePicker from 'react-image-picker/dist/index'
import 'react-image-picker/dist/index.css'
import UnSortedGoals from '../Data/SDG-Goals.json'

const numericSort = (a, b) => a - b
const numnum = (num) => num <= 9 ? "0"+num : num
const GoalNumber = Object.values(UnSortedGoals).map((x) => x.number).sort(numericSort)
const Goals = {}
GoalNumber.forEach((key) => {
    Goals["goal_"+key] = UnSortedGoals["goal_"+key]
})
const imageList = Object.keys(Goals).map((key) => {
    return "images/Goal-"+numnum(Goals[key].number)+".png"
})

export default class SDGImageGrid extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            image: null
         }
        this.onPick = this.onPick.bind(this)
      }
     
      onPick(image) {
        this.setState({image})
      }
    render() {
        return (
            <ImagePicker 
                multiple={true}
                images={imageList.map((image, i) => ({src: image, value: i}))}
                onPick={this.onPick}/>
        )
    }
}
