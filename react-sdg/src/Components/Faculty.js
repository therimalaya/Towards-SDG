import React, { Component } from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core'


export default class Faculty extends Component {
    render() {
        const { multiple, faculty, updateInput, config, inputID } = this.props

        return (
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="faculty">Faculty</InputLabel>
                <Select
                    multiple={multiple}
                    style={{marginLeft: 8, width: "100%"}}
                    placeholder="Faculty"
                    value={faculty}
                    onChange={updateInput(inputID)}
                    inputProps={{
                        name: 'faculty',
                        id: 'faculty',
                    }}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    {config.map((option) => {
                        return(
                            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
}

/* export default class Faculty extends Component {
    render() {
        const { multiple, faculty, updateInput, config, inputID } = this.props
        
        return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="faculty">Faculty</InputLabel>
            <Select
                multiple={multiple}
                style={{marginLeft: 8, width: "100%"}}
                placeholder="Faculty"
                value={faculty}
                onChange={updateInput(inputID)}
                inputProps={{
                    name: 'faculty',
                    id: 'faculty',
                  }}>
                <MenuItem value=""><em>None</em></MenuItem>
                {config.map((option) => {
                    return(
                        <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
        )
    }
} */