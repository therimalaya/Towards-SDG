import React from 'react';
import Select from 'react-select';
import {FacultyConfig} from '../config/app-config';

export class Faculty extends React.Component {
  render() {
    const {name, className, isMulti, placeholder, value, HandleChange} = this.props
    const initialValue = FacultyConfig.filter(faculty=>value.includes(faculty.value))
    const handleChange = (selected) => {
      if (Array.isArray(selected)) {
        HandleChange({Faculty: selected.map(x=>x.value)})
      } else {
        HandleChange(selected.value)
      }
    }
    return (
      <React.Fragment>
        <Select
          name={name}
          className={className}
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

