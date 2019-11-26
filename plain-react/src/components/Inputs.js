import React from 'react';
import Select from 'react-select';
import {FacultyConfig} from '../config/app-config';

export class Faculty extends React.Component {
  render() {
    const {isMulti, placeholder, value, handleSelect} = this.props
    const initialValue = FacultyConfig.filter(faculty=>value.includes(faculty.value))
    const handleChange = (selected) => {
      if (Array.isArray(selected)) {
        handleSelect({Faculty: selected.map(x=>x.value)})
      } else {
        handleSelect(selected.value)
      }
    }
    return (
      <React.Fragment>
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

