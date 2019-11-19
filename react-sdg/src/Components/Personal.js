import React, { Component } from 'react'
import Faculty from './Faculty'

const FacultyConfig = [
    { value: "biosciences", label: "Biosciences" },
    { value: "kbm", label: "Chemistry, Biotechnology and Food Science" },
    { value: "mina", label:
     "Environmental Sciences and Natural Resource Management" },
    { value: "landsam", label: "Landscape and Society" },
    { value: "economics", label: "School of Economics and Business" },
    { value: "realtek", label: "Science and Technology" },
    { value: "vet", label: "Veterinary Medicine" }
]

export default class Personal extends Component {
    
    render() {
        const { values } = this.props
        const { updateInput, updateCoauthor, updateResearch } = this.props
        return (
            <div>
                <h1>I am Personal {values.Name}</h1>
                <Faculty
                    multiple={false}
                    faculty={values.faculty}
                    config={FacultyConfig}
                    updateInput={updateInput}
                    inputID={'Faculty'}/>
{/*                 <Faculty
                    multiple={true}
                    faculty={values.Coauthors.Faculty}
                    config={FacultyConfig}
                    updateInput={updateCoauthor}
                    inputID={'Faculty'}/> */}
            </div>
        )
    }
}
