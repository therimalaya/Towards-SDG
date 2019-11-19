import React, { Component } from 'react'
import { TextField, InputLabel, Select, MenuItem, FormControl, Grid } from '@material-ui/core'

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
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="faculty">Faculty</InputLabel>
            <Select
                style={{marginLeft: 8, width: "100%"}}
                placeholder="Faculty"
                value={faculty}
                onChange={handleChange}
                inputProps={{
                    name: 'faculty',
                    id: 'faculty',
                  }}>
                <MenuItem value=""><em>None</em></MenuItem>
                {options.map((option) => {
                    return(
                        <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
        )
    }
}


export default class PersonalDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props
        return (
            <div>
                {/* <h2>Personal Details</h2> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            style={{ margin: 8}}
                            placeholder="First Name"
                            variant="outlined"
                            id="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange('firstName')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            style={{ margin: 8}}
                            placeholder="Last Name"
                            variant="outlined"
                            id="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleChange('lastName')}
                        />
                    </Grid>
                </Grid>
                <TextField
                    fullWidth={true}
                    style={{ margin: 8}}
                    placeholder="Research link (e.g. DOI/ Brage url/ Christin url etc."
                    variant="outlined"
                    id="research-link"
                    label="Research Link"
                    value={values.researchLink}
                    onChange={handleChange('researchLink')}
                />
                <Faculty 
                faculty={values.faculty}
                handleChange={handleChange('faculty')}/>
            </div>
        )
    }
}
