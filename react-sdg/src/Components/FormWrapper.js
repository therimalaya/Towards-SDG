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
            step: 1,
            firstName: '',
            lastName: '',
            faculty: '',
            researchID: '',
            coauthorFaculties: [],
            sdgGoals: [],
            sdgSubGoals: [],
            sdgInteraction: ''
        }
    }

    // Go go the start of the form
    getHome = () => {
        this.setState({
            step: 1
        })
    }

    // Forward the form -------
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })    
    }

    // Backward the form -------
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })    
    }

    // Change Handling -------
    handleChange = input => e => {
        // Track the form data here
        this.setState({
            [input]: e.target.value
        })
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, faculty } = this.state;
        const values = { firstName, lastName, faculty }
        const Header = () => {
            return(
                <div>
                    <h1>I am from Form Wrapper.</h1>
                    <p>I am consist of following components.</p>
                </div>
            )
        }
        switch (step) {
            case 1:
                return(
                    <div>
                        <Header />
                        <PersonalDetails 
                        values={values}
                        handleChange={this.handleChange}
                        nextStep={this.nextStep}/>
                    </div>
                )
            case 2:
                return(
                    <div>
                        <Header />
                        <SDGGoalsSelect 
                        values={values}
                        handleChange={this.handleChange}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}/>
                    </div>
                )
            case 3:
                return(
                    <div>
                        <Header />
                        <SDGTargets 
                        values={values}
                        handleChange={this.handleChange}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}/>
                    </div>
                )
            case 4:
                return(
                    <div>
                        <Header />
                        <Summary 
                        values={values}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}/>
                    </div>
                )
            case 5:
                return(
                    <div>
                        <Header />
                        <Confirmation />
                    </div>
                )
            default:
                return(
                    <div>
                        <p>Fill out the form first.</p>
                        <button onClick={this.getHome}>Go to Start</button>
                    </div>
                )
        };
    }
}
