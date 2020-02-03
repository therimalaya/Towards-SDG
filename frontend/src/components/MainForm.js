import React from 'react';
import Personal from './Personal';
import Goal from './Goal';
import Target from './Target';
import Summary from './Summary';
import Confirmation from './Confirmation';

function MainForm(props) {
  const {Step, FormData, CurrentRecord, Records} = props;
  const {UpdateFormData, UpdateCurrentRecord, UpdateRecords} = props;
  const {NextStep, PrevStep, GoHome, Submit} = props;

  switch(Step) {
    case 1:
      return(
        <Personal
          FormData={FormData}
          UpdateFormData={UpdateFormData}
          NextStep={NextStep} />
      );
    case 2:
      return(
        <Goal
          CurrentRecord={CurrentRecord}
          UpdateCurrentRecord={UpdateCurrentRecord}
          NextStep={NextStep}
          PrevStep={PrevStep}/>
      );
    case 3:
      return(
        <Target
          CurrentRecord={CurrentRecord}
          UpdateCurrentRecord={UpdateCurrentRecord}
          UpdateRecords={UpdateRecords}
          NextStep={NextStep}
          PrevStep={PrevStep} />
      );
    case 4:
      return(
        <React.Fragment>
          <Summary
            FormData={FormData}
            Records={Records}
            Submit={Submit}
            PrevStep={PrevStep} />
        </React.Fragment>
      );
    case 5:
      return(
        <React.Fragment>
          <Confirmation 
            Records={Records}
            FormData={FormData}
            GoHome={GoHome}/>
        </React.Fragment>
      );
    default:
      throw new Error('Opss!');
  }
}

export default MainForm;
