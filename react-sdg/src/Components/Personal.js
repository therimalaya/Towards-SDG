import React, { Component } from 'react'
import Faculty from './Faculty'

export default class Personal extends Component {
    
    render() {
        const { values } = this.props
        const { updateInput, updateCoauthor, updateResearch } = this.props
        return (
            <div>
                <h1>I am Personal {values.Name}</h1>
                <Faculty
                    multiple={false}
                    selectedFaculty={values.Faculty}
                    updateInput={updateInput('Faculty')}
                    FacultyTitle="Faculty"/>
                <Faculty
                    multiple={true}
                    selectedFaculty={values.Coauthors.Faculty}
                    updateInput={updateCoauthor}
                    FacultyTitle="Coauthor's Faculty"/>
            </div>
        )
    }
}
