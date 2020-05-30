import React from "react";
import Personal from "./Personal";
import PossibleGoals from "./PossibleGoals";
import Target from "./Target";
import Summary from "./Summary";
import Confirmation from "./Confirmation";

function MainForm(props) {
  const { Step, FormData, CurrentSDG, Records } = props;
  const { UpdateFormData, UpdateCurrentSDG, UpdateRecords } = props;
  const { RemoveCurrentSDG, UpdateCurrent } = props;
  const { Errors, setErrors, NoError, setNoError } = props;
  const { checkValidFields, HandleChange, CheckAndProceed } = props;
  const { PossibleGoalList, UpdatePossibleGoalList } = props;

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
        <PossibleGoals
          PossibleGoalList={PossibleGoalList}
          UpdatePossibleGoalList={UpdatePossibleGoalList}
        />
      );
    case 3:
      return (
        <Target
          PossibleGoalList={PossibleGoalList}
          CurrentSDG={CurrentSDG}
          UpdateCurrentSDG={UpdateCurrentSDG}
          UpdateFormData={UpdateFormData}
          UpdateRecords={UpdateRecords}
          Records={Records}
          RemoveCurrentSDG={RemoveCurrentSDG}
          UpdateCurrent={UpdateCurrent}
        />
      );
    case 4:
      return <Summary FormData={FormData} Records={Records} />;
    case 5:
      return (
        <Confirmation Records={Records} FormData={FormData} />
      );
    default:
      throw new Error("Opss!");
  }
}

export default MainForm;
