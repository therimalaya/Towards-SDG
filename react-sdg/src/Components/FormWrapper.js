import React, { Component } from 'react'
import PersonalDetails from '../Components/PersonalDetails'
import SDGGoalsSelect from '../Components/SDGGoalsSelect'
import SDGTargets from '../Components/SDGTargets'
import Summary from '../Components/Summary'
import Confirmation from '../Components/Confirmation'

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
            sdgSubGoals: [],
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

    render() {
        const { step } = this.props;
        const { firstName, lastName, faculty, sdgGoals } = this.state;
        const values = { firstName, lastName, faculty, sdgGoals }
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
                        handleChange={this.handleChange}/>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <SDGTargets 
                        values={values}
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
