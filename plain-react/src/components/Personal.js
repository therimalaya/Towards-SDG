import React from 'react';
import {Faculty} from './Inputs';

class Personal extends React.Component {
    render() {
      const {values, handleInput, handleSelect, nextStep} = this.props
        return (
          <React.Fragment>
            <h1> I am Personal </h1>
            <Faculty
              isMulti={false}
              value={values.Faculty}
              handleInput={handleSelect("Faculty")}
              placeholder="Faculty"/>
            <Faculty
              isMulti={true}
              value={values.Coauthors.Faculty}
              handleInput={handleSelect("Coauthors")}
              placeholder="Coauthor's Faculty"/>
            <button onClick={nextStep} >Next</button>
          </React.Fragment>
        );
    }
};

export default Personal;
