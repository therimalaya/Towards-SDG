import React from 'react';
import {Faculty} from './Inputs';

class Personal extends React.Component {
    render() {
      const {values, handleInput, handleSelect, nextStep} = this.props
        return (
          <React.Fragment>
            <form onSubmit={this.handleSubmit}>
              <input
                name="fullname"
                className="App-Form-Inputs"
                placeholder="Name (First and Last)"
                type="text"
                value={values.Name}
                onChange={handleInput("Name")} />
              <Faculty
                className="App-Form-Inputs"
                isMulti={false}
                value={values.Faculty}
                handleSelect={handleSelect("Faculty")}
                placeholder="Faculty"/>
              <input
                name="research-title"
                className="App-Form-Inputs"
                placeholder="Research Title"
                type="text"
                value={values.Research.Title}
                onChange={handleInput("Research.Title")} />
              <input
                name="research-url"
                className="App-Form-Inputs"
                placeholder="Research URL"
                type="url"
                value={values.Research.URL}
                onChange={handleInput("Research.URL")} />
              <Faculty
                className="App-Form-Inputs"
                isMulti={true}
                value={values.Coauthors.Faculty}
                handleSelect={handleSelect("Coauthors")}
                placeholder="Coauthor's Faculty"/>
            </form>
            <div className="nav-btn">
              <button onClick={nextStep} className="App-Nav-Btn">Next</button>
            </div>
          </React.Fragment>
        );
    }
};

export default Personal;
