import React, { Component } from 'react'


export class Faculty extends Component {
    render() {
        const { faculty, handleChange } = this.props
        const options = [
            { value: "biosciences", label: "Biosciences" },
            { value: "kbm", label: "Chemistry, Biotechnology and Food Science" },
            { value: "mina", label: "Environmental Sciences and Natural Resource Management" },
            { value: "landsam", label: "Landscape and Society" },
            { value: "economics", label: "School of Economics and Business" },
            { value: "realtek", label: "Science and Technology" },
            { value: "vet", label: "Veterinary Medicine" }
        ]
        return (
            <select name="faculty" value={faculty} onChange={handleChange} >
                {
                    options.map(function (option) {
                        return (
                            <option value={option.value} key={option.value}> 
                                {option.label}
                            </option>
                        )
                    })
                }
            </select>
        )
    }
}


export default class PersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    render() {
        const { values, handleChange } = this.props
        return (
            <div>
                <h2>Personal Details</h2>
               <label htmlFor="firstName">First Name</label>
               <input
                    value={values.firstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange('firstName')} />
                <label htmlFor="lastName">Last Name</label>
                <input
                    value={values.lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange('lastName')} />
                <Faculty 
                faculty={values.faculty}
                handleChange={handleChange('faculty')}/>
                <button onClick={this.continue}>Next</button>
            </div>
        )
    }
}
