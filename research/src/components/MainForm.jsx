import React from "react";
import Personal from "./Personal";
import PossibleGoals from "./PossibleGoals";
import Target from "./Target";
import Summary from "./Summary";
import Confirmation from "./Confirmation";
import { StepContext } from "../context/StepContext";
import { GoalContextProvider } from "../context/GoalContext";

function MainForm(props) {
  return (
    <StepContext.Consumer>
      {(stepContext) => {
        const { step } = stepContext;
        switch (step) {
          case 1:
            return <Personal />;
          case 2:
            return (
              <GoalContextProvider>
                <PossibleGoals />
              </GoalContextProvider>
            );
          case 3:
            return <Target />;
          case 4:
            return <Summary />;
          case 5:
            return <Confirmation />;
          default:
            throw new Error("Ops!");
        }
      }}
    </StepContext.Consumer>
  );
}

export default MainForm;
