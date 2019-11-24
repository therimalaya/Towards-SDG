import React, { Component } from 'react'
import {Faculty, Name, Research} from './Inputs'

export default class Personal extends Component {
    
    render() {
        const { values } = this.props
        const { updateInput, updateCoauthor, updateResearch, FacultyConfig } = this.props
        return (
            <div>
                <Name
                  updateInput={updateInput('Name')}
                  values={values}/>
                <Research
                  updateResearch={updateResearch}
                  values={values}/>
                <Faculty
                    FacultyConfig={FacultyConfig}
                    multiple={false}
                    selectedFaculty={values.Faculty}
                    updateInput={updateInput('Faculty')}
                    FacultyTitle="Faculty"/>
                <Faculty
                    FacultyConfig={FacultyConfig}
                    multiple={true}
                    selectedFaculty={values.Coauthors.Faculty}
                    updateInput={updateCoauthor}
                    FacultyTitle="Coauthor's Faculty"/>
            </div>
        )
    }
}
