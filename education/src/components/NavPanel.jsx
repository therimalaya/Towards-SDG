import React, { useContext } from "react";
import { StepContext } from "../context/StepContext";
import { RecordsContext } from "../context/RecordsContext";
import { GoalContext } from "../context/GoalContext";
import { FormContext } from "../context/FormContext";
import { SelectTargetContext } from "../context/SelectTarget";
import { Box, ButtonGroup, Button } from "@material-ui/core";

import { StepConfig } from "../config/app-config";

const NavPanel = (props) => {
  const { step, NextStep, PrevStep, setStep } = useContext(StepContext);
  const { resetForm } = useContext(FormContext);
  const { PossibleGoals, resetGoals } = useContext(GoalContext);
  const { setRecords, resetRecords, UpdateRecords, Records } = useContext(
    RecordsContext
  );
  const { selectTarget } = useContext(SelectTargetContext);
  const { SubmitData } = props;
  const GoToSummary = (event) => {
    event.preventDefault();
    const summaryKey = StepConfig.find((x) => x.label === "Summary").key;
    // UpdateCurrentSDG("Goals", PossibleGoals);
    // UpdateRecords(event);
    setRecords([...Records, { Goals: PossibleGoals.map((goal) => goal.goal) }]);
    setStep(summaryKey);
  };
  const GoToGoals = (event) => {
    event.preventDefault();
    const goalKey = StepConfig.find((x) => x.label === "Goals").key;
    const newRecords = Records.filter((record) =>
      record.Targets ? record.Targets.length > 0 : false
    );
    setRecords(newRecords);
    setStep(goalKey);
  };
  const GetStarted = (event) => {
    event.preventDefault();
    resetForm();
    resetGoals();
    resetRecords();
    setStep(1);
  };
  return (
    <Box py="15px">
      <ButtonGroup variant="contained" color="primary">
        {[2, 3].includes(step) ? (
          <Button onClick={PrevStep}>Previous</Button>
        ) : null}
        {step === 1 ? <Button onClick={NextStep}> Next </Button> : null}
        {step === 2 ? (
          <Button onClick={selectTarget === "yes" ? NextStep : GoToSummary}>
            {selectTarget === "yes" ? "Next" : "Ready to Submit"}
          </Button>
        ) : null}
        {step === 3 ? (
          <Button onClick={UpdateRecords}>Add Selected Record</Button>
        ) : null}
        {step === 3 ? (
          <Button onClick={NextStep}>Ready to Submit</Button>
        ) : null}
        {step === 4 ? (
          <Button onClick={selectTarget === "yes" ? PrevStep : GoToGoals}>
            Previous
          </Button>
        ) : null}
        {step === 4 ? <Button onClick={SubmitData}>Submit</Button> : null}
        {step === 5 ? <Button onClick={GetStarted}>Start</Button> : null}
      </ButtonGroup>
    </Box>
  );
};

export default NavPanel;
