import React from 'react';
import Personal from './Personal';
import Goal from './Goal';
import Target from './Target';
import Summary from './Summary';
import Confirmation from './Confirmation';

class MainForm extends React.Component {
  render() {
    const {Step, FormData, CurrentRecord} = this.props;
    const {UpdateFormData, UpdateCurrentRecord, UpdateRecords} = this.props;
    const {NextStep, PrevStep, GoHome, Submit} = this.props;

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
              CurrentRecord={CurrentRecord}
              Submit={Submit}
              PrevStep={PrevStep} />
          </React.Fragment>
        );
      case 5:
        return(
          <React.Fragment>
            <Confirmation GoHome={GoHome}/>
          </React.Fragment>
        );
      default:
        throw new Error('Opss!');
    }
  }
};

export default MainForm;
