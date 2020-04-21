import React from "react";
import Personal from "./Personal";
import Goal from "./Goal";
import Target from "./Target";
import Summary from "./Summary";
import Confirmation from "./Confirmation";

function MainForm(props) {
  const { Step, FormData, CurrentRecord, Records } = props;
  const { UpdateFormData, UpdateCurrentRecord, UpdateRecords } = props;
  const { RemoveCurrentRecord, UpdateCurrent } = props;
  const { Errors, setErrors, NoError, setNoError } = props;
  const { checkValidFields, HandleChange, CheckAndProceed } = props;

  switch (Step) {
    case 1:
      return (
        <Personal
          FormData={FormData}
          UpdateFormData={UpdateFormData}
          Errors={Errors}
          setErrors={setErrors}
          NoError={NoError}
          setNoError={setNoError}
          checkValidFields={checkValidFields}
          HandleChange={HandleChange}
          CheckAndProceed={CheckAndProceed}
        />
      );
    case 2:
      return (
        <Goal
          CurrentRecord={CurrentRecord}
          UpdateCurrentRecord={UpdateCurrentRecord}
        />
      );
    case 3:
      return (
        <Target
          CurrentRecord={CurrentRecord}
          UpdateCurrentRecord={UpdateCurrentRecord}
          UpdateFormData={UpdateFormData}
          UpdateRecords={UpdateRecords}
          Records={Records}
          RemoveCurrentRecord={RemoveCurrentRecord}
          UpdateCurrent={UpdateCurrent}
        />
      );
    case 4:
      return (
        <React.Fragment>
          <Summary FormData={FormData} Records={Records} />
        </React.Fragment>
      );
    case 5:
      return (
        <React.Fragment>
          <Confirmation Records={Records} FormData={FormData} />
        </React.Fragment>
      );
    default:
      throw new Error("Opss!");
  }
}

export default MainForm;
