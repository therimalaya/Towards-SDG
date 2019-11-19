import React, { Component } from 'react'
import PersonalDetails from '../Components/PersonalDetails'
import SDGGoalsSelect from '../Components/SDGGoalsSelect'
import SDGTargets from '../Components/SDGTargets'
import Summary from '../Components/Summary'
import Confirmation from '../Components/Confirmation'
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
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        index: goal.number-1,
        caption: goal.description,
        isSelected: false
    })
})

export default class FormWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            faculty: '',
            researchLink: '',
            coauthorFaculties: [],
            sdgGoals: [],
            sdgTargets: [],
            sdgInteraction: ''
        }
    }
    
    // Change Handling -------
    handleChange = input => e => {
        // Track the form data here
        this.setState({
            [input]: e.target.value
        })
    }

    // Update Goals -------------
    updateGoals = images => {
        const image_idx = images
            .filter(x=>x.isSelected)
            .map(x=>x.index+1)
        this.setState({
            sdgGoals: image_idx
        })
    }

    render() {
        const { step } = this.props;
        const { firstName, lastName, faculty, researchLink, sdgGoals, sdgTargets } = this.state;
        const values = { firstName, lastName, faculty, researchLink, sdgGoals }
        switch (step) {
            case 1:
                return(
                    <div>
                        <PersonalDetails 
                        values={values}
                        handleChange={this.handleChange}/>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <SDGGoalsSelect 
                        values={values}
                        Goals = {Goals}
                        Images = {Images}
                        updateGoals={this.updateGoals}/>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <SDGTargets 
                        Goals={Goals}
                        Images={Images}
                        SelectedGoals={values.sdgGoals}
                        handleChange={this.handleChange}/>
                    </div>
                )
            case 4:
                return(
                    <div>
                        <Summary values={values}/>
                    </div>
                )
            default:
                return(
                    <div>
                        <Confirmation />
                    </div>
                )
        };
    }
}
