import React from 'react';
import Select from 'react-select';

export class SelectInput extends React.Component {
  render() {
    const {options, field, name, className, isMulti, placeholder, value, HandleChange} = this.props
    const initialValue = options.filter(item=>value.includes(item.value))
    const handleChange = (selected) => {
      if (selected === null) {
        HandleChange({[field]: []})
      } else {
        if (Array.isArray(selected)) {
          HandleChange({[field]: selected.map(x=>x.value)})
        } else {
          HandleChange(selected.value)
        }
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
          options={options}
        />
      </React.Fragment>
    );
  }
};

