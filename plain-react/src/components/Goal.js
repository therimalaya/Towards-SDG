import React from 'react';
import AllGoals from '../data/goals.json';

class Goal extends React.Component {
    render() {
      const {Goals, handleSelect, nextStep, prevStep} = this.props
      console.log(handleSelect);
      console.log(AllGoals);
      console.log(Goals)
        return (
          <React.Fragment>
            <h1>I am Goal.</h1>
            <p>Current Goals: {Goals.join(", ")}</p>
            <button onClick={nextStep} className="App-Nav-Btn">Next</button>
            <button onClick={prevStep} className="App-Nav-Btn">Previous</button>
          </React.Fragment>
        );
    }
};

export default Goal;
