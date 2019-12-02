import React from 'react';
import Personal from './Personal';
import Goal from './Goal';
import Target from './Target';
import Summary from './Summary';
import Confirmation from './Confirmation';

class MainForm extends React.Component {
  render() {
    const {Step, values, Goals, Targets, Interaction} = this.props;
    const {handleInput, handleSelect, goHome, nextStep, prevStep, Submit} = this.props;
    switch(Step) {
      case 1:
        return(
          <Personal
            values={values}
            handleInput={handleInput}
            handleSelect={handleSelect}
            nextStep={nextStep} />
        );
      case 2:
        return(
          <Goal
            Goals={Goals}
            handleSelect={handleSelect("Goals")}
            nextStep={nextStep}
            prevStep={prevStep}/>
        );
      case 3:
        return(
          <Target
            Goals={Goals}
            Targets={Targets}
            handleSelect={handleSelect("Interaction")}
            nextStep={nextStep}
            prevStep={prevStep}
            Interaction={Interaction}/>
        );
      case 4:
        return(
          <Summary
            values={values}
            Goals={Goals}
            Targets={Targets}
            Interaction={Interaction}
            Submit={Submit}
            prevStep={prevStep} />
        );
      case 5:
        return(
          <Confirmation
            goHome={goHome}/>
        );
      default:
        throw new Error('Opss!');
    }
  }
};

export default MainForm;
