import React from 'react';
import Select from 'react-select';
import {FacultyConfig} from '../config/app-config'

export class Faculty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Selection: props.value
    }
  }

  render() {
    const {isMulti, placeholder, value, handleInput} = this.props
    const initialValue = FacultyConfig.filter(faculty=>this.state.Selection.includes(faculty.value))
    const handleChange = (SelectedValues) => {
      this.setState({Selection: SelectedValues.value})
      /* handleInput(SelectedValues.value) */
    }
    return (
      <React.Fragment>
        <h2>This is Faculty.</h2>
        <Select
          placeholder={placeholder}
          isMulti={isMulti}
          isClearable={false}
          value={initialValue}
          onChange={handleChange}
          options={FacultyConfig}
        />
      </React.Fragment>
    );
  }
};

